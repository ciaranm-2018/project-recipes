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


# search recepe by name
@routes.route('/api/multi/search/',methods = ['POST'])
def multiSearch():
    try:
        req_data = request.get_json()
        fields = req_data.keys()

        dynamicQuery = {'$and':[]}
        for i in list(fields):
            queryObject = {}
            queryObject[i] = {'$regex':req_data[i]}
            dynamicQuery['$and'].append(queryObject)

        recepe = db.recipe.find(dynamicQuery)
        if(recepe.count() != 0):
            dataList= []
            for i in recepe :
                json_data = {}
                json_data["id"] = str(i["_id"])
                json_data["recipeName"] = i["recipeName"]
                json_data["description"] =i["description"]
                json_data["imageName"] =i["imageName"]
                
                now  = datetime.datetime.utcnow()# Now
                duration = now - i["inserted_date"]
                hours = duration.days

                if (hours<24):
                    json_data["isNew"] =True
                else:
                    json_data["isNew"] =False

                json_data['matrics'] =i["metrics"]

                dataList.append(json_data)
            #print(dataList)
            resp = make_response(json.dumps(dataList),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp
        else:
            json_data = []
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp

    except Exception as e :
        print(e)
        return abort(500)


# search country map
@routes.route('/api/country/map/',methods = ['GET'])
def countryValues():
    try:
        results = db.recipe.find({})

        list_countries = [i["country"] for i in results]
        result_dict = [ {"country":i,"count":list_countries.count(i)} for i in set(list_countries) ]

        print(result_dict)

        resp = make_response(json.dumps(result_dict),200)
        resp.headers['Content-type'] = 'application/json; charset=utf-8'
        return resp

    except Exception as e:
        print(e)
        return abort(500)

# search meal map
@routes.route('/api/mealtype/map/',methods = ['GET'])
def mealTypeValues():
    try:
        results = db.recipe.find({})
        d = {}
        list_countries = [i["mealType"] for i in results]
        result_dict = [ {"mealType":i,"count":list_countries.count(i)} for i in set(list_countries) ]

        print(result_dict)

        resp = make_response(json.dumps(result_dict),200)
        resp.headers['Content-type'] = 'application/json; charset=utf-8'
        return resp

    except Exception as e:
        print(e)
        return abort(500)
