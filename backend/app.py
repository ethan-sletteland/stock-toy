import json
import os
from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import requests
import yfinance as yf
# from get_all_tickers import get_tickers as gt, broken :(
# import nasdaqdatalink
from firebase import firebase

app = Flask(__name__)
cors = CORS(app)

firebase = firebase.FirebaseApplication(
    'https://sellscale-1488e-default-rtdb.firebaseio.com/', authentication=None)


@app.route('/')
def Home():

    msft = yf.Ticker("MSFT")

    # get stock info
    msft.info
    return jsonify(msft.info)


@app.route('/stock', methods=['GET'])
def Stock():
    if request.args.get('ticker') is not None:
        stock = yf.Ticker(request.args.get('ticker'))
        return jsonify(stock.info)
    else:
        # need a list of valid tickers, but everything seems broken or costs money
        filename = os.path.join(app.static_folder, '', 'tickers.json')

        with open(filename) as test_file:
            data = json.load(test_file)
        return jsonify(data)


@app.route('/portfolio', methods=['GET', 'POST', 'DELETE'])
def Portfolio():
    if request.method == 'GET':
        result = firebase.get('/stocks', None)
        return jsonify(result)
    elif request.method == 'POST':
        data = {
            "symbol": request.json.get("symbol"),
            "userId": request.json.get("userId"),
            "name": request.json.get("name"),
            "shortName": request.json.get("shortName"),
            "logo_url": request.json.get("logo_url"),
            "ask": request.json.get("ask"),
        }
        result = firebase.post("/stocks", data)
        print(data)
        return result
    elif request.method == 'DELETE':
        key = request.args.get("key")
        result = firebase.delete("/stocks", key)
        print(result)
        return result


if __name__ == '__main__':
    app.run(debug=True)
