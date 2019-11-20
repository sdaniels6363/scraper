var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({

  name:{
    type: String,
    trim: true,
    required: true
  },
  comment:{
    type: String,
    trim: true,
    required: true
  }

});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
