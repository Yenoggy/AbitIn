from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class universities(db.Model):
    id =                db.Column( db.Integer     , primary_key=True)
    name =              db.Column( db.String(90)  , nullable=False)
    imgurl =            db.Column( db.String(150) , nullable=False)
    mincost =           db.Column( db.Integer     , nullable=False)
    spec =              db.Column( db.String(40)  , nullable=False)
    city =              db.Column( db.String(20)  , nullable=False)
    address =           db.Column( db.String(40)  , nullable=False)
    avgscore =          db.Column( db.Integer     , nullable=False)
    minscore =          db.Column( db.Integer     , nullable=False)
    mildep =            db.Column( db.Boolean     , nullable=False)
    dorm =              db.Column( db.Boolean     , nullable=False)
    extra =             db.Column( db.String(500)) # Dict

    def __repr__(self):
        return f'{{"id":"{self.id}", "name":"{self.name}", "imgurl":"{self.imgurl}", "mincost":"{self.mincost}", "spec":"{self.spec}", "city":"{self.city}", "address":"{self.address}", "avgscore":"{self.avgscore}", "minscore":"{self.minscore}", "mildep":"{self.mildep}", "dorm":"{self.dorm}", "extra":{self.extra}}}'

class users(db.Model):  
    id =                db.Column( db.Integer     , primary_key=True)  
    favorites =         db.Column( db.String(200)) # List

    def __repr__(self):
        return f'{{"id":"{self.id}", "favorites":{self.favorites}}}'