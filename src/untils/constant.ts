import iconRain from '../assets/icons8-rain.gif';
import iconSnowfall from '../assets/icons8-light-snow.gif';
import iconSun from '../assets/icons8-sun.gif';
import iconFrog from '../assets/icons8-fog.gif';
import iconSnow from '../assets/icons8-snow-50.png';
import iconWet from '../assets/icons8-wet-50.png';

export enum dayOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
  }


  export const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  export enum WeatherStatus {
    Rain = 'rain',
    Wet = 'wet',
    Clean = 'clean',
    Snowfall = 'snowfall',
    Snow = 'snow',
    Fog = 'fog',
  }
  
  
  export const wetherIcon = {
    [-1]: '',
    [WeatherStatus.Rain]: iconRain,
    [WeatherStatus.Wet]: iconWet,
    [WeatherStatus.Clean]: iconSun,
    [WeatherStatus.Snowfall]: iconSnowfall,
    [WeatherStatus.Snow]: iconSnow,
    [WeatherStatus.Fog]: iconFrog,
  };