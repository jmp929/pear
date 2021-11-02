from django.urls import path
from .views import DataPairSurveyView, UserDataSetsView, UserDataPairView, UserDataSetView

urlpatterns = [
    path('getValue/<slug:key>/<slug:dataset>/', DataPairSurveyView.as_view(), name="get_value"),
    path('userSets/', UserDataSetsView.as_view(), name="user_sets"),
    path('userSet/<slug:dataset_name>/', UserDataSetView.as_view(), name="user_set"),
    path('userPair/<slug:key>/<slug:value>/<slug:dataset_name>', UserDataPairView.as_view(), name="user_pairs"),
    

]

