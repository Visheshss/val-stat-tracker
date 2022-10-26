from distutils.log import debug
from flask import Flask, app, jsonify, request, json, make_response, session
import requests

app = Flask(__name__)
app.secret_key = 'key'


@app.route('/player/<name>/<tag>', methods=['GET', 'POST'])
def player(name, tag):
    # If username has spaces in it, replace them with '%20' so that the API understands
    name = name.split(' ')
    if len(name) > 1:
        convert_name = str(name[0])
        for n in name[1:]:
            convert_name += '%20' + str(n)
        name = convert_name
    else:
        name = name[0]

    # Make API request using the username and return it to the frontend
    response_API = requests.get(
        'https://api.henrikdev.xyz/valorant/v1/account/'+name+'/'+tag+'?force=false')
    data = response_API.text
    parse_json = json.loads(data)

    print(parse_json)
    return parse_json


if __name__ == '__main__':
    app.run(debug=True)
