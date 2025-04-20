from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'role', 'custom_role')
        extra_kwargs = {
            'role': {'required': True},
            'custom_role': {'required': False}
        }
    
    def validate(self, attrs):
        if attrs.get('role') not in [choice[0] for choice in CustomUser.ROLE_CHOICES]:
            if not attrs.get('custom_role'):
                raise serializers.ValidationError({
                    "role": "For custom roles, please provide a custom_role value"
                })
        return attrs

    def create(self, validated_data):
        role = validated_data['role']
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=role,
            custom_role=validated_data.get('custom_role')
        )

        # Grant superuser/admin privileges if role is admin
        if role == CustomUser.ADMIN:
            user.is_staff = True
            user.is_superuser = True
            user.save()

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)