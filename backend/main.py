from flask import Flask, request, jsonify, send_file
import os
import requests
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:4200")  # Proper CORS setup

API_KEY = "wekov21889@baxima.com_m79Yu7EQAunMQgOYN4eXPCBNAeWE2ggCI0ggDa3PAJitL75j5ifn4j5clNwRh05u"
BASE_URL = "https://api.pdf.co/v1"

UPLOAD_FOLDER = './uploads'
OUTPUT_FOLDER = './outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


@app.route('/convert-pdf-to-html', methods=['POST'])
def convert_pdf_to_html():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    uploadedFileUrl = uploadFile(filepath)
    if not uploadedFileUrl:
        return jsonify({'error': 'File upload failed'}), 500

    result_file_path = os.path.join(OUTPUT_FOLDER, f"{os.path.splitext(filename)[0]}.html")
    success, message = convertPdfToHtml(uploadedFileUrl, result_file_path)
    if success:
        return send_file(result_file_path, as_attachment=True)
    else:
        return jsonify({'error': message}), 500


def uploadFile(fileName):
    url = f"{BASE_URL}/file/upload/get-presigned-url?contenttype=application/octet-stream&name={os.path.basename(fileName)}"
    response = requests.get(url, headers={"x-api-key": API_KEY})
    if response.status_code == 200 and not response.json()["error"]:
        uploadUrl = response.json()["presignedUrl"]
        uploadedFileUrl = response.json()["url"]
        with open(fileName, 'rb') as file:
            requests.put(uploadUrl, data=file, headers={"content-type": "application/octet-stream"})
        return uploadedFileUrl
    return None


def convertPdfToHtml(uploadedFileUrl, destinationFile):
    params = {
        "name": os.path.basename(destinationFile),
        "password": "",
        "pages": "",
        "simple": False,
        "columns": False,
        "url": uploadedFileUrl
    }
    url = f"{BASE_URL}/pdf/convert/to/html"
    response = requests.post(url, data=params, headers={"x-api-key": API_KEY})
    if response.status_code == 200 and not response.json()["error"]:
        resultFileUrl = response.json()["url"]
        r = requests.get(resultFileUrl, stream=True)
        if r.status_code == 200:
            with open(destinationFile, 'wb') as f:
                for chunk in r:
                    f.write(chunk)
            return True, "Success"
        return False, "Failed to download converted HTML"
    return False, response.json().get("message", "Conversion error")


if __name__ == '__main__':
    app.run(debug=True)
