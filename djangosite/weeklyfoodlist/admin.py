from django.contrib import admin
from . import models

class HelloAdmin(admin.ModelAdmin):
    list_display = ["title", "description", "rating", "category"]


admin.site.register(models.Food, HelloAdmin)