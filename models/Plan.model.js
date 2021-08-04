const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
  title: { type: String, default: 'First Plan' },
  dateOfCreation: { type: Date, default: new Date() },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  recipes: [
    {
      dayOfWeek: String,
      mealName: String,
      recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    },
  ],
});

planSchema.methods.recipeFor = function (dayOfWeek, mealName) {
  return this.recipes.find(
    (plannedRecipe) =>
      plannedRecipe.dayOfWeek === dayOfWeek &&
      plannedRecipe.mealName === mealName
  );
};

const planModel = mongoose.model('Plan', planSchema);

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
