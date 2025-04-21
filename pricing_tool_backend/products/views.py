from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from utils.api_utils import success_response
from utils.pagination import StandardResultPagination
from utils.api_utils import validation_error_response

from .models import Product
from .serializers import ProductSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def product_list(request):
    if request.method == 'GET':
        # Get query params for filterting
        name = request.query_params.get('name')
        category = request.query_params.get('category')
        print(f'name: {name}, category: {category}')

        products = Product.objects.all()
        
        if name:
            products = products.filter(name__icontains=name)
        if category and category.lower() != "all":
            products = products.filter(category__icontains=category)

        # TESTING PAGINATION
        paginator = StandardResultPagination()
        page_queryset   = paginator.paginate_queryset(products, request)
        serializer      = ProductSerializer(page_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)
        # END PAGINATION


        # products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return success_response(data=serializer.data)

    # POST method

    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return success_response(
            data=serializer.data,
            message="Product created successfully",
            status_code=status.HTTP_201_CREATED
        )
    return validation_error_response(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE', 'PATCH'])
@permission_classes([IsAuthenticated])
def product_detail(request, pk):

    product = get_object_or_404(Product, pk=pk)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return success_response(data=serializer.data)
    
    if request.method in ['PUT', 'PATCH']:
        # Use partial=True for PATCH requests, allowing partial updates
        serializer = ProductSerializer(
            product, 
            data=request.data, 
            partial=(request.method == 'PATCH')
        )
        if serializer.is_valid():
            serializer.save()
            # Use 200 OK for PATCH updates and 201 Created for full replacement if desired
            return success_response(
                data=serializer.data,
                message=f"Product {pk} updated successfully"
            )
        return validation_error_response(serializer.errors)

    product.delete()
    return success_response(
        message=f"Product {pk} deleted successfully",
        status_code=status.HTTP_204_NO_CONTENT
    )