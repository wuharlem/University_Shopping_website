# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-10 04:35
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0012_remove_commodity_ranker'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='ranker',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
