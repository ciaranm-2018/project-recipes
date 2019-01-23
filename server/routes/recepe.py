from flask import Flask, jsonify,  request, abort, make_response
import mongoConfig as db
from . import routes
from bson import json_util
from bson.json_util import dumps
from bson.objectid import ObjectId
import json


@routes.route('/api/recepies',methods = ['GET'])
def getAllRecepes():
    try:
        x = db.recipe.find({})
        a= []
        for i in x :
            json_data = {}
            json_data["recipeName"] = i["recipeName"]
            json_data["description"] =i["description"]
            a.append(json_data)
        print(a)
        resp = make_response(json.dumps(a),200)
        resp.headers['Content-type'] = 'application/json; charset=utf-8'
        return resp
    except Exception as e:
        print(e)
        return abort(500)

@routes.route('/api/recepies',methods = ['POST'])
def addRecepe():
    try:
        req_data = request.get_json()
        # x = req_data["recepe_creator"]
        # db.recipe_author.insert({req_data["recepe_creator"]})
        db.recipe.insert(req_data)
        return jsonify(success=True)
    except :
        return abort(500)




