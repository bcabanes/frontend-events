'use strict';

var mongoose = require('mongoose');

/**
 * User
 */
var EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
    updatable: true
  },
  description: {
    type: String,
    required: false,
    updatable: true
  },
  website: {
    type: String,
    required: false,
    trim: true,
    updatable: true
  },
  twitter: {
    type: String,
    required: false,
    trim: true,
    updatable: true
  },
  geolocation: {
    type: String,
    required: false,
    trim: true,
    updatable: true
  }
});

// Return all editable fields dynamically
EventSchema.statics.getUpdatableFields = function(){
  var fields = [];

  for(var i in this.schema.tree){
    if(this.schema.tree[i].updatable){
      fields.push(i);
    }
  }

  return fields;
};

module.exports = mongoose.model('EventModel', EventSchema);
