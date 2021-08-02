const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  email: { type: String, unique: true },
  password: String,
  specialDiets: {
    type: [String],
    enum: ['Dairy-free', 'Gluten-Free', 'Vegan', 'Vegetarian'],
  },
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

// From slides
// User.model
// username: String,
// email: String,
// password: String,
// //image/avatar:  String,
// special-diets: [String],
// favorite-recipes: ObjectId
