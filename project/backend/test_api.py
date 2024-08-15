import requests

url = 'http://127.0.0.1:5000/api/publications'
data = {
    "query": "cancer",
    "retstart": 0,
    "retmax": 10
}

response = requests.post(url, json=data)
print(response.json())
