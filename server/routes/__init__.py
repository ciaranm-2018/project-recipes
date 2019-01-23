from flask import Blueprint
routes = Blueprint('routes', __name__)


#recepe domain related routes
from .recepe import *

#sample endpoint
from .example import *
