from rest_framework import serializers
from . models import Food

class FoodSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Food
        fields = ['url', 'title', 'description', 'rating', 'category']