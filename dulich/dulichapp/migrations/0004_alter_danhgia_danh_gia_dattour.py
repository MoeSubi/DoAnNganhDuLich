# Generated by Django 4.0.4 on 2022-10-24 03:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dulichapp', '0003_remove_user_tuoi'),
    ]

    operations = [
        migrations.AlterField(
            model_name='danhgia',
            name='danh_gia',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.CreateModel(
            name='DatTour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('so_luong', models.IntegerField(default=0)),
                ('thanh_toan', models.IntegerField(choices=[(0, 'ZaloPay'), (1, 'ViettelPay'), (1, 'Momo')], default=0)),
                ('khach_hang', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('tour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dulichapp.diadiem')),
            ],
            options={
                'unique_together': {('tour', 'khach_hang')},
            },
        ),
    ]
