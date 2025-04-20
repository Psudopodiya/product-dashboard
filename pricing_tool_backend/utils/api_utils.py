from rest_framework.response import Response
from rest_framework import status

def success_response(data=None, message=None, status_code=status.HTTP_200_OK):
    """
    Standard success response format
    """
    response = {
        "success": True,
        "message": message or "Operation successful"
    }
    
    if data is not None:
        response["data"] = data
        
    return Response(response, status=status_code)

def error_response(message=None, errors=None, status_code=status.HTTP_400_BAD_REQUEST):
    """
    Standard error response format
    """
    response = {
        "success": False,
        "message": message or "Operation failed"
    }
    
    if errors is not None:
        response["errors"] = errors
        
    return Response(response, status=status_code)

def validation_error_response(serializer_errors):
    """
    Format validation errors from serializers
    """
    return error_response(
        message="Validation error",
        errors=serializer_errors,
        status_code=status.HTTP_400_BAD_REQUEST
    )