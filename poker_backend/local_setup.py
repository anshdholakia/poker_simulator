#############################
#### Local_setup.py - for local setup
#### Built in -> 3rd party -> Custom Modules
#############################

import os
import subprocess

# Set the path to your poker_backend directory and venv directory
poker_backend_path = os.path.dirname(os.path.abspath(__file__))
venv_path = os.path.join(poker_backend_path, 'backend_venv')

# Check if virtual environment exists
if not os.path.exists(venv_path):
    print("Creating virtual environment...")
    # Create virtual environment
    subprocess.check_call(["python", "-m", "venv", venv_path])
else:
    print("Virtual environment already exists.")

# Install requirements
print("Installing requirements...")

activate_script = 'activate.bat'
activate_path = os.path.join(venv_path, 'Scripts', activate_script)

# Command to activate the virtual environment
subprocess.check_call(f'{activate_path} && pip install -r {os.path.join(poker_backend_path, "requirements.txt")}', shell=True)

# Make environment variables
os.environ['DATABASE_URL'] = "sqlite:///db/database.db"

# Check if database exists, if not create it
db_path = os.path.join(poker_backend_path, 'db', 'database.db')
if not os.path.exists(db_path):
    print("Creating database...")
    open(db_path, 'w').close()

# Run FastAPI
print("Starting FastAPI server...")
subprocess.check_call(f'{activate_path} && uvicorn main:app --reload', shell=True)

print("Setup complete!")
