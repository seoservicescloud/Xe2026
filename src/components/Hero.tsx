import { FormEvent } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Shield, Award, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LocalWeather from './LocalWeather';

interface HeroProps {
  onQuickSearch: (routeId: string, vehicleType: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function Hero({ onQuickSearch, setActiveTab }: HeroProps) {
  const { t, routes, language } = useLanguage();

  const handleQuickSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const routeId = formData.get('route') as string;
    const vehicleType = formData.get('vehicle') as string;
    onQuickSearch(routeId, vehicleType);
  };

  return (
    <div className="relative bg-slate-900 overflow-hidden" id="hero-banner">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info Columns (7 columns) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 rounded-full text-amber-400 border border-amber-500/20 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{language === 'vi' ? 'Dịch vụ đón tiễn chuẩn 5 sao - Cam kết Đúng Giờ, Không Trễ Hẹn' : 'Gold Standard Airport Transfers - 100% On-Time, No Delays'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t.hero.titleFirst} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Core Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="flex items-center space-x-3 p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                <Clock className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{language === 'vi' ? '24/7 Sẵn Sàng' : '24/7 Standby'}</h4>
                  <p className="text-[10px] text-slate-400">{language === 'vi' ? 'Hỗ trợ hotline đêm khuya' : 'Late night support'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                <Shield className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{language === 'vi' ? 'Đón Tiễn An Toàn' : 'Fully Insured'}</h4>
                  <p className="text-[10px] text-slate-400">{language === 'vi' ? 'Bảo hiểm đầy đủ' : 'Passenger license coverage'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                <Award className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{language === 'vi' ? 'Giá Công Khai' : 'Flat Pricing'}</h4>
                  <p className="text-[10px] text-slate-400">{language === 'vi' ? 'Tiết kiệm đến 30%' : 'Save up to 30%'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                <Users className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{language === 'vi' ? 'Tài Bản Địa' : 'Local Drivers'}</h4>
                  <p className="text-[10px] text-slate-400">{language === 'vi' ? 'Thân thiện, rành đường' : 'Friendly, rich knowledge'}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setActiveTab('booking')}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl shadow-xl shadow-amber-500/25 transition-all duration-200 flex items-center space-x-3 text-base"
              >
                <span>{t.navbar.booking}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveTab('routes')}
                className="px-6 py-4 bg-slate-800 hover:bg-slate-750 text-white font-bold rounded-2xl border border-slate-700 transition duration-200 text-base"
              >
                {t.hero.btnRates}
              </button>
            </div>

            {/* Local Real-time Weather Forecast */}
            <div className="pt-2 max-w-xl">
              <LocalWeather />
            </div>
          </div>

          {/* Quick Search and Estimate Widget Card (5 columns) */}
          <div className="lg:col-span-5 bg-slate-950/80 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="absolute -top-3 -right-3 bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider py-1 px-3 rounded-full shadow-lg">
              {language === 'vi' ? 'Giảm khứ hồi 10%' : '10% Off Roundtrip'}
            </div>
            
            <div className="space-y-4 mb-6 text-left">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <span className="bg-amber-500/20 p-2 rounded-lg text-amber-400">
                  <Calendar className="h-4 w-4" />
                </span>
                <span>{language === 'vi' ? 'Tra Cứu Lộ Trình Nhanh' : 'Instant Cost Calculator'}</span>
              </h3>
              <p className="text-xs text-slate-400">{t.bookingForm.selectRoutePlaceholder}</p>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-4 text-left">
              {/* Route Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.bookingForm.selectRoute}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-amber-500" />
                  </div>
                  <select
                    name="route"
                    id="quick-route-select"
                    className="block w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-200 text-sm appearance-none cursor-pointer"
                  >
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Vehicle Type Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{language === 'vi' ? 'Dòng Xe Dự Kiến' : 'Select Car Fleet'}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-amber-500" />
                  </div>
                  <select
                    name="vehicle"
                    id="quick-vehicle-select"
                    className="block w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-200 text-sm appearance-none cursor-pointer"
                  >
                    <option value="4-seat">{language === 'vi' ? 'Xe sedan 4 chỗ ( Toyota Vios, Accent, ... )' : 'Premium 4-seater Sedan ( Toyota Vios, Accent )'}</option>
                    <option value="7-seat">{language === 'vi' ? 'Xe SUV 7 chỗ ( Fortuner, Innova, ... )' : 'Multi-purpose 7-seater ( Fortuner, Innova )'}</option>
                    <option value="16-seat">{language === 'vi' ? 'Xe Ford Transit 16 chỗ' : '16-seater Family Minibus'}</option>
                    <option value="limousine">{language === 'vi' ? 'VIP Limousine 9 chỗ massage' : 'VIP Land Cruiser Limousine 9-Seat'}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Instant benefits tags */}
              <div className="p-3 bg-slate-900 rounded-xl space-y-1.5 border border-slate-800/60">
                <div className="flex items-center text-xs text-emerald-400">
                  <span className="mr-2">✓</span>
                  <span>{language === 'vi' ? 'Đã kiểm định, xe không mùi hôi' : 'Deeply sanitized, fresh scent-free interior'}</span>
                </div>
                <div className="flex items-center text-xs text-emerald-400">
                  <span className="mr-2">✓</span>
                  <span>{language === 'vi' ? 'Đưa đón tận cổng nhà riêng, Resort' : 'Direct door pickup at private stays / Resorts'}</span>
                </div>
                <div className="flex items-center text-xs text-emerald-400">
                  <span className="mr-2">✓</span>
                  <span>{language === 'vi' ? 'Đầy đủ bảo hiểm trách nhiệm dân sự' : 'Fully loaded liability transit coverages'}</span>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                id="search-route-btn"
                className="w-full py-4 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold rounded-xl shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider"
              >
                <span>{language === 'vi' ? 'XEM CHI TIẾT BÁO GIÁ' : 'CALCULATE PRICE & DETAILS'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
