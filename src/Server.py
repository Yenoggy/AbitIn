from fastapi import FastAPI, Request
from threading import Thread
from typing import List

from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Float, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy import create_engine
from sqlite3 import OperationalError

import traceback, uvicorn, json

app = FastAPI()

def DBSet():
    Base = declarative_base()

    class University(Base):
        __tablename__ = 'universities'
        id =                Column( Integer     , primary_key=True)
        name =              Column( String(90)  , nullable=False)
        imgurl =            Column( String(150) , nullable=False)
        mincost =           Column( Integer     , nullable=False)
        spec =              Column( String(40)  , nullable=False)
        city =              Column( String(20)  , nullable=False)
        avgscore =          Column( Integer     , nullable=False)
        minscore =          Column( Integer     , nullable=False)
        mildep =            Column( Boolean     , nullable=False)
        dorm =              Column( Boolean     , nullable=False)
        extra =             Column( String(500))

    class User(Base):  
        __tablename__ = 'users'
        id =                Column( Integer     , primary_key=True)  
        favorites =         Column( String() )

    engine = create_engine('sqlite:///info.db')
    Base.metadata.create_all(engine)
    Base.metadata.bind = engine
    DB = sessionmaker(bind=engine)
    Session = DB()
    return (Session, University, User)

@app.post('/MainInfo')
def MainInfo():
    items: List[University] = University.limit(5).all()
    return items

@app.post('/GetInfo')
def GetInfo(Id):
    item = DB.query(University).filter(University.id == Id).all()
    return item

@app.post('/Favorites')
def Favorites(Id):
    favs = User
    items = DB.query(University).filter(University.id in [*User.favorites]).all() 
    return items



if __name__ == '__main__':
    DB, University, User = DBSet()
    uvicorn.run(app, port=33535)