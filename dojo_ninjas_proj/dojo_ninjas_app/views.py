from django.db.models.expressions import F
from django.shortcuts import render, redirect, HttpResponse
from .models import  ninjas, dojos

# Create your views here.
def index(request):
    context = {
        "dojos": dojos.objects.all(),
    }

    return render(request, "index.html", context)

def submitNinja(request):
    ninjas.objects.create(
        first_name=request.POST['firstName'],
        last_name=request.POST['lastName'],
        dojos_id=request.POST['dojoSelection'],
    ) 
    return redirect("/")

def submitDojo(request):
    dojos.objects.create(
        name=request.POST['dojoName'],
        city=request.POST['city'],
        state=request.POST['state'],
    )
    return redirect("/")
