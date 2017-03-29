import json

from django.db import models
from channels import Group
from channels.binding.websockets import WebsocketBinding


class Post(models.Model):
    SITE_CHOICES = (
        ('Lichess', 'Lichess'),
        ('Chess.com', 'Chess.com'),
    )

    name = models.CharField(max_length=255)
    time = models.DateTimeField(auto_now=True)
    description = models.TextField()
    site = models.CharField(max_length=50, choices=SITE_CHOICES)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        message = {'type': 'add', 'players': [self.as_dict()]}
        print(message)
        Group('listeners').send({
            'text': json.dumps(message),
        })

    def as_dict(self):
        return {
            'pk': self.pk,
            'name': self.name,
            'description': self.description,
            'site': self.site
        }

    def delete(self):
        print('called')
        Group("listeners").send({
            'text': json.dumps({'player': self.pk, 'type': 'delete'})
        })
        super().delete()


class PostBinding(WebsocketBinding):
    model = Post
    stream = "post"
    fields = ["name", "description", "site"]

    @classmethod
    def group_names(cls, instance):
        return ["post-updates"]

    def has_permission(self, user, action, pk):
        return True
    model = Post
    stream = "post"
    fields = ["name", "description", "site"]
