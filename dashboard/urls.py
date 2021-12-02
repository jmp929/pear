from django.urls import path
from .views import DataPairSurveyView, UserDataSetsView, UserDataPairView, UserDataSetView, manage_dataset_users, get_dataset_users

urlpatterns = [
    path('getValue/<slug:key>/<slug:dataset>/', DataPairSurveyView.as_view(), name="get_value"),
    path('userSets/', UserDataSetsView.as_view(), name="user_sets"),
    path('userSet/<slug:dataset_name>/', UserDataSetView.as_view(), name="user_set"),
    path('userPair/<slug:key>/<slug:value>/<slug:dataset_name>', UserDataPairView.as_view(), name="user_pairs"),
    path('userSet/manageUsers/<slug:email>/<slug:dataset_name>/<slug:permission>/', manage_dataset_users, name="managed_dataset_users"),
    path('userSet/getUsers/<slug:dataset_name>/', get_dataset_users, name="get_dataset_users")
    
    

]

