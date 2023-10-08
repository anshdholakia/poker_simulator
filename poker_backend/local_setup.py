####################################################
# local_setup file - used to setup dev environment
# Built-in modules -> 3rd party modules -> custom modules
####################################################
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

# Construct the path to the activate script
activate_path = os.path.join(venv_path, 'Scripts', activate_script)

# Commands to activate the virtual environment and install requirements
commands = [
    f'{activate_path}', 
    f'pip install -r {os.path.join(poker_backend_path, "requirements.txt")}'
]

# Run the commands
subprocess.check_call(' && '.join(commands), shell=True)

print("Setup complete!")
