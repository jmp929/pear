from django.urls import path
from .views import DataPairSurveyView, UserDataSetsView, UserDataDataPairView

urlpatterns = [
    path('getValue/<slug:key>/<slug:dataset>/', DataPairSurveyView.as_view(), name="get_value"),
    path('userSets/', UserDataSetsView.as_view(), name="user_sets"),
    path('userPair/<slug:key>/<slug:value>/<slug:dataset_name>', UserDataDataPairView.as_view(), name="user_pairs"),
    

]

