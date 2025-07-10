from flask import Flask, render_template, request
import requests

app = Flask(__name__)

API_KEY = 'f78d1f86dae1482fa74112128250807'

def get_weather_emoji(condition):
    condition = condition.lower()
    if 'sunny' in condition: return '☀️'
    elif 'cloud' in condition: return '☁️'
    elif 'rain' in condition: return '🌧️'
    elif 'thunder' in condition: return '⛈️'
    elif 'snow' in condition: return '❄️'
    elif 'fog' in condition or 'mist' in condition: return '🌫️'
    else: return '🌤️'

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        location = request.form['location']
        url = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={location}&aqi=no"

        try:
            response = requests.get(url)
            data = response.json()

            city = f"{data['location']['name']}, {data['location']['country']}"
            temp = f"{data['current']['temp_c']}°C"
            condition = data['current']['condition']['text']
            emoji = get_weather_emoji(condition)

            return render_template('result.html', city=city, temp=temp, condition=condition, emoji=emoji)
        except Exception as e:
            return render_template('result.html', error="Could not fetch weather. Try again.")
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
