# Generated by Django 4.0.4 on 2022-10-04 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dulichapp', '0002_diemdulich'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diadiem',
            name='ngay_khoi_hanh',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='diadiem',
            name='ten',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='diemdulich',
            name='ten',
            field=models.CharField(max_length=100),
        ),
    ]
