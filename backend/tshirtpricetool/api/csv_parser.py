# for parsing CSV's.  Just a test for now

from models import *
import csv

def parse_prices():
    with open('prices.csv') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            id = row[0]
            style = Style.objects.get(style_id=id)
            stylePrice = StylePrice(
                style=style,
                price1=row[1],
                price2=row[2],
                price3=row[3],
                price4=row[4],
                price5=row[5]
            )
            stylePrice.save()
