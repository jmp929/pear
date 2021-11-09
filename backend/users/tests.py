from django.http import response
from django.test import TestCase, client
from users.models import CustomUser
from users.forms import CustomUserCreationForm
from django.contrib.auth.models import User

# Create your tests here.


class TestUserCreation(TestCase):
    def setUp(self):
       self.test_data = {
            'email': "testuser@email.com",
            'username': "testuser",
            'password1': "password123!",
            'password2': "password123!"
        }
    
    def test_user_registration(self):
        response = self.client.post('/api/v1/users/auth/register/', data = self.test_data)
        self.assertEqual(response.status_code, 201)

    def test_user_login(self):
        self.client.post('/api/v1/users/auth/register/', data = self.test_data)
        response = self.client.post('/api/v1/users/auth/login/', data = {
            "email" : self.test_data['email'],
            "password"  : self.test_data['password1']
        })
        self.assertEqual(response.status_code, 200)

    def test_string_representation_customuser(self):
        user = CustomUser.objects.create(email = self.test_data['email'])
        expected_representation = self.test_data['email']
        self.assertEqual(expected_representation, str(user))

    def test_registration_form(self):
        form = CustomUserCreationForm(data = self.test_data)
        self.assertTrue(form.is_valid())
        expected_representation = self.test_data['email']
        user = form.save()
        self.assertEqual(expected_representation, str(user))

    def test_password_mismatch(self):
        test_data_mismatch = self.test_data
        test_data_mismatch['password2'] = "something_else"
        form = CustomUserCreationForm(data = test_data_mismatch)
        self.assertFalse(form.is_valid())
        self.assertEqual(form["password2"].errors, [form.error_messages['password_mismatch']])


