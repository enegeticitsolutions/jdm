from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from uuid import UUID

# Clientele Page Schema
class LogoSchema(BaseModel):
    id: UUID
    src: str
    alt: str


class SubCountrySchema(BaseModel):
    name: str
    logos: List[LogoSchema]


class CountrySchema(BaseModel):
    name: str
    logos: Optional[List[LogoSchema]] = None
    subcountries: Optional[List[SubCountrySchema]] = None


class SectorSchema(BaseModel):
    name: str
    logos: List[LogoSchema]


class ClienteleResponseSchema(BaseModel):
    sectors: List[SectorSchema]
    countries: List[CountrySchema]