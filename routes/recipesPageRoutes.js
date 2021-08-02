const express = require("express");
const router = express.Router();
const recipeModel = require("../models/Recipe.model");
const itemPerPage =50;

class PaginationHelper {
    constructor(itemsPerPage){
        this.itemsPerPage= itemsPerPage;
    }

    itemCount(collection){
        return collection.length;
    };

    pageCount(collection){
        return Math.ceil(collection.length/this.itemsPerPage);
    };

    returnThePage(collection, pageIndex){
        let indexStart= (pageIndex-1)*this.itemsPerPage;
        let indexEnd= indexStart+this.itemsPerPage;
        let itemsOnPage= collection.slice(indexStart,indexEnd);
        console.log(`itemsOnPage`, itemsOnPage);
        return itemsOnPage;
    };
}


const pageHelper = new PaginationHelper(itemPerPage);
/** For AJAX
 * This router handles ajax requests.
 **/
//To give back all the lists
router.get("/recipes/page/:page", (req, res, next) => {
    const page = req.params.page;

    recipeModel.find()
      .then((allRecipes) => {
        let recipesOnPage = pageHelper.returnThePage(allRecipes,page)
        res.status(200).json(recipesOnPage);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });



  
module.exports = router;


