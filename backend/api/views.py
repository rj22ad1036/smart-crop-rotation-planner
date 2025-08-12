
import json
import pandas as pd
import traceback
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import joblib
# Get base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

crop_model = joblib.load(r'C:\Users\Rishi Mishra\OneDrive\Desktop\Hackathon\smart-crop-rotation-planner\backend\mlmodels\crop_recommendation_model.pkl')
yield_model = joblib.load(r'C:\Users\Rishi Mishra\OneDrive\Desktop\Hackathon\smart-crop-rotation-planner\backend\mlmodels\yield_prediction_model.pkl')
crop_encoder = joblib.load(r'C:\Users\Rishi Mishra\OneDrive\Desktop\Hackathon\smart-crop-rotation-planner\backend\mlmodels\crop_label_encoder.pkl')
prev_crop_encoder = joblib.load(r'C:\Users\Rishi Mishra\OneDrive\Desktop\Hackathon\smart-crop-rotation-planner\backend\mlmodels\previous_crop_encoder.pkl')


# Assuming these are already loaded globally
# crop_model, yield_model, previous_crop_encoder, crop_label_encoder

@csrf_exempt
def predict_crop_and_yield(request):
    if request.method == "POST":
        try:
            # Parse JSON data
            data = json.loads(request.body.decode("utf-8"))
            print("✅ Received data:", data)

            # Extract features
            N = data.get("N")
            P = data.get("P")
            K = data.get("K")
            temperature = data.get("temperature")
            humidity = data.get("humidity")
            ph = data.get("ph")
            rainfall = data.get("rainfall")
            previous_crop = data.get("previous_crop")

            # Encode previous crop
            previous_crop_encoded = crop_encoder.transform([previous_crop])[0]
            print(f"✅ Encoded previous_crop '{previous_crop}' -> {previous_crop_encoded}")

            # Prepare input for crop prediction
            crop_input_df = pd.DataFrame([{
                "N": N,
                "P": P,
                "K": K,
                "temperature": temperature,
                "humidity": humidity,
                "ph": ph,
                "rainfall": rainfall,
                "previous_crop_encoded": previous_crop_encoded
            }])
            print("📊 Input DataFrame for crop prediction:\n", crop_input_df)

            # Predict crop
            predicted_crop_encoded = crop_model.predict(crop_input_df)[0]
            predicted_crop_label = crop_encoder.inverse_transform([predicted_crop_encoded])[0]
            print(f"✅ Predicted crop (encoded): {predicted_crop_encoded}")
            print(f"✅ Predicted crop (label): {predicted_crop_label}")

            # Prepare input for yield prediction (MUST include previous_crop_encoded)
            yield_input_df = pd.DataFrame([{
                "N": N,
                "P": P,
                "K": K,
                "temperature": temperature,
                "humidity": humidity,
                "ph": ph,
                "rainfall": rainfall,
                "previous_crop_encoded": previous_crop_encoded,  # ✅ Added back
                "crop_encoded": predicted_crop_encoded
            }])
            print("📊 Input DataFrame for yield prediction:\n", yield_input_df)

            # Predict yield
            predicted_yield = yield_model.predict(yield_input_df)[0]
            print(f"✅ Predicted yield: {predicted_yield}")

            # Return JSON response
            return JsonResponse({
                "predicted_crop": predicted_crop_label,
                "predicted_yield": predicted_yield
            }, status=200)

        except Exception as e:
            print(f"❌ Error occurred: {e}")
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


