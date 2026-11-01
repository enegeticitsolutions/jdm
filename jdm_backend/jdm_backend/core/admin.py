from django.contrib import admin
from .models import HomePageContent, ClienteleItem, AssociationItem, AffiliationItem, SeaPartnerItem, AirPartnerItem, Location, Achievement, News, AboutPageContent, FAQ, Job, JobApplication, Service, ServiceBenefit, ValueAddedService, TeamMember, GalleryPhoto, GalleryEvent, ContactInfo, ContactQuery, IndustrySpecification, Industry, Testimonial, Network, SocialMediaLink, QuickLink, MobileOffcanvas
from django.utils.html import format_html
from django.urls import reverse
from django import forms
from django.core.exceptions import ValidationError
from import_export.admin import ExportActionMixin
from rangefilter.filters import DateRangeFilter

class IndustryForm(forms.ModelForm):
    list_items_text = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 5, 'placeholder': 'Enter each bullet point on a new line'}),
        required=False,
        label="Bullet Points (one per line)",
        help_text="Only used if Type is set to 'Bullet Points'."
    )

    class Meta:
        model = Industry
        fields = ['title', 'type', 'content', 'image', 'is_image_left', 'is_active']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            items = self.instance.list_items
            if isinstance(items, list):
                self.initial['list_items_text'] = "\n".join(items)

    def save(self, commit=True):
        instance = super().save(commit=False)
        list_items_text = self.cleaned_data.get('list_items_text', '')
        if list_items_text:
            instance.list_items = [line.strip() for line in list_items_text.split('\n') if line.strip()]
        else:
            instance.list_items = []
        if commit:
            instance.save()
        return instance

@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):
    form = IndustryForm
    list_display = ('title', 'type', 'is_active', 'is_image_left', 'created_at')
    list_filter = ('type', 'is_active', 'is_image_left')
    search_fields = ('title',)

@admin.register(IndustrySpecification)
class PageSpecificationAdmin(admin.ModelAdmin):
    list_display = ('is_industry',)
    list_filter = ('is_industry',)

class HomePageContentForm(forms.ModelForm):
    class Meta:
        model = HomePageContent
        fields = '__all__'

    def clean_selected_services(self):
        selected = self.cleaned_data.get('selected_services')
        if selected and selected.count() > 8:
            raise ValidationError("You can only select up to 8 services.")
        return selected

# class ServiceItemInline(admin.TabularInline):
#     model = ServiceItem
#     extra = 1
#     readonly_fields = ['preview']  # This makes the image preview read-only

#     def preview(self, obj):
#         if obj.image:
#             return format_html('<img src="{}" width="100" height="auto" style="object-fit: contain;" />', obj.image.url)
#         return "-"
#     preview.short_description = "Image Preview" 
 
class ClienteleItemInline(admin.TabularInline):
    model = ClienteleItem
    extra = 1  # Number of empty forms to display for quick addition
    # max_num = 6  # Maximum number of items that can be added
    readonly_fields = ['preview']

    def preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" width="100" />', obj.logo.url)
        return ""

class AssociationItemInline(admin.TabularInline):
    model = AssociationItem
    extra = 1  # Number of empty forms to display for quick addition
    # max_num = 6  # Maximum number of items that can be added
    readonly_fields = ['preview']

    def preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" width="100" />', obj.logo.url)
        return ""

class AffiliationItemInline(admin.TabularInline):
    model = AffiliationItem
    extra = 1  # Number of empty forms to display for quick addition
    # max_num = 6  # Maximum number of items that can be added
    readonly_fields = ['preview']

    def preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" width="100" />', obj.logo.url)
        return ""

class SeaPartnerItemInline(admin.TabularInline):
    model = SeaPartnerItem
    extra = 1  # Number of empty forms to display for quick addition
    # max_num = 6  # Maximum number of items that can be added
    readonly_fields = ['preview']

    def preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" width="100" />', obj.logo.url)
        return ""

class AirPartnerItemInline(admin.TabularInline):
    model = AirPartnerItem
    extra = 1  # Number of empty forms to display for quick addition
    # max_num = 6  # Maximum number of items that can be added
    readonly_fields = ['preview']

    def preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" width="100" />', obj.logo.url)
        return ""

class LocationInline(admin.TabularInline):
    model = Location
    extra = 1  # Number of empty forms to display for quick addition
    # max_num = 6  # Maximum number of items that can be added
    readonly_fields = ['preview']  # This makes the image preview read-only

    def preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="auto" style="object-fit: contain;" />', obj.image.url)
        return "-"
    preview.short_description = "Image Preview"


class AchievementInline(admin.TabularInline):
    model = Achievement
    extra = 1  # Number of empty forms to display for quick addition
    # max_num = 6  # Maximum number of items that can be added

    # def preview(self, obj):
    #     if obj.image:
    #         return format_html('<img src="{}" width="100" />', obj.image.url)
    #     return ""

# @admin.register(HomePageContent)
# class HomePageContentAdmin(admin.ModelAdmin):
#     list_display = ('id', 'created_at', 'updated_at')
#     search_fields = ('services_heading', 'journey_heading', 'clientele_heading')
#     inlines = [ServiceItemInline, ClienteleItemInline, AssociationItemInline, AffiliationItemInline, SeaPartnerItemInline, AirPartnerItemInline, LocationInline, AchievementInline]
#     readonly_fields = ('created_at', 'updated_at')

@admin.register(HomePageContent)
class HomePageContentAdmin(admin.ModelAdmin):
    form = HomePageContentForm
    list_display = ('id', 'created_at', 'updated_at')
    search_fields = ('services_heading', 'journey_heading', 'clientele_heading')
    inlines = [ClienteleItemInline, AssociationItemInline, AffiliationItemInline, SeaPartnerItemInline, AirPartnerItemInline, LocationInline, AchievementInline]
    readonly_fields = ('created_at', 'updated_at')



@admin.register(News)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag', 'date')
    search_fields = ('title', 'tag')
    readonly_fields = ('id',)


# About Page Admin Registration
class FAQInline(admin.TabularInline):
    model = FAQ
    extra = 1  # Displays one extra empty FAQ form for quick addition

# Registering the AboutPageContent model with customized admin display
# @admin.register(AboutPageContent)
# class AboutPageContentAdmin(admin.ModelAdmin):
#     # Fields to display in the list view of the admin panel for AboutPageContent
#     list_display = ("heading", "story_heading", "mission_heading", "vision_heading")
    
#     # Add the inline FAQs so they can be edited in the same form as AboutPageContent
#     inlines = [FAQInline]
    
#     # Make created_at and updated_at fields read-only (not editable in admin)
#     readonly_fields = ("created_at", "updated_at","mission_image_preview", "vision_image_preview", "values_image_preview", "founder_image_preview")
#     def mission_image_preview(self, obj):
#         if obj.mission_image:
#             return format_html('<img src="{}" width="150" />', obj.mission_image.url)
#         return "-"
#     mission_image_preview.short_description = "Mission Image"

#     def vision_image_preview(self, obj):
#         if obj.vision_image:
#             return format_html('<img src="{}" width="150" />', obj.vision_image.url)
#         return "-"
#     vision_image_preview.short_description = "Vision Image"

#     def values_image_preview(self, obj):
#         if obj.values_image:
#             return format_html('<img src="{}" width="150" />', obj.values_image.url)
#         return "-"
#     values_image_preview.short_description = "Values Image"

#     def founder_image_preview(self, obj):
#         if obj.founder_image:
#             return format_html('<img src="{}" width="150" />', obj.founder_image.url)
#         return "-"
#     founder_image_preview.short_description = "Founder Image"

@admin.register(AboutPageContent)
class AboutPageContentAdmin(admin.ModelAdmin):
    inlines = [FAQInline]
    readonly_fields = ("created_at", "updated_at", "mission_image_preview", "vision_image_preview", "values_image_preview", "founder_image_preview")

    fieldsets = (
        (None, {
            'fields': (
                'heading',
                'story_heading',
                'story_paragraph',
                'story_points',
                ('founder_image', 'founder_image_preview'),
                'para1',
                'para2',
                'mission_heading',
                'mission_paragraph',
                ('mission_image', 'mission_image_preview'),
                'vision_heading',
                'vision_paragraph',
                ('vision_image', 'vision_image_preview'),
                'values_heading',
                ('values_image', 'values_image_preview'),
                'values_points',
                'key_strengths_heading',
                'key_strengths_points',
                'faq_heading',
                'faq_paragraph',
                'team_heading',
                'is_active',
                'is_mission',
                'is_vision',
                'is_values',
                'is_story',
                'is_faq',
                ('created_at', 'updated_at'),
            )
        }),
    )

    def mission_image_preview(self, obj):
        if obj.mission_image:
            return format_html('<img src="{}" width="150" />', obj.mission_image.url)
        return "-"
    mission_image_preview.short_description = "Preview"

    def vision_image_preview(self, obj):
        if obj.vision_image:
            return format_html('<img src="{}" width="150" />', obj.vision_image.url)
        return "-"
    vision_image_preview.short_description = "Preview"

    def values_image_preview(self, obj):
        if obj.values_image:
            return format_html('<img src="{}" width="150" />', obj.values_image.url)
        return "-"
    values_image_preview.short_description = "Preview"

    def founder_image_preview(self, obj):
        if obj.founder_image:
            return format_html('<img src="{}" width="150" />', obj.founder_image.url)
        return "-"
    founder_image_preview.short_description = "Preview"

# Registering the FAQ model separately, though it’s already manageable inline
@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    # Fields to show in the list view of FAQs in the admin panel
    list_display = ("title", "description")  
    # Enables a search box that filters FAQs by title
    search_fields = ("title",)

class JobForm(forms.ModelForm):
    key_points_text = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 5, 'placeholder': 'Enter each pointer / key point on a new line'}),
        required=False,
        label="Key Points / Pointers (one per line)",
        help_text="Enter key points or responsibilities for this job profile, one on each line."
    )

    class Meta:
        model = Job
        fields = ['title', 'location', 'type', 'description', 'key_points_text', 'apply_link', 'is_active']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            points = self.instance.key_points
            if isinstance(points, list):
                self.initial['key_points_text'] = "\n".join(points)

    def save(self, commit=True):
        instance = super().save(commit=False)
        key_points_text = self.cleaned_data.get('key_points_text', '')
        if key_points_text:
            instance.key_points = [line.strip() for line in key_points_text.split('\n') if line.strip()]
        else:
            instance.key_points = []
        if commit:
            instance.save()
        return instance

# Registering the Job model for the Career page
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    form = JobForm
    list_display = ("title", "location", "type", "created_at")
    search_fields = ("title", "location", "type")
    list_filter = ("type", "location")

from import_export import resources
from import_export.fields import Field

class JobApplicationResource(resources.ModelResource):
    cv = Field(attribute='cv', column_name='cv')
    
    class Meta:
        model = JobApplication
        
    def dehydrate_cv(self, obj):
        if obj.cv:
            return f"https://api.jdmgroups.com{obj.cv.url}"
        return ""

@admin.register(JobApplication)
class JobApplicationAdmin(ExportActionMixin, admin.ModelAdmin):
    show_change_form_export = False
    resource_class = JobApplicationResource
    list_display = ('name', 'email', 'get_job_profile', 'phone', 'city', 'created_at', 'delete_query_button')
    search_fields = ('name', 'email', 'job__title', 'city', 'state', 'department')
    list_filter = (('created_at', DateRangeFilter), 'job')
    actions = ['delete_selected_queries']

    def get_job_profile(self, obj):
        return obj.job.title if obj.job else "General"
    get_job_profile.short_description = "Job Profile"

    def delete_query_button(self, obj):
        delete_url = reverse('admin:core_jobapplication_delete', args=[obj.pk])
        return format_html(
            '<a class="button" style="background-color: #ba2121; color: #fff; padding: 4px 10px; border-radius: 4px; font-weight: 600; text-decoration: none;" href="{}">Delete Query</a>',
            delete_url
        )
    delete_query_button.short_description = "Delete Option"

    @admin.action(description="Delete selected Job Queries")
    def delete_selected_queries(self, request, queryset):
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f"Successfully deleted {count} job query/queries.")

    def has_delete_permission(self, request, obj=None):
        return True

# Registering The ServiceItem model
class BenefitInline(admin.TabularInline):
    model = ServiceBenefit
    extra = 1

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    inlines = [BenefitInline]
    list_display = ('title',)

admin.site.register(ValueAddedService)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "position", "is_active", "preview_image")
    list_editable = ("position",)
    list_filter = ("is_active",)
    readonly_fields = ("preview_image",)

    def preview_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" />', obj.image.url)
        return "-"
    preview_image.short_description = "Image"

class GalleryPhotoInline(admin.TabularInline):
    model = GalleryPhoto
    extra = 1
    readonly_fields = ("preview_image",)

    def preview_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" />', obj.image.url)
        return "-"
    preview_image.short_description = "Image"

@admin.register(GalleryEvent)
class GalleryEventAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active")
    inlines = [GalleryPhotoInline]
    

# Contact Page
@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ("title", "email", "phone")
    search_fields = ("title", "email", "phone", "address")

class ContactQueryResource(resources.ModelResource):
    class Meta:
        model = ContactQuery
        fields = ('id', 'first_name', 'last_name', 'email', 'phone', 'message', 'created_at')
        export_order = ('first_name', 'last_name', 'email', 'phone', 'message', 'created_at')

@admin.register(ContactQuery)
class ContactQueryAdmin(ExportActionMixin, admin.ModelAdmin):
    resource_class = ContactQueryResource
    list_display = ('first_name', 'last_name', 'email', 'phone', 'created_at', 'delete_query_button')
    search_fields = ('first_name', 'last_name', 'email', 'phone')
    list_filter = (('created_at', DateRangeFilter),)
    ordering = ('-created_at',)
    readonly_fields = ('first_name', 'last_name', 'email', 'phone', 'message', 'created_at')
    actions = ['delete_selected_queries']

    def delete_query_button(self, obj):
        delete_url = reverse('admin:core_contactquery_delete', args=[obj.pk])
        return format_html(
            '<a class="button" style="background-color: #ba2121; color: #fff; padding: 4px 10px; border-radius: 4px; font-weight: 600; text-decoration: none;" href="{}">Delete Query</a>',
            delete_url
        )
    delete_query_button.short_description = "Delete Option"

    @admin.action(description="Delete selected Contact Queries")
    def delete_selected_queries(self, request, queryset):
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f"Successfully deleted {count} contact query/queries.")

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return True

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'rating', 'is_active', 'created_at')
    search_fields = ('name', 'position')
    list_filter = ('is_active', 'rating')

@admin.register(Network)
class NetworkAdmin(admin.ModelAdmin):
    list_display = ('region', 'headquarters', 'is_active', 'position')
    list_editable = ('position', 'is_active')
    search_fields = ('region', 'headquarters')
    list_filter = ('is_active',)


@admin.register(SocialMediaLink)
class SocialMediaLinkAdmin(admin.ModelAdmin):
    list_display = ('facebook_url', 'twitter_url', 'instagram_url', 'linkedin_url')

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(QuickLink)
class QuickLinkAdmin(admin.ModelAdmin):
    list_display = ("title", "url", "position", "is_active", "open_in_new_tab")
    list_editable = ("position", "is_active", "open_in_new_tab")
    search_fields = ("title", "url")
    list_filter = ("is_active",)
    ordering = ("position", "id")



@admin.register(MobileOffcanvas)
class MobileOffcanvasAdmin(admin.ModelAdmin):
    list_display = ('title', 'phone', 'email', 'working_hours', 'button_text', 'is_active', 'updated_at')
    search_fields = ('title', 'address', 'email', 'phone')
    readonly_fields = ('created_at', 'updated_at', 'logo_preview')
    fieldsets = (
        ("Header & Brand", {
            "fields": (("logo", "logo_preview"), "description")
        }),
        ("Contact Information (Mobile Drawer)", {
            "fields": ("title", "address", "address_url", "email", "working_hours", ("phone", "phone_href"))
        }),
        ("Call to Action Button", {
            "fields": (("button_text", "button_url"),)
        }),
        ("Status & Timestamps", {
            "fields": ("is_active", ("created_at", "updated_at"))
        }),
    )

    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" width="120" style="object-fit: contain; max-height: 60px;" />', obj.logo.url)
        return "Default site logo will be used"
    logo_preview.short_description = "Current Logo Preview"

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)
