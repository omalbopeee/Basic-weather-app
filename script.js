const weeklyWeather = [
    {day: 'Monday', temperature: 25, condition: 'Sunny', humidity:84},
    { day: 'Tuesday', temperature: 27, condition: 'Cloudy', humidity: 78 },
    { day: 'Wednesday', temperature: 24, condition: 'Rainy', humidity: 90 },
    { day: 'Thursday', temperature: 26, condition: 'Partly Cloudy', humidity: 80 },
    { day: 'Friday', temperature: 28, condition: 'Sunny', humidity: 70 },
    { day: 'Saturday', temperature: 23, condition: 'Stormy', humidity: 88 },
    { day: 'Sunday', temperature: 29, condition: 'Sunny', humidity: 65 },
];

const weatherCards = weeklyWeather.map(({day, temperature, condition, humidity}) => {
    return`<div style="border: 1px solid; padding: 10px; margin: 5px; display: inline-block">
           <strong>${day}</strong><br>
           Temperature: ${temperature}<br>
           Condition: ${condition}<br>
           humidity: ${humidity}<br>
    </div>`
})

const temp = weeklyWeather.map(({temperature}) => {
    return temperature
})

const maxTemperature = Math.max(...temp)
const minTemperature = Math.min(...temp)
const summary = `Max Temperature: ${maxTemperature}<br>Min Temperature: ${minTemperature}`

const partyCloudy = weeklyWeather.filter(({condition}) => {
    return condition.includes('Partly Cloudy')
}).map(({day,temperature}) => {
    console.log(day,temperature)
})

document.getElementById('weatherContainer').innerHTML = weatherCards.join('');
document.getElementById('temperatureSummary').innerHTML = summary;

