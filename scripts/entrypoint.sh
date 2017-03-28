#!/bin/bash
python studychess/manage.py migrate
gulp & python studychess/manage.py runserver 0.0.0.0:8000

