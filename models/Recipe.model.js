const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema= new Schema({
    title: String,
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    instructions:String,
    summary: String,
    isPublic:   {type: Boolean, default: false},
    image: String,
    readyInMinutes: Number,
    healthScore: Number,
    servings: Number,
    dishTypes: [String],
    cheap:      {type: Boolean, default: false},
    dairyFree:  {type: Boolean, default: false},
    glutenFree: {type: Boolean, default: false},
    vegan:      {type: Boolean, default: false},
    vegetarian: {type: Boolean, default: false},
    veryHealthy:{type: Boolean, default: false},
    veryPopular:{type: Boolean, default: false},
    ingredients:[{
        name: String,
        amount: Number,
        unit: {type: String, default: "-"},
    }],    
});


const recipeModel = mongoose.model("Recipe",recipeSchema);
module.exports = recipeModel;

// From slides
// Recipe.model
// title: String,
// Creator: user ref
// isPublic: boolean
// image:  String,
// readyInMinutes: Number,
// healthScore: Number,
// Cheap: Boolean,
// diaryFree: Boolean,
// glutenFree: Boolean,
// vegan: Boolean,
// Vegetarian: Boolean,
// veryHealthy: Boolean,
// veryPopular: Boolean,
// dishTypes: [
//         "lunch",
//         "main course",
//         "main dish",
//         "dinner"
//     ],
// extendedIngredients: [{},{},...],
// summary: String,
