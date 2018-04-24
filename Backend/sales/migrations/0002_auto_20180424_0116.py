# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-04-24 01:16
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sales', '0001_initial'),
    ]

    operations = [
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
