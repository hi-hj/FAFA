# Generated by Django 2.1.1 on 2020-12-03 14:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('FAFA', '0005_auto_20201202_0245'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='onCompanyRoad',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='location',
            name='onHomeRoad',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='setlocation',
            name='user_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='FAFA.User'),
        ),
    ]
