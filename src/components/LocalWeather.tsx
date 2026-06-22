import { useEffect, useState } from "react";
import { Cloud, CloudRain, CloudLightning, Sun, SunDim, Wind, Droplets, RefreshCw, Compass, ExternalLink } from "lucide-react";
import { WeatherData } from "../types";
import { motion } from "motion/react";

export default function LocalWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<'danang' | 'hoian'>('danang');

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/weather");
      if (!response.ok) {
        throw new Error("Không thể kết nối đến máy chủ thời tiết");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      console.error("Lỗi tải thông tin thời tiết:", err);
      setError("Không thể cập nhật thời tiết thời gian thực. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    const text = (condition || "").toLowerCase();
    if (text.includes("nắng") || text.includes("clear") || text.includes("sunny") || text.includes("ít mây")) {
      return <Sun className="h-10 w-10 text-amber-400 animate-pulse" />;
    }
    if (text.includes("mưa") || text.includes("rain") || text.includes("rào") || text.includes("ẩm")) {
      return <CloudRain className="h-10 w-10 text-sky-400" />;
    }
    if (text.includes("sét") || text.includes("giông") || text.includes("bão") || text.includes("storm")) {
      return <CloudLightning className="h-10 w-10 text-yellow-500 animate-bounce" />;
    }
    return <Cloud className="h-10 w-10 text-slate-350" />;
  };

  const currentCityData = weather ? weather[activeCity] : null;

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-4 sm:p-5 relative overflow-hidden" id="weather-section">
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
            <Compass className="h-4 w-4 animate-spin" style={{ animationDuration: "12s" }} />
          </span>
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Thời tiết địa phương</h4>
            <p className="text-[10px] text-slate-400">Hỗ trợ lên kế hoạch di chuyển</p>
          </div>
        </div>
        
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="p-1 px-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[11px] text-slate-400 hover:text-white transition flex items-center space-x-1 disabled:opacity-50"
          title="Tải lại dữ liệu thời tiết thực tế"
        >
          <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin text-amber-500' : ''}`} />
          <span>{loading ? 'Đang cập nhật...' : 'Cập nhật'}</span>
        </button>
      </div>

      {loading ? (
        /* Loading Skeleton */
        <div className="space-y-4 py-2 animate-pulse">
          <div className="flex space-x-2">
            <div className="h-8 bg-slate-800 rounded-lg w-28" />
            <div className="h-8 bg-slate-800 rounded-lg w-28" />
          </div>
          <div className="flex items-center justify-between bg-slate-950/40 p-4 rounded-xl border border-slate-800">
            <div className="space-y-2">
              <div className="h-7 bg-slate-800 rounded w-16" />
              <div className="h-4 bg-slate-800 rounded w-28" />
            </div>
            <div className="h-10 bg-slate-800 rounded-full w-10" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 bg-slate-800 rounded-lg" />
            <div className="h-10 bg-slate-800 rounded-lg" />
          </div>
        </div>
      ) : error ? (
        /* Error Screen */
        <div className="text-center py-4 space-y-2">
          <p className="text-xs text-rose-400 font-medium">{error}</p>
          <button
            onClick={fetchWeather}
            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs rounded-lg border border-amber-500/25 transition font-semibold"
          >
            Thử lại ngay
          </button>
        </div>
      ) : weather && currentCityData ? (
        /* Weather content */
        <div className="space-y-4">
          {/* City Selection Tabs */}
          <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-850">
            <button
              onClick={() => setActiveCity('danang')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${activeCity === 'danang' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Đà Nẵng
            </button>
            <button
              onClick={() => setActiveCity('hoian')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${activeCity === 'hoian' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Hội An
            </button>
          </div>

          {/* Core Temperature Row */}
          <motion.div
            key={activeCity}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-slate-950/40 p-3 sm:p-4 rounded-xl border border-slate-800/80"
          >
            <div>
              <div className="text-3xl font-black text-white flex items-baseline">
                <span>{currentCityData.temp}</span>
                <span className="text-amber-500 text-xl ml-0.5">°C</span>
              </div>
              <span className="text-xs font-semibold text-amber-500 block mt-1">{currentCityData.condition}</span>
            </div>
            <div>
              {getWeatherIcon(currentCityData.condition)}
            </div>
          </motion.div>

          {/* Secondary specs */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-2 sm:p-2.5 bg-slate-950/20 rounded-xl border border-slate-800/40">
              <div className="flex items-center space-x-1 mb-1">
                <Droplets className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Độ ẩm</span>
              </div>
              <span className="text-xs font-extrabold text-slate-200">{currentCityData.humidity || "75%"}</span>
            </div>
            <div className="p-2 sm:p-2.5 bg-slate-950/20 rounded-xl border border-slate-800/40">
              <div className="flex items-center space-x-1 mb-1">
                <Wind className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Sức gió</span>
              </div>
              <span className="text-xs font-extrabold text-slate-200">{currentCityData.windSpeed || "12 km/h"}</span>
            </div>
          </div>

          {/* Tomorrow's brief forecast info banner */}
          <div className="p-2.5 bg-amber-500/5 rounded-xl border border-amber-500/10 text-left">
            <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block mb-0.5">Dự báo ngày mai</span>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">{currentCityData.forecast}</p>
          </div>

          {/* Live Data Grounding Meta-Footnote */}
          <div className="flex flex-col space-y-1 pt-1 text-[9px] text-left text-slate-500 border-t border-slate-850">
            <div className="flex items-center justify-between">
              <span>Cập nhật: {weather.lastUpdated}</span>
              <span className="italic block max-w-[140px] truncate" title={weather.sources?.join(', ')}>
                Nguồn: {weather.sources?.[0] || 'Google Search'}
              </span>
            </div>
            {weather.isFallback && (
              <span className="text-amber-500/75 block font-medium">* Hiện đang sử dụng dữ liệu dự phòng cục bộ</span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
