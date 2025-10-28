from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import DiabetesInputSerializer

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

@api_view(['POST'])
@permission_classes([AllowAny])
def predict_diabetes(request):
    serializers = DiabetesInputSerializer(data=request.data)
    
    if serializers.is_valid():
        Pregnancies	= serializers.validated_data['Pregnancies']
        Glucose	= serializers.validated_data['Glucose']
        BloodPressure = serializers.validated_data['BloodPressure']
        SkinThickness = serializers.validated_data['SkinThickness']
        Insulin = serializers.validated_data['Insulin']
        BMI = serializers.validated_data['BMI']
        DiabetesPedigreeFunction = serializers.validated_data['DiabetesPedigreeFunction']
        Age = serializers.validated_data['Age']
    # Training part
    
        data = pd.read_csv('/Users/hiephuynh/Documents/myapps/Doctor_AI/backend/Healthcare/diabetes.csv')
        X = data.drop('Outcome', axis=1)
        Y = data['Outcome']
        X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.fit_transform(X_test)
        
        model = LogisticRegression(max_iter=1000, random_state=42)
        model.fit(X_train_scaled, Y_train)
        
        input_data = pd.DataFrame([[Pregnancies, Glucose, BloodPressure, SkinThickness, 
                                    Insulin, BMI, DiabetesPedigreeFunction, Age]], 
                                  columns=X.columns)
        # Scale the input data
        input_scaled = scaler.transform(input_data)
        

        pred = model.predict(input_scaled)
        
        if pred[0] == 1:
            predictions = "Positive" 
        else:
            predictions = "Negative" 
        
        Y_pred = model.predict(X_test_scaled)
        accuracy = accuracy_score(Y_test, Y_pred)
        
        result = {
            'predictions': predictions,
            'accuracy': round(float(accuracy),2),
            'message': 'Analysis complete'
        }
        return Response(result, status=status.HTTP_200_OK)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)