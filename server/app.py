#!flask/bin/python
from flask import Flask, jsonify
from flask import abort
from routes import *
from flask_cors import CORS
#from pymongo import MongoClient
# import mongoConfig as db



app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(routes)

@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
