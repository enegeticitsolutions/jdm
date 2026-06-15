from django.contrib import admin
from .models import Sector, SectorLogo, Country, SubCountry, CountryLogo
from django.utils.html import format_html


class SectorLogoInline(admin.TabularInline):
    model = SectorLogo
    extra = 1
    readonly_fields = ["preview"]

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 80px; width: auto; border: 1px solid #ccc; border-radius: 4px; padding: 4px; background: #fff;" />',
                obj.image.url
            )
        return "-"
    preview.short_description = "Image Preview"


@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ["name", "logo_count", "logo_gallery"]
    search_fields = ["name"]
    inlines = [SectorLogoInline]

    def logo_count(self, obj):
        return obj.logos.count()
    logo_count.short_description = "Total Logos"

    def logo_gallery(self, obj):
        logos = obj.logos.all()[:8]
        html = "".join([
            f'<img src="{logo.image.url}" style="height: 35px; width: auto; margin-right: 6px; border: 1px solid #ddd; padding: 2px; border-radius: 3px; background: #fff;" />'
            for logo in logos if logo.image
        ])
        total = obj.logos.count()
        if total > 8:
            html += f'<span style="font-size: 11px; color: #777; vertical-align: bottom; font-weight: bold; margin-left: 4px;">+ {total - 8} more</span>'
        return format_html(html) if html else "-"
    logo_gallery.short_description = "Logo Preview (First 8)"


class CountryLogoInline(admin.TabularInline):
    model = CountryLogo
    extra = 1
    readonly_fields = ["preview"]

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 80px; width: auto; border: 1px solid #ccc; border-radius: 4px; padding: 4px; background: #fff;" />',
                obj.image.url
            )
        return "-"
    preview.short_description = "Image Preview"


class SubCountryInline(admin.TabularInline):
    model = SubCountry
    extra = 1


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ["name", "subcountry_count"]
    search_fields = ["name"]
    inlines = [SubCountryInline]

    def subcountry_count(self, obj):
        return obj.subcountries.count()
    subcountry_count.short_description = "Sub-Countries / Regions"


@admin.register(SubCountry)
class SubCountryAdmin(admin.ModelAdmin):
    list_display = ["name", "country", "logo_count", "logo_gallery"]
    list_filter = ["country"]
    search_fields = ["name", "country__name"]
    inlines = [CountryLogoInline]

    def logo_count(self, obj):
        return obj.logos.count()
    logo_count.short_description = "Total Logos"

    def logo_gallery(self, obj):
        logos = obj.logos.all()[:8]
        html = "".join([
            f'<img src="{logo.image.url}" style="height: 35px; width: auto; margin-right: 6px; border: 1px solid #ddd; padding: 2px; border-radius: 3px; background: #fff;" />'
            for logo in logos if logo.image
        ])
        total = obj.logos.count()
        if total > 8:
            html += f'<span style="font-size: 11px; color: #777; vertical-align: bottom; font-weight: bold; margin-left: 4px;">+ {total - 8} more</span>'
        return format_html(html) if html else "-"
    logo_gallery.short_description = "Logo Preview (First 8)"