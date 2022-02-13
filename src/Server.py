from flask import Flask, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bootstrap import Bootstrap

from models import db, universities, users
from Data import SSL_CERT, SSL_KEY

import json
import datetime

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
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
    items = universities.query
    if request.args.get('offset'):
        offset = request.args.get('offset')
        items = items.offset(offset)
    if request.args.get('dorm'):
        dorm = bool(request.args.get('dorm'))
        items = items.filter(universities.dorm == dorm)
    if request.args.get('mildep'):
        mildep = bool(request.args.get('mildep'))
        items = items.filter(universities.mildep == mildep)
    if request.args.get('spec'):
        specs = request.args.get('spec')
        items = items.filter(spec in universities.spec for spec in specs)
    if request.args.get('minscore'):
        minscore = int(request.args.get('minscore'))
        items = items.filter(universities.avgscore > minscore)
    if request.args.get('avgscore'):
        avgscore = int(request.args.get('avgscore'))
        items = items.filter(universities.avgscore < avgscore)
    if request.args.get('city'):
        city = request.args.get('city')
        items = items.filter(universities.city in city)
    if request.args.get('limit'):
        limit = request.args.get('limit')
        items = items.limit(limit)
    items: list[dict] = items.all()
    if request.args.get('NamesOnly'):
        items = [{'id':item.id, 'name':item.name} for item in items]
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
        favs = json.loads(users.query.filter(
            users.id == Id).first())['favorites']
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
