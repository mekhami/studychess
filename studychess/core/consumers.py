from channels.sessions import channel_session
from django.core import serializers

from .models import Post


@channel_session
def ws_message(message):
    message.reply_channel.send({
        "text": message.content["text"],
    })


@channel_session
def ws_connect(message):
    current_listings = Post.objects.all()
    serialized = serializers.serialize('json', current_listings)
    message.reply_channel.send({
        "accept": True,
        "text": serialized,
    })
