from django.urls import path
from .views import DataPairSurveyView, UserDataSetsView

urlpatterns = [
    path('getvalue/<slug:key>/<slug:dataset>/', DataPairSurveyView.as_view(), name="get_value"),
    path('getUserSets/', UserDataSetsView.as_view(), name="get_user_sets")

]

