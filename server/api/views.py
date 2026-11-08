from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from .serializers import Serializer
from .llm import call_llm

# Create your views here.
def hello(request):
    return HttpResponse("Hello Django!")

@api_view(["POST"])    
def chat(request):
    serializer = Serializer(data=request.data)
    if serializer.is_valid():
        prompt_text = serializer.validated_data.get("prompt")
        response = call_llm(prompt_text)
        return Response(
          {
            "analyzed_report": response
          },
          status =status.HTTP_200_OK
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    