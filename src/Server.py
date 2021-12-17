from flask import Flask, request
from flask_migrate import Migrate
from flask_bootstrap import Bootstrap

from models import db, universities, users
from Data import SSL_CERT, SSL_KEY

import json, datetime

app = Flask(__name__)
app.debug = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///info.db'
app.config['SECRET_KEY'] = 'Super_secret'
app.permanent_session_lifetime = datetime.timedelta(days=365)
db.app = app
db.init_app(app)
migrate = Migrate(app, db)
Bootstrap(app)
db.create_all()

@app.route('/MainInfo', methods=["POST", "GET"])
def MainInfo():
    items = universities.query.limit(5).all()
    response = app.response_class(
        response=str(items),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/GetInfo', methods=["POST", "GET"])
def GetInfo():
    if request.args.get('Id'):
        Id = int(request.args.get('Id'))
        item = universities.query.filter(universities.id == Id).all()
        response = app.response_class(
            response=str(item),
            status=200,
            mimetype='application/json'
        )
        return response
    return "Не передан Id"

@app.route('/Favorites', methods=["POST", "GET"])
def Favorites():
    if request.args.get('Id'):
        Id = int(request.args.get('Id'))
        favs = json.loads(users.query.filter(users.id == Id).first())['favorites']
        items = universities.query.filter(universities.id in favs).all() 
        response = app.response_class(
            response=str(items),
            status=200,
            mimetype='application/json'
        )
        return response
    return "Не передан Id"

if __name__ == '__main__':
    # DB, University, User = DBSet()
    app.run(host='0.0.0.0', port=13535, ssl_context=(SSL_CERT, SSL_KEY))