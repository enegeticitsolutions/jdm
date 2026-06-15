from ninja import NinjaAPI
from .models import Sector, Country
from .schemas import SectorSchema, CountrySchema, ClienteleResponseSchema
# from .
from django.conf import settings

api = NinjaAPI(csrf=False, urls_namespace="clientele-api")


def get_logo_data(request, logos):
    return [
        {
            "id": logo.id,
            "src": request.build_absolute_uri(settings.MEDIA_URL + str(logo.image)) if logo.image else "",
            "alt": logo.alt_text or f"Logo {logo.id}"
        }
        for logo in logos
    ]


@api.get("/sectors/", response=list[SectorSchema])
def get_sectors(request):
    sectors = Sector.objects.prefetch_related("logos").all()
    return [
        {
            "name": sector.name,
            "logos": get_logo_data(request, sector.logos.all())
        }
        for sector in sectors
    ]


@api.get("/countries/", response=list[CountrySchema])
def get_countries(request):
    countries = Country.objects.prefetch_related("subcountries__logos").all()
    result = []
    for country in countries:
        sub_data = []
        for sub in country.subcountries.all():
            sub_data.append({
                "name": sub.name,
                "logos": get_logo_data(request, sub.logos.all())
            })

        # If a country has only one subcountry and its name is the same as the country's name (like India),
        # we elevate the logos to the country level and set subcountries to None.
        if len(sub_data) == 1 and sub_data[0]["name"] == country.name:
            result.append({
                "name": country.name,
                "logos": sub_data[0]["logos"],
                "subcountries": None
            })
        else:
            result.append({
                "name": country.name,
                "logos": None,
                "subcountries": sub_data if sub_data else None
            })

    return result


@api.get("/", response=ClienteleResponseSchema)
def get_clientele_all(request):
    return {
        "sectors": get_sectors(request),
        "countries": get_countries(request)
    }