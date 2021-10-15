from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from dashboard.models import Dataset
 

class MultipleFieldLookupMixin(APIView):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """
    
    def get_object(self):
        try:
            print(self.__class__.__name__)

            queryset = self.get_queryset()             # type: ignore
            queryset = self.filter_queryset(queryset)  # type: ignore
            filter = {}
            for field in self.lookup_fields:           # type: ignore
                if self.kwargs.get(field, None): 
                    if self.__class__.__name__ == "DataPairSurveyView" and field == 'dataset':
                       filter[field] = Dataset.objects.get(name=self.kwargs[field])
                    else:
                        filter[field] = self.kwargs[field]
            obj = get_object_or_404(queryset, **filter)  # Lookup the object
            self.check_object_permissions(self.request, obj)
            return obj
        except Exception as e:
            print(self.lookup_fields)   # type: ignore
            print(self.kwargs)
            raise


class GetRelatedMixin:

    def get_related(self, queryset):

        if hasattr(self, "select_related_fields"):
            queryset = queryset.select_related(*self.select_related_fields)  # type: ignore
        if hasattr(self, "prefetch_related_fields"):
            queryset = queryset.prefetch_related(*self.prefetch_related_fields)  # type: ignore
        return queryset