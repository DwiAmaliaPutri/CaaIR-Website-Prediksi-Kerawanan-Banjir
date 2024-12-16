from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)  # Izinkan CORS untuk semua rute
model = pickle.load(open('rf_model.pkl', 'rb'))

# Mapping for categorical features
lahan_mapping = {
    'Badan Air': 1,
    'Gedung/Bangunan': 2,
    'Hutan': 3,
    'Pekebunan/Kebun': 4,
    'Permukiman': 5,
    'Sawah': 6,
    'Sawah Tadah Hujan': 7,
    'Semak Belukar': 8,
    'Tegalan/Ladang': 9
}

tanah_mapping = {
    'Regosol': 1,
    'Litosol': 2,
    'Andosol': 3,
    'Grumusol': 4,
    'Latosol': 5,
    'Aluvial': 6,
    'Podsolik': 7,
    'Clay': 8
}

# Endpoint untuk prediksi
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Ambil data JSON dari request
    # Periksa apakah data ada dan lengkap
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Cek apakah data memiliki semua kolom yang dibutuhkan
    required_fields = ['Jenis Tanah', 'Penggunaan Lahan', 'curah_hujan']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400    

    # Transformasi data 
    data_transformed = np.array([[
        data['curah_hujan'],
        tanah_mapping[data['Jenis Tanah']],
        lahan_mapping[data['Penggunaan Lahan']]
    ]])

    # Prediksi menggunakan model
    predictions = model.predict(data_transformed)  # Model prediction
    probabilitas = model.predict_proba(data_transformed)  # Model probability prediction

    # Ambil hasil prediksi dan probabilitas
    prediksi_label = predictions[0]
    probabilitas = {
        'prediction_score_Rendah': probabilitas[0][0],
        'prediction_score_Sedang': probabilitas[0][1],
        'prediction_score_Tinggi': probabilitas[0][2]
    }

    # Kembalikan hasil sebagai JSON
    return jsonify({
        'prediction': prediksi_label,
        'probabilities': probabilitas
    })

@app.route('/predictions', methods=['GET'])
def get_predictions():
    # Mengembalikan seluruh hasil prediksi yang disimpan dalam list
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
