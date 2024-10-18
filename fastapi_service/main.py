from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import os
from dotenv import load_dotenv


# Charger les variables d'environnement
load_dotenv()

# # Charger le modèle
# model_filename = os.path.join(os.path.dirname(
#     __file__), '..', 'models', 'best_xgboost_model_final.joblib')
# best_clf4431 = joblib.load(model_filename)


# Charger le modèle
model_filename = os.path.join(os.path.dirname(
    __file__), '..', 'models', 'best_xgboost_model_final.joblib')

# Vérifiez si le fichier existe
if not os.path.exists(model_filename):
    raise FileNotFoundError(
        f"Le modèle n'a pas été trouvé à l'emplacement : {model_filename}")

best_clf4431 = joblib.load(model_filename)

# Créer une instance de FastAPI
app = FastAPI()
base_url = os.getenv("NEXT_PUBLIC_BASE_URL")
print(f"Base URL: {base_url}")
app.add_middleware(
    CORSMiddleware,
    allow_origins=base_url,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Définir une route pour les prédictions

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     # Lire le fichier Excel
#     contents = await file.read()
#     data = pd.read_excel(contents)

#     # Vérifier s'il y a des lignes dans le fichier
#     if data.empty:
#         return {"error": "Le fichier est vide."}

#     # Prédire uniquement sur la première ligne
#     first_row = data.iloc[0:1]  # Prendre uniquement la première ligne

#     # Faire la prédiction
#     prediction = best_clf4431.predict(first_row)

#     # Convertir la prédiction en un type Python natif
#     # Convert numpy.int64 to native Python int
#     prediction_value = prediction[0].item()

#     # Retourner la prédiction
#     return {"CKD_Stage": prediction_value}

# ... code existant ...

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Lire le fichier Excel
        contents = await file.read()
        data = pd.read_excel(contents)

        # Vérifier s'il y a des lignes dans le fichier
        if data.empty:
            return {"error": "Le fichier est vide."}

        # Prédire uniquement sur la première ligne
        first_row = data.iloc[0:1]  # Prendre uniquement la première ligne

        # Faire la prédiction
        prediction = best_clf4431.predict(first_row)

        # Convertir la prédiction en un type Python natif
        prediction_value = prediction[0].item()

        # Retourner la prédiction
        return {"CKD_Stage": prediction_value}
    except Exception as e:
        return {"error": str(e)}  # Retourner l'erreur
