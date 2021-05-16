from django.db import models

# Create your models here.
class dojos(models.Model):
    name = models.CharField(max_length=45)
    city = models.CharField(max_length=45)
    state = models.CharField(max_length=45)
    desc = models.TextField(default="this is a dojo")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s" % (self.name, self.city, self.state)

class ninjas(models.Model):
    dojos = models.ForeignKey(dojos, related_name="ninjas", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Dojo %s: %s %s" % (self.dojo_id, self.first_name, self.last_name)

    def fullName(self):
        return "%s %s" % (self.first_name, self.last_name)