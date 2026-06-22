import { Users, Briefcase, Wifi, Shield, Check, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Vehicle } from '../types';

interface FleetGridProps {
  onSelectVehicle: (vehicleType: '4-seat' | '7-seat' | '16-seat' | 'limousine') => void;
}

export default function FleetGrid({ onSelectVehicle }: FleetGridProps) {
  const { vehicles, language } = useLanguage();

  return (
    <section className="py-16 bg-slate-950 text-slate-200 border-t border-slate-800/60" id="fleet-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
         {/* Section Header */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 rounded-full text-amber-500 text-xs sm:text-sm font-semibold border border-amber-500/20">
            <Star className="h-4 w-4 fill-amber-500 stroke-amber-500" />
            <span>{language === 'vi' ? 'Đội Xe Cao Cấp Hoàn Hảo' : 'Premium Luxury Car Fleet'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'vi' ? 'Đầy Đủ Các Dòng Xe Đa Dạng Từ 4 Đến 16 Chỗ' : 'Fully Diverse Fleet from 4 to 16 Seats'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'vi' 
              ? 'Danh sách phương tiện cam kết đời mới sản xuất từ năm 2022 trở lên. Xe luôn được kiểm tra định kỳ, khử trùng sạch sẽ trước khi khởi hành và có đầy đủ điều hòa, Wi-Fi 4G miễn phí.'
              : 'All vehicles strictly manufactured from 2022 onward. Deeply sanitized, regularly inspected, matching gold standards with high-speed 4G Wi-Fi and premium icy AC.'}
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {vehicles.map((vehicle: Vehicle) => (
            <div
              key={vehicle.id}
              className="bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col group text-left"
              id={`vehicle-card-${vehicle.id}`}
            >
              {/* Vehicle Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                {/* Visual badges over image */}
                <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md text-amber-400 font-extrabold text-xs px-3.5 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-emerald-400" />
                  <span>{language === 'vi' ? 'Chính Chủ Đời Mới' : 'Premium Modern Car'}</span>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-amber-500 text-slate-950 font-black text-sm px-4 py-2 rounded-xl shadow-lg">
                  {language === 'vi' ? 'Chỉ từ' : 'From'} {(vehicle.pricePerKm).toLocaleString('vi-VN')}đ / Km
                </div>
              </div>

              {/* Vehicle content info */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                        {vehicle.name}
                      </h3>
                      <p className="text-[14px] text-amber-500 font-semibold mt-1">
                        {language === 'vi' ? 'Dòng xe tiêu biểu:' : 'Featured models:'} {vehicle.models.join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                    {vehicle.description}
                  </p>

                  <div className="border-t border-b border-slate-800/80 py-3 mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Users className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-semibold px-1">
                        {language === 'vi' ? `Tối đa ${vehicle.capacity.passengers} hành khách` : `Max ${vehicle.capacity.passengers} passengers`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Briefcase className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-semibold px-1">
                        {language === 'vi' ? `${vehicle.capacity.luggage} vali tiêu chuẩn` : `${vehicle.capacity.luggage} standard suitcases`}
                      </span>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="mt-5">
                    <h4 className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 mb-2.5">
                      {language === 'vi' ? 'Trang bị tiện nghi cao cấp' : 'High-End On-Board Amenities'}
                    </h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {vehicle.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-300 animate-fadeIn">
                          <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 stroke-[2.5]" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm choose trigger */}
                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(vehicle.type)}
                    className="w-full py-3.5 px-4 bg-slate-950 border border-slate-800 hover:border-amber-500/50 group-hover:bg-amber-500 text-slate-300 group-hover:text-slate-950 font-bold rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                    id={`btn-select-${vehicle.id}`}
                  >
                    <span>{language === 'vi' ? 'Đặt Ngay Dòng Xe Này' : 'Select & Book This Vehicle'}</span>
                    <Wifi className="h-4 w-4 text-amber-500 group-hover:text-slate-950 animate-pulse" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment box */}
        <div className="bg-amber-500/5 border border-amber-500/10 p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto mt-16 text-left flex flex-col md:flex-row items-center gap-6">
          <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl shadow-lg">
            <Shield className="h-8 w-8 text-amber-500" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              {language === 'vi' ? 'Cam kết an toàn tuyệt đối & nói KHÔNG với thu phụ phí!' : 'Absolute safety guaranteed & strictly NO hidden fees!'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed animate-fadeIn">
              {language === 'vi'
                ? 'Xe đưa đón quý khách là xe chuyên nghiệp, hoạt động chở khách chính thức, không phải xe ghép, không dừng bắt khách dọc đường. Đón tiễn tận sảnh an toàn, đầy đủ giấy tờ hợp pháp luật Việt Nam.'
                : 'Our vehicles are exclusively private transfers, registered and commercially licensed. No ride-sharing with strangers, and no intermediate stops for additional pickups. Safe curbside pickup/drop with comprehensive paperwork.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
