from flask import Flask, jsonify
from . import routes

@routes.route('/example')
def todos():
    return jsonify({'example': 'example'})