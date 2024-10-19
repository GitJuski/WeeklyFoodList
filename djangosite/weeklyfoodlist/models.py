from django.db import models

class Food(models.Model):

    title = models.CharField(max_length=50)
    description = models.TextField(max_length=300, null=True)

    RATING = (
        (0,0),
        (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5),
    )

    rating = models.IntegerField(null=True, choices=RATING, default=0)

    CATEGORY = (
        ('Fish', 'Fish'),
        ('Soup', 'Soup'),
        ('Other', 'Other'),
    )

    category = models.CharField(max_length=10, choices=CATEGORY, default='Other')

    def __str__(self):
        return self.title
