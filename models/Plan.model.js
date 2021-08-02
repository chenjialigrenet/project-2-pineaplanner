const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const planSchema= new Schema({

    title: String,
    dateOfCreation: Date,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    day:[
        {
        name :      {type:String, default:"Monday"},
        breakfast:  {type: Schema.Types.ObjectId,ref: "Recipe",},
        lunch:      {type: Schema.Types.ObjectId,ref: "Recipe",},
        dinner :    { type: Schema.Types.ObjectId,ref: "Recipe",}, 
        },

        {
        name :      {type:String, default:"Tuesday"},
        breakfast : {type: Schema.Types.ObjectId,ref: "Recipe",},
        lunch :     {type: Schema.Types.ObjectId,ref: "Recipe",},
        dinner :    { type: Schema.Types.ObjectId,ref: "Recipe",}, 
        },

        {
        name :      {type:String, default:"Wednesday"},
        breakfast : {type: Schema.Types.ObjectId,ref: "Recipe",},
        lunch :     {type: Schema.Types.ObjectId,ref: "Recipe",},
        dinner :    {type: Schema.Types.ObjectId,ref: "Recipe",},
        },

        {
        name :      {type:String, default:"Thursday"},
        breakfast : {type: Schema.Types.ObjectId,ref: "Recipe", },
        lunch :     {type: Schema.Types.ObjectId,ref: "Recipe",},
        dinner :    {type: Schema.Types.ObjectId,ref: "Recipe",}, 
        },

        {
        name :      {type:String, default:"Friday"},
        breakfast : {type: Schema.Types.ObjectId,ref: "Recipe",},
        lunch :     {type: Schema.Types.ObjectId,ref: "Recipe",},
        dinner :    {type: Schema.Types.ObjectId,ref: "Recipe",}, 
        },

        {
        name :      {type:String, default:"Saturday"},
        breakfast : {type: Schema.Types.ObjectId,ref: "Recipe",},
        lunch :     {type: Schema.Types.ObjectId,ref: "Recipe",},
        dinner :    {type: Schema.Types.ObjectId,ref: "Recipe",}, 
        },


        {
        name :      {type:String, default:"Sunday"},
        breakfast : {type: Schema.Types.ObjectId,ref: "Recipe",},
        lunch :     {type: Schema.Types.ObjectId,ref: "Recipe",},
        dinner :    {type: Schema.Types.ObjectId,ref: "Recipe",}, 
        },
    ],
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

