# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-05-10 02:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='saleproduct',
            name='quantity',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]
