import { Car, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 text-left" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Intro column (1) */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <div className="bg-amber-500 text-slate-950 p-2 rounded-xl">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-white uppercase">DANANG HOIAN CHAUFFEUR</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {t.footer.desc}
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-400 flex-shrink-0" />
              <span className="font-bold">
                {language === 'vi' ? 'Đã đăng ký Bộ Công Thương' : 'Licensed Carriage Operator'}
              </span>
            </div>
          </div>

          {/* Quick links column (2) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'vi' ? 'Hành Trình Phổ Biến' : 'Top Transit Paths'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#routes-landing-section" className="hover:text-amber-400 transition-colors">
                  {language === 'vi' ? '🚗 Sân Bay Đà Nẵng ↔ Hội An' : '🚗 Da Nang Airport ↔ Hoi An'}
                </a>
              </li>
              <li>
                <a href="#routes-landing-section" className="hover:text-amber-400 transition-colors">
                  {language === 'vi' ? '⛰ Đà Nẵng ↔ Bà Nà Hills Cầu Vàng' : '⛰ Da Nang ↔ Golden Bridge Ba Na'}
                </a>
              </li>
              <li>
                <a href="#routes-landing-section" className="hover:text-amber-400 transition-colors">
                  {language === 'vi' ? '👑 Đà Nẵng ↔ Cố Đô Huế' : '👑 Da Nang ↔ Imperial Palace Hue'}
                </a>
              </li>
              <li>
                <a href="#routes-landing-section" className="hover:text-amber-400 transition-colors">
                  {language === 'vi' ? '🗿 Đà Nẵng ↔ Thánh Địa Mỹ Sơn' : '🗿 Da Nang ↔ My Son Sanctuary'}
                </a>
              </li>
            </ul>
          </div>

          {/* Business contact info column (3) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>
                  {language === 'vi' 
                    ? 'Chi nhánh: Số 45 Cửa Đại, Cẩm Châu, TP. Hội An, Quảng Nam'
                    : 'Branch office: 45 Cua Dai Rd, Cam Chau, Hoi An Town, Quang Nam'}
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                <span>{t.footer.workHours}</span>
              </li>
            </ul>
          </div>

          {/* Call center column (4) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'vi' ? 'Hotline & Tổng Đài' : 'Chauffeur Booking Lines'}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-amber-500 flex-shrink-0 animate-pulse" />
                <a href="tel:0905123456" className="font-bold text-sm text-amber-400 hover:underline">
                  0905.123.456 (Zalo Booking)
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                <a href="tel:0905777888" className="font-bold text-sm text-amber-400 hover:underline">
                  0905.777.888 ({language === 'vi' ? 'Hỗ trợ khẩn cấp' : 'Admin S.O.S'})
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                <span>booking@dananghoiancar.vn</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-slate-900 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs space-y-4 sm:space-y-0 text-slate-500">
          <p>{t.footer.copyright} ({language === 'vi' ? 'Tiêu chuẩn Đưa Đón 5 Sao' : 'Standard 5-Star Chauffeur Services'})</p>
          <p className="flex items-center space-x-1">
            <span>{language === 'vi' ? 'Thiết kế sang trọng bởi' : 'Luxury craft by'}</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
            <span className="font-extrabold text-amber-400">Danang Hoi An Travel Co., Ltd.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
