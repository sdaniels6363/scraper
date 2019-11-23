var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var MediaSchema = new Schema({

  title: {
    type: String,
    trim: true,
    required: true
  },
  link: {
    type: String,
    trim: true,
    required: true
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]

});

// This creates our model from the above schema, using mongoose's model method
var Media = mongoose.model("Media", MediaSchema);

// Export the Media model
module.exports = Media;
