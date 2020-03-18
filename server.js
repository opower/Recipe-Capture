require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3001;
const bodyParser = require("body-parser");
const identifyImage = require('./components/helpers/clarifai_helper');
const getRecipes = require('./components/helpers/spoonacular_helper')

app.use(bodyParser.urlencoded({extended: true, parameterLimit: 100000, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}))

let test;

app.get('/', function (req, res) {
  res.send('Root');
})

app.post('/', async (req,res) => {

  let results = await identifyImage(req.body.data.photo)

  let filtered = results.filter( x => x.value > 0.90 && x.name !== "vegetable" && x.name !== "relish" && x.name !== "sweet" && x.name !== "juice" && x.name !== "pasture" && x.name !== "herb" && x.name !== "condiment" && x.name !== "fruit" && x.name !== "citrus")

  let ingredients = [];
  for (let item of filtered) {
    ingredients.push(item.name)
  }
  
  let recipes = await getRecipes(process.env.SPOON_KEY, ingredients)

})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});