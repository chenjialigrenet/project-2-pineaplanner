const mongoose= reauire("mongoose");
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
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    },
    tuesday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    },
    wednesday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    },
    thursday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    },
    friday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    },
    saturday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    },
    sunday:{
        breakfast :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        lunch :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
        dinner :{
            type: Schema.Types.ObjectId,
            ref: "Recipe",
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

