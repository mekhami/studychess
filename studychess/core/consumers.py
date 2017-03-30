import json

from channels import Group
from channels.sessions import channel_session

from .models import Post


@channel_session
def ws_message(message):
    data = json.loads(message.content['text'])
    post = Post.objects.create(
        name=data['name'],
        description=data['description'],
        site=data['site']
    )
    message.channel_session['post'] = post.id


@channel_session
def ws_connect(message):
    current_listings = [post.as_dict() for post in Post.objects.all()]
    response = {
        "players": json.dumps(current_listings),
        "type": "initial"
    }
    response = json.dumps(response)
    message.reply_channel.send({
        "accept": True,
        "text": response,
    })
    Group("listeners").add(message.reply_channel)


@channel_session
def ws_disconnect(message):
    try:
        Post.objects.get(id=message.channel_session['post']).delete()
    except KeyError:
        pass
    Group("listeners").discard(message.reply_channel)
