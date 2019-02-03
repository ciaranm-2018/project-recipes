from pymongo import MongoClient

#Connection
client = MongoClient("mongodb://127.0.0.1:27017") #host uri

db = client.recepedb #Select the database

#Collections
recipe = db.recipe 
recipe_author = db.recipe_author

#sample data for initialize DB
data = {

    "totalTime" : "sample",
    "description" : "sample",
    "ingredients" : "sample",
    "calories" : "sample",
    "yield" : "sample",
    "fat" : "sample",
    "cookTime" : "sample",
    "recipeName" : "sample",
    "prepTime" : "sample",
    "instructions" : "sample"
}

recipe.insert(data)
# recipe.delete_one({"recipeName" : "sample"})

