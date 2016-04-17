"use strict";

/**
 * Passport configuration file where you should configure all your strategies
 * @description :: Configuration file where you configure your passport authentication
 */

const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookTokenStrategy = require('passport-facebook-token');
const TwitterTokenStrategy = require('passport-twitter-token');
const VKontakteTokenStrategy = require('passport-vkontakte-token');

/**
 * Configuration object for local strategy
 * @type {Object}
 * @private
 */
const LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
};

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
const JWT_STRATEGY_CONFIG = {
  secretOrKey: '4219f871e76cc2d4e48f7734ee552c2977cbb1c98bf2d3701744b6bec0f6eba2',
  jwtFromRequest: request => request.headers["access_token"],
  tokenQueryParameterName: 'access_token',
  authScheme: 'Bearer',
  session: false,
  passReqToCallback: true
};

/**
 * Configuration object for social strategies
 * @type {Object}
 * @private
 */
const SOCIAL_STRATEGY_CONFIG = {
  clientID: '-',
  clientSecret: '-',
  consumerKey: '-',
  consumerSecret: '-',
  passReqToCallback: true
};

/**
 * Triggers when user authenticates via local strategy
 * @param {Object} req Request object
 * @param {String} email Email from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
const _onLocalStrategyAuth = (req, email, password, next) => {
  User
    .findOne({email: email})
    .then(user => {
      if (!user) return next(null, null, sails.config.errors.USER_NOT_FOUND);
      if (!HashService.bcrypt.compareSync(password, user.password)) return next(null, null, sails.config.errors.USER_NOT_FOUND);
      return next(null, user, {});
    })
    .catch(next);
};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
const _onJwtStrategyAuth = (req, payload, next) => {
  User
    .findOne({id: payload.id})
    .then(user => {
      if (!user) return next(null, null, sails.config.errors.USER_NOT_FOUND);
      return next(null, user, {});
    })
    .catch(next);
};

/**
 * Triggers when user authenticates via one of social strategies
 * @param {Object} req Request object
 * @param {String} accessToken Access token from social network
 * @param {String} refreshToken Refresh token from social network
 * @param {Object} profile Social profile
 * @param {Function} next Callback
 * @private
 */
const _onSocialStrategyAuth = (req, accessToken, refreshToken, profile, next) => {
  if (!req.user) {
    let criteria = {};
    criteria['socialProfiles.' + profile.provider + '.id'] = profile.id;

    let model = {
      username: profile.username || profile.displayName || '',
      email: (profile.emails[0] && profile.emails[0].value) || '',
      firstName: (profile.name && profile.name.givenName) || '',
      lastName: (profile.name && profile.name.familyName) || '',
      photo: (profile.photos[0] && profile.photos[0].value) || '',
      socialProfiles: {}
    };
    model.socialProfiles[profile.provider] = profile._json;

    User
      .findOrCreate(criteria, model)
      .then(user => {
        if (!user) return next(null, null, sails.config.errors.AUTH_FAILED);
        return next(null, user, {});
      })
      .catch(next);
  } else {
    req.user.socialProfiles[profile.provider] = profile._json;
    req.user.save(next);
  }
};

module.exports = {
  passport: {
    /**
     * Triggers when all Passport steps is done and user profile is parsed
     * @param {Object} req Request object
     * @param {Object} res Response object
     * @param {Object} error Object with error info
     * @param {Object} user User object
     * @param {Object} info Information object
     * @returns {*}
     * @private
     */
    onPassportAuth(req, res, error, user, info) {
      if (error || !user) return res.negotiate(error || info);

      return res.ok({
        token: CipherService.jwt.encodeSync({id: user.id}),
        user: user
      });
    }
  }
};

passport.use(new LocalStrategy(_.assign({}, LOCAL_STRATEGY_CONFIG), _onLocalStrategyAuth));
passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
passport.use(new FacebookTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
passport.use(new TwitterTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
passport.use(new VKontakteTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
