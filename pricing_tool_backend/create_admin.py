# create_admin.py
import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pricing_tool.settings")
django.setup()

User = get_user_model()

if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser("admin", "admin@gmail.com", "admin")
    print("✅ Superuser 'admin' created.")
else:
    print("ℹ️ Superuser 'admin' already exists.")
