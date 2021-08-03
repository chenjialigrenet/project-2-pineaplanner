const express = require("express");
const router = express.Router();
const recipeModel = require("../models/Recipe.model");
const itemPerPage =30;

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
        return itemsOnPage;
    };
}


const pageHelper = new PaginationHelper(itemPerPage);
/** For AJAX
 * This router handles ajax requests.
 **/
//To give back all the lists
router.post("/recipes/page/:page", (req, res, next) => {
    const page = req.params.page;
    console.log(req.body);

    let dishTypes=req.body.dishTypes;
    let searchTitle=req.body.searchTitle;
    let glutenFree=req.body.glutenFree;
    let vegan=req.body.vegan;
    let vegetarian=req.body.vegetarian;
    let dairyFree=req.body.dairyFree;
    let titleReg = new RegExp(`[A-Za-z]`);
    
    if(searchTitle!=="[A-Za-z]"){
        titleReg = new RegExp(searchTitle,"gi");    
        //titleReg = new RegExp(`/${searchTitle}/gi`);    
    }

    
        let queyDishType={};
        let queryDiets={};
        let queryTitle={title:titleReg};
        let query={};

    if (glutenFree===false  &&
            vegan===false       &&
            vegetarian===false  &&
            dairyFree===false){
                queryDiets={};
                console.log(`queryDiets`, queryDiets);
            }
    
    else{
        queryDiets={glutenFree:glutenFree,dairyFree:dairyFree,vegan:vegan,vegetarian:vegetarian,};
        console.log(`queryDiets`, queryDiets);
    }

    if (dishTypes.length===0){
        queryDishType={}
        console.log(`queyDishType`, queryDishType);
    }

    else{
        queryDishType= {dishTypes:{$in:dishTypes}};
        console.log(`queryDishType`, queryDishType);
    }
    


    query= {...queryDishType,...queryDiets,...queryTitle};
    console.log(`query`, query);
    
    recipeModel.find(query)
            .then((allRecipes) => {
            let allPage= allRecipes.length;
            let recipesOnPage = pageHelper.returnThePage(allRecipes,page)
            let response ={};
            response.allPage=allPage;
            response.recipes=recipesOnPage;
            res.status(200).json(response);
        })
            .catch((err) => {
            res.status(500).json(err);
        });
  });


//GET One Recipe Page//
router.get('/recipes/page/:id', (req, res, next) => {
    
    recipeModel.findById(req.params.id)
      .then((foundRecipe) => {

        res.status(200).json(foundRecipe);
      })
      .catch((err) => {
        next(err);
      });
  });



  
module.exports = router;


