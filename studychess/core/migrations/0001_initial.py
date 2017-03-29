# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-28 02:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('time', models.DateTimeField(auto_now=True)),
                ('description', models.TextField()),
                ('site', models.CharField(choices=[('Lichess', 'Lichess'), ('Chess.com', 'Chess.com')], max_length=50)),
            ],
        ),
    ]