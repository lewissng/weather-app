async function getWeatherData(location) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}`,
        {
            mode: 'cors',
        }
    );
    if (response.status === 400) {
        throwErrorMsg();
    } else {
        const weatherData = await response.json();
        const newData = processData(weatherData);
        displayData(newData);
        reset();
    }
}

function processData(weatherData) {
    // grab all the data i want to display on the page
    const myData = {
        condition: weatherData.current.condition.text,
        feelsLike: {
            f: Math.round(weatherData.current.feelslike_f),
            c: Math.round(weatherData.current.feelslike_c),
        },
        currentTemp: {
            f: Math.round(weatherData.current.temp_f),
            c: Math.round(weatherData.current.temp_c),
        },
        wind: Math.round(weatherData.current.wind_mph),
        humidity: weatherData.current.humidity,
        location: weatherData.location.name.toUpperCase(),
    };

    // if in the US, add state
    // if not, add country
    if (weatherData.location.country === 'United States of America') {
        myData['region'] = weatherData.location.region.toUpperCase();
    } else {
        myData['region'] = weatherData.location.country.toUpperCase();
    }

    return myData;
}