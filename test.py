import requests

url = "http://localhost:9000/fetch"
response = requests.post(url, data={
    'url': "https://www.cfr.org/interactives/global-conflict-tracker#!/conflict/north-korea-crisis"
})

open("content.html", "w").write(response.text)
