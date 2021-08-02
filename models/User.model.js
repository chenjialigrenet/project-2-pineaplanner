const mongoose= reauire("mongoose");
const Schema = mongoose.Schema;


const userSchema= new Schema({
    userNamae : String,
    email:String,
    password: String,
    specialDiets: { type: [String], enum : ["Dairy-free", "Gluten-Free","Vegan","Vegetarian",] }
});


const userModel = mongoose.model("User",userSchema);
module.exports = userModel;

// From slides
// User.model
// username: String,
// email: String,
// password: String,
// //image/avatar:  String,
// special-diets: [String],
// favorite-recipes: ObjectId

