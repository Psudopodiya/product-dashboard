from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Product(models.Model):
    objects = None
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.0)])
    selling_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.0)])
    category = models.CharField(max_length=100)
    stock_available = models.IntegerField(validators=[MinValueValidator(0)])
    units_sold = models.IntegerField(validators=[MinValueValidator(0)])
    customer_rating = models.IntegerField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    demand_forecast = models.IntegerField(validators=[MinValueValidator(0.0)])
    optimized_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.0)], default=0)

    def __str__(self):
        return self.name
