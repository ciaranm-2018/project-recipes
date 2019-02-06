from flask import Blueprint
routes = Blueprint('routes', __name__)


#recepe domain related routes
from .recepe import *

#search endpoint
from .search import *

#statistics endpoint
from .statistic import *

#sample endpoint
from .example import *
