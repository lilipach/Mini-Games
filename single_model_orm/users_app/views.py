from django.shortcuts import redirect, render, HttpResponse
from .models import Users

# Create your views here.
def index(request):
    return redirect("/home")


def home(request):
    context = {
        "users": Users.objects.all(),
    }
    return render(request, "index.html", context)


def submitForm(request):
    createUser(request.POST["firstName"], request.POST["lastName"], request.POST["email"], request.POST["age"])
    return redirect("/home")

def createUser(first, last, email, age):
    Users.objects.create(first_name= first, last_name = last, email_address = email, age = age)
    return