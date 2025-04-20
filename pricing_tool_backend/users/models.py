from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ADMIN = 'admin'
    BUYER = 'buyer'
    SUPPLIER = 'supplier'
    
    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (BUYER, 'Buyer'),
        (SUPPLIER, 'Supplier'),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
    )
    custom_role = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email