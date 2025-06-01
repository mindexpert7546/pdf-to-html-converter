# General Prerequisites: 

## Backend : 
1. Python 3.x must be installed recommended (Python 3.12.4)
2. pip and git should be available in your system path

## Fronend :
1. Node js Latest recommended (v22.15.0)
2. Install Angular CLI
```
npm install -g @angular/cli
```

## Screenshot: 
![image](https://github.com/user-attachments/assets/8cd58967-17b5-491f-8bb3-2ebcae9f3ded)

![image](https://github.com/user-attachments/assets/a4d4d4de-5dac-4b6a-aa0c-d81aaf7f07f8)




# How to run the backend : 
## 💻 Windows
```
git clone https://github.com/mindexpert7546/pdf-to-html-converter.git
cd pdf-to-html-converter\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
set FLASK_APP=main.py
set FLASK_ENV=development
flask run
```

## 🍎 macOS / 🐧 Linux
```
git clone https://github.com/mindexpert7546/pdf-to-html-converter.git
cd pdf-to-html-converter/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export FLASK_APP=main.py
export FLASK_ENV=development
flask run
```

# How to run Frontend : 
## 📂 Step-by-Step (All OS)
### Step 1: Navigate to the frontend folder
```
cd pdf-to-html-converter/frontend
```
### Step 2: Install dependencies
```
npm install --f
```
### Step 3: Run the Angular development server
```
npm start
```
