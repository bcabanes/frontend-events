
(function(){
  'use strict';

  /**
   * Require modules
   */
  var restify = require('restify'),
      uriUtil = require('mongodb-uri'),
      DB = require('./config.js'),
      mongoose = require('mongoose'),
        UserModel = require('./schemas/user'),
        EventModel = require('./schemas/event');

  /**
   * Create the restify server and listening on a port.
   */
  var server = restify.createServer({ name: 'frontendeventsAPI' });

  /**
   * Start the server listening on port 27017
   */
  server.listen(9000, function(){
    console.log('%s listening at %s', server.name, server.url);
  });

  /**
   * Server general configuration
   * restify.fullResponse() - Allow the use of POST
   * restify.bodyParser() - Maps req.body to req.params so
   * 												there is no switching between them
   */
  server
    .use(restify.fullResponse())
    .use(restify.bodyParser());


  /************
   * DATABASE *
   ************/
  /**
   * Database on https://mongolab.com
   * More implentation infos:
   * https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/mongooseSimpleExample.js
   */
  var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
  var mongodbUri = 'mongodb://'+DB.user+':'+DB.password+'@'+DB.host+':'+DB.port+'/'+DB.name;
  var mongooseUri = uriUtil.formatMongoose(mongodbUri);
  mongoose.connect(mongooseUri, options);

  /**********
   * ROUTES *
   **********/

  /**
   * User
   */
  server.get('/user', function(req, res, next){
    UserModel.find({}, function(error, data){
      res.send(data);
    });
  });

  server.get('/user/:id', function(req, res, next){
    // Find a single user by their id within save
    UserModel.findOne({ _id: req.params.id }, function(error, data){
      // If there are any errors, pass them to next int the correct format
      if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error.errors))); }

      if(data){
        // Send the user if no issues
        res.send(data);
      }else{
        // Send 404 header if the user doesn't exist
        res.send(404);
      }
    });
  });

  server.post('/user', function(req, res, next){
    if(req.params.email === undefined){
      return next(new restify.InvalidArgumentError('email must be supplied'));
    }

    var user = new UserModel();
    var fields = UserModel.getUpdatableFields();
    for(var i in fields){
      if(req.params[fields[i]]){
        user[fields[i]] = req.params[fields[i]];
      }
    }

    user.save(function(error){
      if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error))); }
      res.send(201);
    });

  });

  server.put('/user/:id', function(req, res, next){
    if(req.params.email === undefined){
      return next(new restify.InvalidArgumentError('email must be supplied'));
    }

    UserModel.findOne({_id: req.params.id}, function(error, data){
      if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error))); }

      var fields = UserModel.getUpdatableFields();
      for(var i in fields){
        if(req.params[fields[i]]){
          data[fields[i]] = req.params[fields[i]];
        }
      }

      data.save(function(error){
        if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error))); }
        res.send(201);
      });
    });
  });

  server.del('/user/:id', function(req, res, next){
    UserModel.remove({_id: req.params.id}, function(error){
      if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error))); }
      res.send(201);
    });
  });

  /**
   * Event
   */
  server.get('/event', function(req, res, next){
    EventModel.find({}, function(error, data){
      res.send(data);
    });
  });

  server.get('/event/:id', function(req, res, next){
    EventModel.findOne({ _id: req.params.id }, function(error, data){
      if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error.errors))); }
      if(data){
        res.send(data);
      }else{
        res.send(404);
      }
    });
  });

  server.post('/event', function(req, res, next){
    if(req.params.name === undefined){
      return next(new restify.InvalidArgumentError('name must be supplied'));
    }

    var event = new EventModel();
    var fields = EventModel.getUpdatableFields();
    for(var i in fields){
      if(req.params[fields[i]]){
        event[fields[i]] = req.params[fields[i]];
      }
    }
    event.save(function(error){
      if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error))); }
      res.send(201);
    });

  });

  server.put('/event/:id', function(req, res, next){
    if(req.params.name === undefined){
      return next(new restify.InvalidArgumentError('name must be supplied'));
    }

    EventModel.findOne({_id: req.params.id}, function(error, data){
      if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error))); }

      var fields = EventModel.getUpdatableFields();
      for(var i in fields){
        if(req.params[fields[i]]){
          data[fields[i]] = req.params[fields[i]];
        }
      }

      data.save(function(error){
        if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error))); }
        res.send(201);
      });
    });
  });

  server.del('/event/:id', function(req, res, next){
    EventModel.remove({_id: req.params.id}, function(error){
      if(error){ return next(new restify.InvalidArgumentError(JSON.stringify(error))); }
      res.send(201);
    });
  });

})();
