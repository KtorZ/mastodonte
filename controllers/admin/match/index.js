var Match = require('../../../models/Match');
var handlerHelper = require('../../../helpers/handler');
var texts = require('../../../helpers/texts');

module.exports = {
  /* Display form to create a new match */
  new: function(req, res) {
    res.render('admin/match/new', handlerHelper.locals(req));
  },
  
  /* Handle the post for creating a new match */
  create: function(req, res) {
    Match.create(req.body, function(err, match) {
      var messages = {
        alert: err && err.message,
        info: texts.build(texts.FR.SERVICES.CREATE.SUCCESS, {entity: texts.FR.MODELS.MATCH.NAME})
      };

      var destinations = {
        failure: {style: 'redirect', path: 'new'},
        success: {style: 'redirect', path: '/admin'}
      };
      handlerHelper.responseHandler(err, req, res, messages, destinations, match);
    });
  },

  /* Edit a previously created event. Quite similar to the creation */
  edit: function(req, res) {
    /* Two cases : coming from normal get, and coming from redirection after bad update */
    if(req.session.params) {
      /* Update try */
      res.render('admin/match/edit', handlerHelper.locals(req));
    } else {
      /* Find the match first */
      Match.find(req.params.id, function(err, match){
        var messages = { alert: err && err.message };

        var destinations = {
          failure: {style: 'redirect', path: '/admin'},
          success: {style: 'render', path: 'admin/match/edit'}
        };

        handlerHelper.responseHandler(err, req, res, messages, destinations, match);
      });
    }
  },

  /* Update the match i.e. handle form submit from edit */
  update: function(req, res) {
    Match.update(req.params.id, req.body, function(err, match){
      var messages = {
        alert: err && err.message,
        info: texts.build(texts.FR.SERVICES.UPDATE.SUCCESS, {entity: texts.FR.MODELS.MATCH.NAME})
      };

      var destinations = {
        failure: {style: 'redirect', path: 'edit'},
        success: {style: 'redirect', path: 'show'}
      };
      handlerHelper.responseHandler(err, req, res, messages, destinations, match);
    });
  },

  /* Display all informations about a specific match */
  show: function(req, res) {
    Match.find(req.params.id, function(err, match){
      var messages = { alert: err && err.message };

      var destinations = {
        failure: {style: 'redirect', path: '/admin'},
        success: {style: 'render', path: 'admin/match/show'}
      };

      handlerHelper.responseHandler(err, req, res, messages, destinations, match);
    });
  },

  /* Delete a match. Http verb should be "delete" */
  delete: function(req, res) {
    Match.remove(req.params.id, function(err){
      var messages = {
        alert: err && err.message,
        info: texts.build(texts.FR.SERVICES.DELETE.SUCCESS, {entity: texts.FR.MODELS.MATCH.NAME})
      };

      var destinations = {
        failure: {style: 'redirect', path: '/admin'},
        success: {style: 'redirect', path: '/admin'}
      };
      handlerHelper.responseHandler(err, req, res, messages, destinations);
    });
  }
};