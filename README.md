# Getting Started

## Prerequisites

The following steps require [NodeJS](https://nodejs.org/en/) and [Python](https://www.python.org/) to be installed on your system. Please install them beforehand if you haven't already.

## Steps to Set Up the Project

### Clone the repository:
   ```bash
   git clone https://github.com/SamaT-rgb/Study-Copilot.git   /SamaT-rgb/Study-Copilot
   ```

### Set Up Python Virtual Environment
1. Install Virtual Environment (if it doesn't already exist):
   ```bash
   python3 -m pip install --user virtualenv
   ```

2. Create a virtual environment:
   ```bash
   python -m venv <environment_name>
   ```

3. Activate the virtual environment:
   ```bash
   source <environment_name>/bin/activate
   ```

4. Install the reqiured packages
    ```bash
    pip install -r requirements.txt
    ```

### Install the project dependencies:
   ```bash
   npm install
   ```

### Run the development server:
   ```bash
   npm run dev
   ```

   After a few seconds, your project should be accessible at:
   [http://localhost:5173/](http://localhost:5173/)

### Build the project for release (if needed):
   ```bash
   npm run build
   ```

## Notes

- Replace `<environment_name>` with the desired name for your virtual environment.
- Ensure that all dependencies are installed before running the development server.
