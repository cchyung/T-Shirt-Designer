from openpyxl import load_workbook
import models

# utility methods for parsing an excel sheet to populate the database

def parse_workbook(file_name, clear):
    wb = load_workbook(file_name)

    if clear:
        # temp delete all to refresh db
        print "clearing database"
        models.StyleColor.objects.all().delete()
        models.Style.objects.all().delete()
        models.StyleImage.objects.all().delete()
        models.StylePrice.objects.all().delete()
        models.Addon.objects.all().delete()

    parse_colors(wb.worksheets[0])
    parse_styles(wb.worksheets[1])
    parse_prices(wb.worksheets[2])
    parse_images(wb.worksheets[3])
    parse_addons(wb.worksheets[4])


# parses colors for styles
def parse_colors(colors):
    for i, color_row in enumerate(colors):
        if i >= 1:                                   # skip first row
            color = models.StyleColor(
                color=color_row[0].value,
                hex=color_row[1].value
            )
            color.save()


# parses styles sheets and creates style objects
def parse_styles(styles):
    for i, style_row in enumerate(styles):
        if i >= 1:                                   # skip first row
            # get color ids for style object
            colors = style_row[4].value
            colors = colors.split(',')
            color_ids = []

            for color in colors:
                id = models.StyleColor.objects.get(color=color.strip()).id
                color_ids.append(id)

            # construct style object
            style = models.Style(
                brand=style_row[0].value,
                style_id=style_row[1].value,
                name=style_row[2].value,
                description=style_row[3].value,
                colors=color_ids
            )

            style.save()


# creates prices for each style based on price matrix
def parse_prices(prices):
    for i, price_row in enumerate(prices):
        if i >= 1:
            style_id = price_row[0].value
            style = models.Style.objects.get(style_id=style_id)
            prices = []

            # add prices to prices array
            for j in range(1, 6):
                prices.append(price_row[j].value)

            style_price = models.StylePrice(
                style=style,
                price1=prices[0],
                price2=prices[1],
                price3=prices[2],
                price4=prices[3],
                price5=prices[4]
            )

            style_price.save()


# parses image urls for each style
def parse_images(images):
    for i, image_row in enumerate(images):
        if i >= 1:
            style_id = image_row[0].value
            style = models.Style.objects.get(style_id=style_id)
            color_slug = image_row[1].value
            color = models.StyleColor.objects.get(slug=color_slug)

            style_image = models.StyleImage(
                style=style,
                color=color,
                front=image_row[2].value,
                back=image_row[3].value
            )

            style_image.save()


# parse addons
def parse_addons(addons):
    for i, addon_row in enumerate(addons):
        if i >= 1:
            name = addon_row[0].value
            cost = addon_row[1].value
            print i.__str__() + ": " + name + " " + cost.__str__()
            addon = models.Addon(
                name=name,
                cost=cost
            )

            addon.save()
