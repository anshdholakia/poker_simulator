from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from models import Base, DATABASE_URL
import uuid


#### Main Routes ####
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000/"],  # Adjust with your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    
@app.get('/')
def main():
    return {"message": "Poker Backend is running!"}



# To run the fastapi backend run -> python -m uvicorn main:app --reload
