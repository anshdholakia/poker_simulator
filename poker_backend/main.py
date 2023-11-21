#############################
#### main.py - for FASTAPI endpoints
#### Built in -> 3rd party -> Custom Modules
#############################

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine

from routes import room_creation_routes, log_sign_in_routes
from db.schema_code import Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(room_creation_routes.router)
app.include_router(log_sign_in_routes.router)

@app.get('/')
def main():
    return {'message': 'Poker Backend is running'}

@app.on_event("startup")
def startup_event():
    engine = create_engine(os.environ['DATABASE_URL'])
    Base.metadata.create_all(bind=engine)
