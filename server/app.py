import os
from flask import Flask, jsonify, abort
from flask_cors import CORS
from routes import *


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(routes)

@app.route('/')
def index():
    return "Hello, World!"


if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8081)))