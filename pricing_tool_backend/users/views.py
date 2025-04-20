from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer
from utils.api_utils import error_response, success_response, validation_error_response

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save
        return success_response(
            message='Registration successful. Please login.',
            status_code=status.HTTP_201_CREATED
        )
    return validation_error_response(serializer.errors)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = CustomUser.objects.filter(email=serializer.validated_data['email']).first()
        if user is None:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if not user.check_password(serializer.validated_data['password']):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(user)

        data = {
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'custom_role': user.custom_role,
           'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

        return success_response(
            data=data,
            message='Login successful',
            status_code=status.HTTP_200_OK
        )
        
    return validation_error_response(serializer.errors)