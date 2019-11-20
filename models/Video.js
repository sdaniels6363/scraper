var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var VideoSchema = new Schema({

  title:{
    type: String,
    trim: true,
    required: true
  },
  link:{
    type: String,
    trim: true,
    required: true
  },
   comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }

});

// This creates our model from the above schema, using mongoose's model method
var Video = mongoose.model("Video", VideoSchema);

// Export the Video model
module.exports = Video;
