'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

/**
 * User
 */
var UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: false,
    trim: true,
    updatable: true
  },
  lastname: {
    type: String,
    required: false,
    trim: true,
    updatable: true
  },
  email: {
    index: { unique: true },
    lowercase: true,
    require: true,
    type: String,
    trim: true,
    updatable: true
  },
  password: {
    type: String,
    required: true,
    updatable: true
  }
}, {collection: 'users'});

// Password salt when saving
UserSchema.pre('save', function(next){
  var user = this;

  // Only hash the password if it has been modified (or the user is new)
  if(!user.isModified('password')){ return next(); }

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt){
    if(error){ return next(error); }

    // Hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(error, hash){
      if(error){ return next(error); }

      // Override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Password verification
UserSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compar(candidatePassword, this.password, function(error, isMatch){
    if(error){ return callback(error); }
    callback(null, isMatch);
  });
};

// Return all editable fields dynamically
UserSchema.statics.getUpdatableFields = function(){
  var fields = [];

  for(var i in this.schema.tree){
    if(this.schema.tree[i].updatable){
      fields.push(i);
    }
  }

  return fields;
};

module.exports = mongoose.model('UserModel', UserSchema);
