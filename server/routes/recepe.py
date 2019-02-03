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

def initialize():
    #sample data for initialize DB
    matrics = {'views':0,'likes':0,'dislikes':0}
    data = {
        "totalTime" : "sample","description" : "sample","ingredients" : "sample","calories" : "sample","yield" : "sample",
        "fat" : "sample","cookTime" : "sample","recipeName" : "sample","prepTime" : "sample","instructions" : "sample","inserted_date":datetime.datetime.utcnow(),
        "metrics" : {"views":0,"upVotes":0,"downVotes":0}
    }

    recipe.insert(data)

initialize()

# get all recepies
@routes.route('/api/recepies',methods = ['GET'])
def getAllRecepes():
    try:
        results = db.recipe.find({})
        dataList= []
        for i in results :
            json_data = {}
            json_data["id"] = str(i["_id"])
            json_data["recipeName"] = i["recipeName"]
            json_data["description"] =i["description"]

            now  = datetime.datetime.utcnow()# Now
            duration = now - i["inserted_date"]
            hours = duration.days

            if (hours<24):
                json_data["isNew"] =True
            else:
                json_data["isNew"] =False

            json_data['matrics'] =i["metrics"]

            dataList.append(json_data)
        print(dataList)
        resp = make_response(json.dumps(dataList),200)
        resp.headers['Content-type'] = 'application/json; charset=utf-8'
        return resp
    except Exception as e:
        print(e)
        return abort(500)

#add recepeies
@routes.route('/api/recepies',methods = ['POST'])
def addRecepe():
    try:
        matrics = {'views':0,'likes':0,'dislikes':0}
        req_data = request.get_json()
        req_data['inserted_date'] = datetime.datetime.utcnow()
        req_data['metrics'] = {'views':0,'upVotes':0,'downVotes':0}
        db.recipe.insert(req_data)
        return jsonify(success=True)
    except Exception as e :
        print(e)
        return abort(500)

#get details of a recepe
@routes.route('/api/recepe/<recepe_id>',methods = ['GET'])
def getRecepe(recepe_id):
    try:
        recepe = db.recipe.find({"_id":ObjectId(recepe_id)})

        if(recepe.count() != 0):
            data = recepe[0]
            json_data = {}
            json_data["id"] = str(data["_id"])
            json_data["recipeName"] = data["recipeName"]
            json_data["description"] = data["description"]
            json_data["calories"] = data["calories"]
            json_data["cookTime"] = data["cookTime"]
            json_data["fat"] = data["fat"]
            json_data["ingredients"] = data["ingredients"]
            json_data["totalTime"] =data["totalTime"]
            json_data["yield"] =data["yield"]
            json_data["prepTime"] = data["prepTime"]
            json_data["instructions"] = data["instructions"]

            db.recipe.update(
                {"_id":ObjectId(recepe_id)},
                { "$inc": { "metrics.views": 1 } }
            )

            print(json_data)
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp
        else:
            json_data = {}
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp

    except Exception as e :
        print(e)
        return abort(500)

#Update details of a recepe
@routes.route('/api/recepe/',methods = ['POST'])
def updateRecepe():
    try:
        req_data = request.get_json()

        recepe = db.recipe.find({"_id":ObjectId(req_data["id"])})

        if(recepe.count() != 0):
            data = recepe[0]

            data["recipeName"] = req_data["recipeName"] 
            data["description"] = req_data["description"] 
            data["calories"] = req_data["calories"] 
            data["cookTime"] = req_data["cookTime"] 
            data["fat"] = req_data["fat"] 
            data["ingredients"] = req_data["ingredients"] 
            data["totalTime"] = req_data["totalTime"]
            data["yield"] = req_data["yield"]
            data["prepTime"] = req_data["prepTime"] 
            data["instructions"] = req_data["instructions"] 

            insertedrecod = db.recipe.save(data)
            json_data = {}
            print(json_data)
            json_data['id'] = str(insertedrecod)
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp
        else:
            json_data = {}
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp

    except Exception as e :
        print(e)
        return abort(500)


# delete a recepe
@routes.route('/api/recepe/<recepe_id>',methods = ['DELETE'])
def removeRecepe(recepe_id):
    try:
        recepe = db.recipe.find({"_id":ObjectId(recepe_id)})
        
        if(recepe.count() != 0):
            db.recipe.delete_one({"_id":ObjectId(recepe_id)})
            json_data = {}
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp
        else:
            json_data = {}
            resp = make_response(json.dumps(json_data),200)
            resp.headers['Content-type'] = 'application/json; charset=utf-8'
            return resp

    except Exception as e :
        print(e)
        return abort(500)

# search recepe by name
@routes.route('/api/recepe/search/<name>',methods = ['GET'])
def searchByName(name):
    try:
        recepe = db.recipe.find({ "recipeName": { '$regex': name} } )
        if(recepe.count() != 0):
            dataList= []
            for i in recepe :
                json_data = {}
                json_data["id"] = str(i["_id"])
                json_data["recipeName"] = i["recipeName"]
                json_data["description"] =i["description"]

                now  = datetime.datetime.utcnow()# Now
                duration = now - i["inserted_date"]
                hours = duration.days

                if (hours<24):
                    json_data["isNew"] =True
                else:
                    json_data["isNew"] =False

                json_data['matrics'] =i["metrics"]
                dataList.append(json_data)
            print(dataList)
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
 
@routes.route('/api/recepe/vote',methods = ['POST'])
def Vote():


    try:
        req_data = request.get_json()

        recepe = db.recipe.find({"_id":ObjectId(req_data["id"])})
        if(recepe.count() != 0):
            if(req_data["action"] == "upVotes"):
                db.recipe.update(
                    {"_id":ObjectId(req_data["id"])},
                    { "$inc": { "metrics.upVotes": 1 } }
                )
            elif(req_data["action"] == "downVotes"):
                db.recipe.update(
                    {"_id":ObjectId(req_data["id"])},
                    { "$inc": { "metrics.downVotes": 1 } }
                )
            json_data = []
            resp = make_response(json.dumps(json_data),200)
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
 




