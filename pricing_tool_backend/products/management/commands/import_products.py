import csv
from django.core.management.base import BaseCommand
from products.models import Product
from django.db import transaction


class Command(BaseCommand):
    help = "Import products from a CSV file"

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help="The CSV file to import")

    def handle(self, *args, **options):
        csv_file = options['csv_file']

        # Open the CSV file
        with open(csv_file, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            products_to_create = []

            for row in reader:
                # Create a Product instance but don't save yet.
                product = Product(
                    name=row.get("name", ""),
                    description=row.get("description", ""),
                    cost_price=row.get("cost_price") or 0,
                    selling_price=row.get("selling_price") or 0,
                    category=row.get("category", ""),
                    stock_available=row.get("stock_available") or 0,
                    units_sold=row.get("units_sold") or 0,
                    customer_rating=row.get("customer_rating") or 0,
                    demand_forecast=row.get("demand_forecast") or 0,
                    optimized_price=row.get("optimized_price") or 0,
                )
                products_to_create.append(product)

        # Bulk create for efficiency
        with transaction.atomic():
            Product.objects.bulk_create(products_to_create)

        self.stdout.write(self.style.SUCCESS("Products imported successfully."))
