#!/bin/bash
python studychess/manage.py migrate
gulp & python studychess/manage.py runserver 0.0.0.0:8000 &
cd studychess && daphne -b 0.0.0.0 studychess.asgi:channel_layer --port 8888
