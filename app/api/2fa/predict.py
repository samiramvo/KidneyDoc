import pandas as pd
import joblib

# Charger le modèle enregistré
model_filename = 'best_xgboost_model_final.joblib'
best_clf4431 = joblib.load(model_filename)


def predict_first_row_from_excel(file_path):
    # Lire le fichier Excel
    data = pd.read_excel(file_path)

    # Vérifier s'il y a des lignes dans le fichier
    if data.empty:
        print("Le fichier est vide.")
        return

    # Prédire uniquement sur la première ligne
    first_row = data.iloc[0:1]  # Prendre uniquement la première ligne

    # Faire la prédiction
    prediction = best_clf4431.predict(first_row)

    # Afficher la prédiction sous forme 'CKD_Stage : <prédiction>'
    print(f"CKD_Stage : {prediction[0]}")
