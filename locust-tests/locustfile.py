from locust import HttpUser, task, between
import random
import string

BASE_URL = "/api"


class UserLifecycle(HttpUser):
    host = "https://automationexercise.com"
    wait_time = between(1, 2)

    # ✅ Generate test user (same idea as createTestUser)
    def generate_user(self):
        rand = ''.join(random.choices(string.ascii_lowercase, k=5))
        return {
            "name": "TestUser",
            "email": f"user_{rand}@test.com",
            "password": "Test123!",
            "title": "Mr",
            "birth_date": "10",
            "birth_month": "5",
            "birth_year": "1995",
            "firstname": "Test",
            "lastname": "User",
            "company": "QA Inc",
            "address1": "123 Street",
            "address2": "Apt 1",
            "country": "United States",
            "state": "NY",
            "city": "Brooklyn",
            "zipcode": "11201",
            "mobile_number": "1234567890"
        }

    # ✅ Run once per virtual user
    def on_start(self):
        self.user = self.generate_user()

        # 1️⃣ CREATE USER
        with self.client.post(
            f"{BASE_URL}/createAccount",
            data=self.user,
            catch_response=True
        ) as response:
            body = response.json()
            if body.get("responseCode") != 201:
                response.failure("Create user failed")
            else:
                response.success()

        self.email = self.user["email"]
        self.password = self.user["password"]

    # ✅ Main lifecycle loop
    @task(3)
    def get_user(self):
        with self.client.get(
            f"{BASE_URL}/getUserDetailByEmail",
            params={"email": self.email},
            catch_response=True
        ) as response:
            body = response.json()
            if body.get("responseCode") != 200:
                response.failure("Get user failed")

    @task(2)
    def update_user(self):
        with self.client.put(
            f"{BASE_URL}/updateAccount",
            data={
                "email": self.email,
                "password": self.password,
                "city": "New York"
            },
            catch_response=True
        ) as response:
            body = response.json()
            if body.get("responseCode") != 200:
                response.failure("Update failed")

    # ✅ Cleanup
    def on_stop(self):
        with self.client.delete(
            f"{BASE_URL}/deleteAccount",
            data={
                "email": self.email,
                "password": self.password
            },
            catch_response=True
        ) as response:
            body = response.json()
            if body.get("responseCode") != 200:
                response.failure("Delete failed")
