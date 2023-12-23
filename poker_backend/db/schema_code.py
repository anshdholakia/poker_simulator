from sqlalchemy import create_engine, Column, String, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "user_information"
    id = Column(Integer, primary_key=True, index=True, unique=True)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

class Rooms(Base):
    __tablename__ = "room_information"
    id = Column(Integer, primary_key=True, index=True, unique=True)
    room_name = Column(String, nullable=False)
    lower_blind = Column(Integer, nullable=False)
    upper_blind = Column(Integer, nullable=False)
    initial_bid = Column(Integer, nullable=False)
    room_id = Column(String(8), unique=True, nullable=False)