from flask import Flask, jsonify
from flask_cors import CORS

from legislator import Legislator as leg
from RSSFeed import RSSFeedMain as rsfm 

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/getVariables', methods=['GET'])
def get_variables():
    return None
    #return leg.parseLegislator("legislators-current.csv")

@app.route('/getStudyDesign', methods=['GET'])
def get_study_design():
    return None

@app.route('/getAssumptions', methods=['GET'])
def get_assumptions():
    return None

@app.route('/hypothesize', methods=['POST'])
def hypothesize():
    return None 

if __name__ == '__main__':
    app.run()