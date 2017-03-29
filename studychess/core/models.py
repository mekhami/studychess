from django.db import models
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
