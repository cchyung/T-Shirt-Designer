# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-18 21:58
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Shirt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(default='Default Brand', max_length=100)),
                ('style', models.CharField(default='Default Style', max_length=100)),
                ('description', models.CharField(blank=True, max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='ShirtColor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(default='Default Color', max_length=40)),
                ('shirt', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Shirt')),
            ],
        ),
    ]
