from django.urls import path
from .views import DataPairSurveyView, UserDataSetsView, UserDataPairView, UserDataSetView, manage_dataset_users

urlpatterns = [
    path('getValue/<slug:key>/<slug:dataset>/', DataPairSurveyView.as_view(), name="get_value"),
    path('userSet/<slug:dataset_name>/', UserDataSetView.as_view(), name="user_set"),
    path('userSets/', UserDataSetsView.as_view(), name="user_sets"),
    path('userSet/<slug:dataset_name>/', UserDataSetView.as_view(), name="user_set"),
    path('userPair/<slug:key>/<slug:value>/<slug:dataset_name>', UserDataPairView.as_view(), name="user_pairs"),
    path('userSet/manageUsers/<slug:email>/<slug:dataset_name>/', manage_dataset_users, name="managed_dataset_users")
    
    

]

