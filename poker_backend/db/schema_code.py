from sqlalchemy import create_engine, Column, String, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()

DATABASE_URL = "sqlite:///./database.db"


class Room(Base):
    __tablename__ = "rooms"
    id = Column(String, primary_key=True, index=True, unique=True)
    # Add other columns as necessary, e.g., game state, player count, etc.
    room_id = Column(String, primary_key=False, unique=True)
