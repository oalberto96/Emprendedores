# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-05-05 20:52
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=130)),
                ('last_name', models.CharField(max_length=130)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(max_length=30)),
                ('address', models.CharField(max_length=320)),
                ('rfc', models.CharField(max_length=100)),
                ('notes', models.CharField(max_length=300)),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Pay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_product', models.CharField(max_length=130)),
                ('price', models.FloatField()),
                ('sku', models.CharField(max_length=30)),
                ('comment', models.CharField(max_length=130)),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('discount', models.FloatField()),
                ('subtotal', models.FloatField()),
                ('pay_type', models.CharField(max_length=30)),
                ('total', models.FloatField()),
                ('finished', models.BooleanField()),
                ('id_client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sales.Client')),
                ('id_product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sales.Product')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='pay',
            name='id_sale',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sales.Sale'),
        ),
    ]
