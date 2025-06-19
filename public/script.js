// Weather Animation Controller
class WeatherAnimations {
  constructor() {
    this.animationContainer = null;
    this.currentWeather = 'default';
    this.init();
  }

  init() {
    // Create animation container
    this.createAnimationContainer();
    
    // Set default weather
    this.setWeatherBackground('default');
    
    // Check if weather data exists and set appropriate animation
    this.checkWeatherData();
  }

  createAnimationContainer() {
    // Remove existing animation container if it exists
    const existing = document.querySelector('.weather-animation');
    if (existing) {
      existing.remove();
    }

    // Create new animation container
    this.animationContainer = document.createElement('div');
    this.animationContainer.className = 'weather-animation';
    document.body.insertBefore(this.animationContainer, document.body.firstChild);
  }

  setWeatherBackground(weatherType) {
    // Remove all weather classes
    const weatherClasses = [
      'weather-clear', 'weather-cloudy', 'weather-rainy', 
      'weather-stormy', 'weather-snowy', 'weather-foggy', 'weather-default'
    ];
    
    weatherClasses.forEach(cls => document.body.classList.remove(cls));
    
    // Add new weather class
    document.body.classList.add(`weather-${weatherType}`);
    this.currentWeather = weatherType;
    
    // Clear existing animations
    this.animationContainer.innerHTML = '';
    
    // Add appropriate animations
    this.addWeatherAnimations(weatherType);
  }

  addWeatherAnimations(weatherType) {
    switch(weatherType) {
      case 'clear':
      case 'sunny':
        this.createSunAnimation();
        this.createLightClouds();
        break;
      
      case 'cloudy':
      case 'overcast':
        this.createCloudyAnimation();
        break;
      
      case 'rainy':
      case 'rain':
        this.createRainAnimation();
        this.createStormClouds();
        break;
      
      case 'stormy':
      case 'thunderstorm':
        this.createStormAnimation();
        this.createLightningAnimation();
        break;
      
      case 'snowy':
      case 'snow':
        this.createSnowAnimation();
        this.createStormClouds();
        break;
      
      case 'foggy':
      case 'mist':
      case 'haze':
        this.createFogAnimation();
        break;
      
      default:
        this.createDefaultAnimation();
        break;
    }
  }

  createSunAnimation() {
    const sun = document.createElement('div');
    sun.className = 'sun';
    this.animationContainer.appendChild(sun);
  }

  createLightClouds() {
    const clouds = document.createElement('div');
    clouds.className = 'clouds';
    
    // Create 2-3 light clouds
    for (let i = 1; i <= 2; i++) {
      const cloud = document.createElement('div');
      cloud.className = `cloud cloud${i}`;
      cloud.style.opacity = '0.4';
      clouds.appendChild(cloud);
    }
    
    this.animationContainer.appendChild(clouds);
  }

  createCloudyAnimation() {
    const clouds = document.createElement('div');
    clouds.className = 'clouds';
    
    // Create multiple clouds
    for (let i = 1; i <= 3; i++) {
      const cloud = document.createElement('div');
      cloud.className = `cloud cloud${i}`;
      cloud.style.opacity = '0.8';
      clouds.appendChild(cloud);
    }
    
    this.animationContainer.appendChild(clouds);
  }

  createRainAnimation() {
    const rain = document.createElement('div');
    rain.className = 'rain';
    
    // Create multiple raindrops
    for (let i = 0; i < 50; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      rain.appendChild(drop);
    }
    
    this.animationContainer.appendChild(rain);
  }

  createStormClouds() {
    const clouds = document.createElement('div');
    clouds.className = 'clouds';
    
    // Create dark storm clouds
    for (let i = 1; i <= 3; i++) {
      const cloud = document.createElement('div');
      cloud.className = `cloud cloud${i}`;
      cloud.style.background = 'rgba(100, 100, 100, 0.8)';
      cloud.style.opacity = '0.9';
      clouds.appendChild(cloud);
    }
    
    this.animationContainer.appendChild(clouds);
  }

  createStormAnimation() {
    this.createRainAnimation();
    this.createStormClouds();
  }

  createLightningAnimation() {
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    this.animationContainer.appendChild(lightning);
  }

  createSnowAnimation() {
    const snow = document.createElement('div');
    snow.className = 'snow';
    
    // Create snowflakes
    const snowflakes = ['❄', '❅', '❆'];
    for (let i = 0; i < 30; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
      flake.style.left = Math.random() * 100 + '%';
      flake.style.animationDuration = (Math.random() * 3 + 2) + 's';
      flake.style.animationDelay = Math.random() * 2 + 's';
      flake.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
      snow.appendChild(flake);
    }
    
    this.animationContainer.appendChild(snow);
  }

  createFogAnimation() {
    const clouds = document.createElement('div');
    clouds.className = 'clouds';
    
    // Create fog-like clouds
    for (let i = 1; i <= 4; i++) {
      const cloud = document.createElement('div');
      cloud.className = `cloud cloud${i % 3 + 1}`;
      cloud.style.background = 'rgba(200, 200, 200, 0.6)';
      cloud.style.opacity = '0.7';
      cloud.style.top = (Math.random() * 60 + 20) + '%';
      clouds.appendChild(cloud);
    }
    
    this.animationContainer.appendChild(clouds);
  }

  createDefaultAnimation() {
    this.createLightClouds();
  }

  checkWeatherData() {
    // Check if weather info exists on page
    const weatherInfo = document.querySelector('.weather-info');
    if (weatherInfo) {
      const description = weatherInfo.querySelector('p:nth-child(3)');
      if (description) {
        const weatherText = description.textContent.toLowerCase();
        const weatherType = this.determineWeatherType(weatherText);
        this.setWeatherBackground(weatherType);
      }
    }
  }

  determineWeatherType(description) {
    if (description.includes('clear') || description.includes('sunny')) {
      return 'clear';
    } else if (description.includes('cloud')) {
      return 'cloudy';
    } else if (description.includes('rain') || description.includes('drizzle')) {
      return 'rainy';
    } else if (description.includes('storm') || description.includes('thunder')) {
      return 'stormy';
    } else if (description.includes('snow') || description.includes('blizzard')) {
      return 'snowy';
    } else if (description.includes('fog') || description.includes('mist') || description.includes('haze')) {
      return 'foggy';
    } else {
      return 'default';
    }
  }

  // Method to manually update weather (can be called from server-side)
  updateWeather(weatherDescription) {
    const weatherType = this.determineWeatherType(weatherDescription.toLowerCase());
    this.setWeatherBackground(weatherType);
  }
}

// Initialize weather animations when page loads
document.addEventListener('DOMContentLoaded', function() {
  window.weatherAnimations = new WeatherAnimations();
});

// If weather data is already present, update animations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      if (window.weatherAnimations) {
        window.weatherAnimations.checkWeatherData();
      }
    }, 100);
  });
} else {
  setTimeout(() => {
    if (window.weatherAnimations) {
      window.weatherAnimations.checkWeatherData();
    }
  }, 100);
}