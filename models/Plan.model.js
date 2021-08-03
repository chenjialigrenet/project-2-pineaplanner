const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const planSchema= new Schema({

    title: {type : String, default: 'First Plan'},
    dateOfCreation: Date,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    

    recipes : [{
        day : {type:String, enum: ["Monday", "Tuesday","Wednesday" , "Thursday"]},
        meal : {type:Schema.Types.ObjectId, ref:"Recipe"},
        time : {type: String, enum: ["Breakfast", "Lunch", "Dinner"]}
        
    }],
    

    allIngredients:[{
        name: String,
        amountPerServing: Number,
        unit: String,
    }],
});



const planModel = mongoose.model("Plan",planSchema);
module.exports = planModel;
//From slides
// mealPlan.model
// Title : fhadf
// Owner: ref object User,
// Date of creation:
// Monday: { Breakfast : ref MEal object,
// Lunch
// dinner}}
// Tuesday
// Wednesday
// THursday
// Friday
// Saturday
// Sunday

