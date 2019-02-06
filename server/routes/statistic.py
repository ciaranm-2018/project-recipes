from flask import Flask, jsonify,  request, abort, make_response
from . import routes
from bson import json_util
from bson.json_util import dumps
from bson.objectid import ObjectId
import json
import datetime
from pymongo import MongoClient
# import mongoConfig

#Connection
client = MongoClient("mongodb://127.0.0.1:27017") #host uri

db = client.recepedb #Select the database
#Collections
recipe = db.recipe 

# search country pie
@routes.route('/api/statpie/country/',methods = ['GET'])
def countryPie():
    try:
        results = db.recipe.find({})
        if(results.count() != 0):
            list_countries = [i["country"] for i in results]
            result_dict = [ [i,list_countries.count(i)] for i in set(list_countries) ]
            result_dict.insert(0,["country", "count"])
            print(result_dict)

            resp = make_response(json.dumps(result_dict),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp
        else:
            json_data = []
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp

    except Exception as e:
        print(e)
        return abort(500)

# meal pie
@routes.route('/api/statpie/mealtype/',methods = ['GET'])
def mealTypePie():
    try:
        results = db.recipe.find({})
        if(results.count() != 0):
            list_countries = [i["mealType"] for i in results]
            result_dict = [ [i,list_countries.count(i)] for i in set(list_countries) ]
            result_dict.insert(0,["mealType", "count"])
            print(result_dict)

            resp = make_response(json.dumps(result_dict),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp
        else:
            json_data = []
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp

    except Exception as e:
        print(e)
        return abort(500)

# viewsd
@routes.route('/api/stattable/view/',methods = ['GET'])
def TopCountryRecepy():
    try:
        # results = db.recipe.find().sort({"metrics.views" : 1 }).limit(5)
        results = db.recipe.find({})
        if(results.count() != 0):
            unsortedlist = [i for i in results]
            sortedList = sorted(unsortedlist, key=lambda x: x['metrics']['views'], reverse=True)
            result_dict = [ [i["recipeName"],i['metrics']['views']] for i in sortedList[:10] ]
            result_dict.insert(0,["Recipe Name", "no of views"])
            # print(result_dict)

            resp = make_response(json.dumps(result_dict),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp
        else:
            json_data = []
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp
            
    except Exception as e:
        print(e)
        return abort(500)