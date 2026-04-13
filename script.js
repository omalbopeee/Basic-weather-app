const weeklyWeather = [
    { day: 'Monday',    temperature: 25, condition: 'Sunny',         humidity: 84 },
    { day: 'Tuesday',   temperature: 27, condition: 'Cloudy',        humidity: 78 },
    { day: 'Wednesday', temperature: 24, condition: 'Rainy',         humidity: 90 },
    { day: 'Thursday',  temperature: 26, condition: 'Partly Cloudy', humidity: 80 },
    { day: 'Friday',    temperature: 28, condition: 'Sunny',         humidity: 70 },
    { day: 'Saturday',  temperature: 23, condition: 'Stormy',        humidity: 88 },
    { day: 'Sunday',    temperature: 29, condition: 'Sunny',         humidity: 65 },
];

const icons = {
    'Sunny':         '☀️',
    'Cloudy':        '☁️',
    'Rainy':         '🌧️',
    'Partly Cloudy': '⛅',
    'Stormy':        '⛈️',
};

const barColors = {
    'Sunny':         '#f5c842',
    'Cloudy':        '#8892a4',
    'Rainy':         '#4ab8f5',
    'Partly Cloudy': '#68d9b3',
    'Stormy':        '#b07ef5',
};
const humidityColor = (h) => {
    if (h >= 88) return '#b07ef5';
    if (h >= 80) return '#4ab8f5';
    return '#68d9b3';
};

const temps = weeklyWeather.map(({temperature}) => {
    return temperature
})
const maxTemp = Math.max(...temps);
const minTemp = Math.min(...temps);
const avgTemp = Math.round(temps.reduce((a,b) => a + b, 0) / temps.length);
const tempRange = maxTemp - minTemp || 1;

const todayIndex = 0;

function renderMetrics() {
    const metrics = [
        { label: 'Highest',  value: maxTemp, unit: '°C', color: '#f5c842' },
        { label: 'Average',  value: avgTemp, unit: '°C', color: '#68d9b3' },
        { label: 'Lowest',   value: minTemp, unit: '°C', color: '#4ab8f5' },
        { label: 'Days sunny',
            value: weeklyWeather.filter(d => d.condition === 'Sunny').length,
            unit: ' days', color: '#f5c842' },
    ];

    const container = document.getElementById('metricsRow');
    container.innerHTML = metrics.map(({ label, value, unit, color }) => `
    <div class="metric-card">
      <div class="metric-label">${label}</div>
      <div class="metric-value" style="color:${color}">${value}<span>${unit}</span></div>
    </div>
  `).join('');
}

function renderCards() {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = weeklyWeather.map(({ day, temperature, condition, humidity }, i) => {
        const isToday    = i === todayIndex;
        const icon       = icons[condition] || '🌤️';
        const color      = barColors[condition] || '#8892a4';
        const todayClass = isToday ? 'weather-card today' : 'weather-card';
        const dayLabel   = isToday
            ? `<span class="today-label">Today</span>`
            : day.slice(0, 3);

        return `
      <div class="${todayClass}" style="animation-delay:${i * 0.05}s">
        <div class="card-day">${dayLabel}</div>
        <div class="card-icon">${icon}</div>
        <div class="card-temp" style="color:${color}">${temperature}°</div>
        <div class="card-condition">${condition}</div>
        <div class="humidity-row">
          <div class="humidity-track">
            <div class="humidity-fill" style="width:${humidity}%"></div>
          </div>
          <div class="humidity-pct">${humidity}%</div>
        </div>
      </div>
    `;
    }).join('');
}

function renderChart() {
    const container = document.getElementById('chartBars');
    const maxBarHeight = 90; // px

    container.innerHTML = weeklyWeather.map(({ day, temperature, condition }) => {
        const barHeight = Math.round(
            ((temperature - minTemp) / tempRange) * (maxBarHeight - 20) + 20
        );
        const color = barColors[condition] || '#8892a4';

        return `
      <div class="bar-col">
        <div class="bar-temp-label">${temperature}°</div>
        <div class="bar-block" style="height:${barHeight}px; background:${color}"></div>
        <div class="bar-day-label">${day.slice(0, 2)}</div>
      </div>
    `;
    }).join('');
}

function renderPartly() {
    const container  = document.getElementById('partlyList');
    const partlyDays = weeklyWeather.filter(d => d.condition.includes('Partly Cloudy'));

    if (partlyDays.length === 0) {
        container.innerHTML = '<p class="empty-note">No partly cloudy days this week.</p>';
        return;
    }

    container.innerHTML = partlyDays.map(({ day, temperature }) => `
    <div class="partly-item">
      <div class="partly-day">⛅ <span>${day}</span></div>
      <div class="partly-temp">${temperature}°</div>
    </div>
  `).join('');
}

function renderHumidity() {
    const container = document.getElementById('humidityList');

    const sorted = [...weeklyWeather].sort((a, b) => b.humidity - a.humidity);

    container.innerHTML = sorted.map(({ day, humidity }) => {
        const color = humidityColor(humidity);
        return `
      <div class="hum-item">
        <div class="hum-day">${day.slice(0, 3)}</div>
        <div class="hum-track">
          <div class="hum-fill" style="width:${humidity}%; background:${color}"></div>
        </div>
        <div class="hum-pct">${humidity}%</div>
      </div>
    `;
    }).join('');
}

function init() {
    renderMetrics();
    renderCards();
    renderChart();
    renderPartly();
    renderHumidity();
}

init();