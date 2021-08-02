const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const planSchema= new Schema({

    title: String,
    dateOfCreation: Date,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    monday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
            
        },
    },
    tuesday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
    },
    wednesday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
    },
    thursday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
    },
    friday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
    },
    saturday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
    },
    sunday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            default: "6107d104c6be84118ad3ac21",
        },
    },
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

