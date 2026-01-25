import { ref, onMounted } from "vue";

type WeatherData = {
  temperature: number;
  windspeed: number;
  time: string;
};

const CACHE_KEY = "footer-weather";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export function useWeather() {
  const weather = ref<WeatherData | null>(null);
  const loading = ref(false);

  const fetchWeather = async () => {
    loading.value = true;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          weather.value = parsed.data;
          loading.value = false;
          return;
        }
      }

      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-1.2921&longitude=36.8219&current_weather=true",
      );
      const data = await res.json();

      const formatted: WeatherData = {
        temperature: Math.round(data.current_weather.temperature),
        windspeed: Math.round(data.current_weather.windspeed),
        time: data.current_weather.time,
      };

      weather.value = formatted;

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          data: formatted,
        }),
      );
    } catch (e) {
      console.error(e);
      console.warn("Weather fetch failed");
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchWeather);

  return { weather, loading };
}
