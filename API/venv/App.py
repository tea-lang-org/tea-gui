from flask import Flask, jsonify, request
from flask_cors import CORS 
import tea 
import pandas as pd

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# cd into venv, run source scripts/activate 
# run python App.py
@app.route('/hypothesize', methods=['POST'])
def hypothesize():
    request_data = request.get_json()
    tea_data = request_data['tea_data']
    tea_vars = request_data['tea_vars']
    tea_study_design = request_data['tea_study_design']
    tea_assumptions = request_data['tea_assumptions']

    print(tea_vars)
    print(tea_study_design)
    print(tea_assumptions)

    gen_indices = False
    indices = []
    d = {}
    for key, value in tea_data.items():
        if key == '':
            continue 
        if not gen_indices: 
            count = len(value)
            for i in range(count):
                indices.append(str(i))      
            gen_indices = True
        d[key] = pd.Series(value, index=indices)


    """
        For testing:
        observational
        So, Prob contributor 
        Prob, Ineq outcome
    """
    tea.data(pd.DataFrame(d))
    tea.define_variables(tea_vars)
    tea.define_study_design(tea_study_design) # Does order of vars in contributor, outcome, etc. matter?
    tea.assume(tea_assumptions)
    results = tea.hypothesize(['Ineq', 'Prob'], ['Ineq ~ -Prob'])
    return results._pretty_print()

if __name__ == '__main__':
    app.run()