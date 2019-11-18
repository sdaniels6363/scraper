var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var GoalSchema = new Schema({

  link:{
    type: String,
    trim: true,
    required: true
  },
  description:{
    type: String,
    trim: true,
    required: true
   },
   thumbnail:{
     type: String,
     trim: true,
     require: false
   }

});

// This creates our model from the above schema, using mongoose's model method
var Goal = mongoose.model("Goal", GoalSchema);

// Export the User model
module.exports = Goal;
