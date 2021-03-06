from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import Ingredient, Fridge, Recipe
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = User
    fields = ('first_name', 'last_name', 'email', 'date_joined', 'username')

class IngredientSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Ingredient
    fields = ('id', 'url', 'name', 'source')

class FridgeSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Fridge
    fields = ('id', 'url','ingredients', 'owners')

class RecipeSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = Recipe
    fields = ('id', 'url', 'title', 'image', 'ingredients', 'instructions')


class UserSerializerWithToken(serializers.ModelSerializer):

  token = serializers.SerializerMethodField()
  password = serializers.CharField(write_only=True)

  def get_token(self, obj):
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    payload = jwt_payload_handler(obj)
    token = jwt_encode_handler(payload)
    return token

  def create(self, validated_data):
    password = validated_data.pop('password', None)
    instance = self.Meta.model(**validated_data)
    if password is not None:
      instance.set_password(password)
    instance.save()
    return instance

  class Meta:
    model = User
    fields = ('token', 'first_name', 'last_name', 'email', 'password', 'username')