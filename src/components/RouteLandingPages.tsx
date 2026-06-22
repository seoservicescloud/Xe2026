import { useState, useEffect } from 'react';
import { MapPin, Clock, ArrowRight, Compass, Tag, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface RouteLandingPagesProps {
  onSelectRoute: (routeId: string) => void;
  overrideRouteId?: string;
}

export default function RouteLandingPages({ onSelectRoute, overrideRouteId }: RouteLandingPagesProps) {
  const { routes, destinations, language } = useLanguage();

  // Let user click a route tab, defaulting to the first route or an overridden one
  const [selectedRouteId, setSelectedRouteId] = useState<string>(
    overrideRouteId && routes.some(r => r.id === overrideRouteId) ? overrideRouteId : routes[0].id
  );

  // Keep state synced if overrideRouteId changes from quick search
  useEffect(() => {
    if (overrideRouteId && routes.some(r => r.id === overrideRouteId)) {
      setSelectedRouteId(overrideRouteId);
    }
  }, [overrideRouteId, routes]);

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  const handleRouteSelect = (id: string) => {
    setSelectedRouteId(id);
    const element = document.getElementById('route-details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-slate-950" id="routes-landing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 rounded-full text-amber-500 text-xs sm:text-sm font-semibold border border-amber-500/20">
            <Compass className="h-4 w-4" />
            <span>{language === 'vi' ? 'Landings Theo Từng Tuyến Du Lịch Nổi Tiếng' : 'Detailed Landing Spot Rates'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {language === 'vi' ? 'Hành Trình Đưa Đi Đón Về Chuyên Nghiệp' : 'Professional Private Journeys'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {language === 'vi'
              ? 'Bảng giá cố định, minh bạch không đổi từ sảnh đón Sân Bay Đà Nẵng đi Hội An và các địa danh tham quan di sản văn hoá nổi tiếng nhất miền Trung.'
              : 'Flat fees, dynamic quotes starting directly from your arrival gate at Da Nang Airport to Hoi An old quarters or imperial heritage sites.'}
          </p>
        </div>

        {/* Route Selector Tabs - Interactive Landing Choice */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10" id="route-navigation-tabs">
          {routes.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                onClick={() => handleRouteSelect(route.id)}
                className={`p-4 rounded-2xl text-center border transition-all duration-300 flex flex-col justify-between items-center ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 text-white shadow-xl shadow-amber-500/5 transform -translate-y-1'
                    : 'border-slate-850 bg-slate-900/40 hover:border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className={`text-[11px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full mb-2 ${
                  isSelected ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-950 text-slate-500'
                }`}>
                  {language === 'vi' ? `Tầm ${route.distanceKm}km / ${route.durationMin}p` : `${route.distanceKm}km / ${route.durationMin}m`}
                </span>
                <span className="text-sm font-bold tracking-tight line-clamp-2 min-h-[40px]">
                  {route.id === 'route-dn-ha' 
                    ? (language === 'vi' ? 'Sân Bay ↔ Hội An' : 'Airport ↔ Hoi An') 
                    : route.id === 'route-dn-bana' 
                    ? (language === 'vi' ? 'Bà Nà Hills' : 'Ba Na Hills Gold Bridge') 
                    : route.id === 'route-dn-hue' 
                    ? (language === 'vi' ? 'Cố Đô Huế' : 'Hue Imperial City') 
                    : (language === 'vi' ? 'Thánh Địa Mỹ Sơn' : 'My Son Sanctuary')}
                </span>
                <ChevronRight className={`h-4 w-4 mt-2 ${isSelected ? 'text-amber-500' : 'text-slate-500'}`} />
              </button>
            );
          })}
        </div>

        {/* Landing Detail Stage */}
        <div
          id="route-details"
          className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl grid lg:grid-cols-12"
        >
          {/* Main Visual Col (5 columns) */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full bg-slate-950">
            <img
              src={activeRoute.imageUrl}
              alt={activeRoute.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-lg uppercase tracking-wider">
                <Tag className="h-3 w-3" />
                <span>{language === 'vi' ? 'Giá Tốt Nhất' : 'Guaranteed Price'}</span>
              </span>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                {activeRoute.name}
              </h3>
              <p className="text-xs text-slate-300">
                {language === 'vi' ? 'Lộ trình chuẩn từ Đà Nẵng kết nối thẳng các khách sạn, điểm hẹn di sản.' : 'Smooth transit directly from Da Nang terminal to your hotel lobby & world-famous spots.'}
              </p>
            </div>
          </div>

          {/* Landing Content Info Col (7 columns) */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 text-left text-slate-200">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs mb-3 text-amber-400 font-semibold uppercase tracking-wider">
                <span className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-amber-500" />
                  {language === 'vi' ? 'Sắp xếp xe đi ngay' : 'Direct and Private Transit'}
                </span>
                <span className="text-slate-700">•</span>
                <span className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-amber-400" />
                  {language === 'vi' ? `Di chuyển: ~${activeRoute.durationMin} phút` : `Est. Transit: ~${activeRoute.durationMin} mins`}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {language === 'vi' ? 'Bảng Giá Thuê Xe Trọn Gói Theo Tuyến' : 'Inclusive Fixed Route Rate'}
              </h4>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                {activeRoute.description}
              </p>
            </div>

            {/* Dynamic Interactive Pricing Grid */}
            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-850">
              <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                {language === 'vi' ? 'Giá niêm yết xe tư nhân (không ghép xe)' : 'Fixed Private Transfer Fare (No ride-sharing)'}
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* 4 Seat */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">{language === 'vi' ? 'Xe Sang 4 Ghế' : '4-Seat Sedan'}</span>
                  <span className="text-base font-black text-amber-400 mt-1">
                    {(activeRoute.prices['4-seat']).toLocaleString('vi-VN')} đ
                  </span>
                  <span className="text-[9px] text-emerald-400 mt-1">{language === 'vi' ? 'Có cốp rộng rãi *' : 'Spacious Trunk*'}</span>
                </div>

                {/* 7 Seat */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">{language === 'vi' ? 'Xe SUV 7 Ghế' : '7-Seat SUV'}</span>
                  <span className="text-base font-black text-amber-400 mt-1">
                    {(activeRoute.prices['7-seat']).toLocaleString('vi-VN')} đ
                  </span>
                  <span className="text-[9px] text-emerald-400 mt-1">{language === 'vi' ? 'Gánh hành lý to' : 'Fits big luggage'}</span>
                </div>

                {/* 16 Seat */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">{language === 'vi' ? 'Minibus 16 Chỗ' : '16-Seat Coach'}</span>
                  <span className="text-base font-black text-amber-400 mt-1">
                    {(activeRoute.prices['16-seat']).toLocaleString('vi-VN')} đ
                  </span>
                  <span className="text-[9px] text-emerald-400 mt-1">{language === 'vi' ? 'Đoàn đông vui' : 'Fits travel groups'}</span>
                </div>

                {/* Limousine */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">{language === 'vi' ? 'F.Class Limo' : 'F-Class Limo'}</span>
                  <span className="text-base font-black text-amber-400 mt-1">
                    {activeRoute.prices['limousine'] 
                      ? `${(activeRoute.prices['limousine']).toLocaleString('vi-VN')} đ` 
                      : (language === 'vi' ? 'Liên hệ' : 'Contact Us')}
                  </span>
                  <span className="text-[9px] text-emerald-400 mt-1">{language === 'vi' ? 'Massage VIP' : 'Luxury Massage VIP'}</span>
                </div>

              </div>
              <p className="text-[10px] text-slate-550 mt-1 italic leading-relaxed">
                {language === 'vi'
                  ? '* *Riêng đối với các tuyến Bà Nà Hills, Huế, Mỹ Sơn: Đơn giá đã bao gồm luôn chi phí Khứ Hồi Cả Đi Lẫn Về trong ngày và thời gian tài xế chờ đợi quý khách thoải mái từ 3 - 8 tiếng.'
                  : '* *Special tourist spots (Ba Na Hills, Hue, My Son): Ticket prices automatically include standard same-day roundtrip transfer plus 3 to 8 hours driver standby waiting-time at the landmark.'}
              </p>
            </div>

            {/* Highlights bullet list */}
            <div className="space-y-3">
              <h5 className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 flex items-center space-x-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span>{language === 'vi' ? 'Tiện ích và Cam kết của tuyến đường này:' : 'Exclusive commitments for this itinerary:'}</span>
              </h5>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {activeRoute.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 mr-1.5 flex-shrink-0 stroke-[2.5]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attractions and landmark checkpoints */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-slate-500 block mb-2">
                {language === 'vi' ? 'Các điểm phụ cận sẵn sàng Dừng Chờ Chụp Hình check-in:' : 'Landmark points where we offer free stopover checks for photos:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {activeRoute.attractions.map((attraction, i) => (
                  <span key={i} className="text-xs bg-slate-900 text-slate-300 px-3 py-1.5 rounded-full border border-slate-800">
                    📍 {attraction}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-left py-1">
                <span className="text-xs text-slate-500 block font-normal">{language === 'vi' ? 'Hỗ trợ nhanh tư vấn 24/7' : '24/7 Quick Customer Care'}</span>
                <span className="text-sm font-black text-amber-500">{language === 'vi' ? 'Trọn gói không phát sinh' : 'All-inclusive no extras'}</span>
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <a
                  href={`https://zalo.me/0905123456?text=Tôi%20muốn%20tư%20vấn%20tuyến%20${encodeURIComponent(activeRoute.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none px-5 py-3 bg-slate-800 hover:bg-slate-755 text-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl text-center border border-slate-700 transition"
                >
                  {language === 'vi' ? 'Tư vấn qua Zalo' : 'Live Chat (Zalo/WA)'}
                </a>
                <button
                  type="button"
                  onClick={() => onSelectRoute(activeRoute.id)}
                  className="flex-1 sm:flex-none px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
                >
                  <span>{language === 'vi' ? 'Đặt Tuyến Này' : 'Select This Route'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Famous Destinations Carousel Grid */}
        <div className="mt-20">
          <div className="text-left mb-8 max-w-2xl">
            <h3 className="text-2xl font-black text-white">
              {language === 'vi' ? 'Khám Phá Các Danh Thắng Du Lịch Miền Trung' : 'Explore Central Vietnam Legendary Landmarks'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {language === 'vi'
                ? 'Các tài xế nhiệt tình của chúng tôi am hiểu cặn kẽ mọi khu du lịch nổi tiếng từ Đà Nẵng, Quảng Nam tới Huế, luôn hân hạnh đồng hành phục vụ.'
                : 'Our extremely hospitable, professional local drivers possess profound knowledge of scenic hotspots from Da Nang, Quang Nam, and Thua Thien Hue.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-slate-900/60 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/30 shadow-2xl hover:shadow-amber-500/5 transition duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-md">
                      {dest.distanceFromDaNang}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-white group-hover:text-amber-400 transition">
                      {dest.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                      {dest.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 bg-slate-950/40 mt-1">
                  💡 <span className="font-semibold text-amber-500">{language === 'vi' ? 'Nổi bật:' : 'Best For:'}</span> {dest.famousFor}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
