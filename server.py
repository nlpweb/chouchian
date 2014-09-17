from flask import Flask, render_template, url_for, make_response, Response, jsonify, request
import sys, json, os
from pprint import pprint

app = Flask(__name__, template_folder=".")

@app.route('/')
def hello():
	return render_template( 'index.html' )

if __name__ == "__main__":
	import getopt, sys

	_port = 5000
	app.debug = False

	try:
		opts, args = getopt.getopt(sys.argv[1:],'p:d',['port=', 'debug'])
	except getopt.GetoptError:
		exit(2)

	for opt, arg in opts:
		if opt in ('-p', '--port'): _port = int(arg.strip())
		elif opt in ('-d','--debug'): app.debug = True

	app.run(host='0.0.0.0', port=_port)
