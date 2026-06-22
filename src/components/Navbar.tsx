import { useState } from 'react';
import { Phone, CheckCircle, Car, Calendar, ShieldCheck, MapPin, Menu, X, Users, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBookingWithRoute?: (routeId: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { id: 'home', label: t.navbar.home, icon: Car },
    { id: 'routes', label: t.navbar.routes, icon: MapPin },
    { id: 'fleet', label: t.navbar.fleet, icon: Users },
    { id: 'booking', label: t.navbar.booking, icon: Calendar },
    { id: 'tracker', label: t.navbar.tracker, icon: ShieldCheck },
    { id: 'admin', label: t.navbar.admin, icon: CheckCircle },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-xl backdrop-blur-md bg-opacity-95" id="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand Description */}
          <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-amber-500 text-slate-950 p-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <Car className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight block text-amber-400">DANANG HOIAN</span>
              <span className="text-xs uppercase tracking-widest font-semibold text-slate-400 block -mt-1">CHAUFFEUR SERVICE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-btn-${item.id}`}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
                  }`}
                >
                  <IconComp className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Hotline & Language Switcher & Call to Action */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Elegant Language Switcher Selector Pill */}
            <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800" id="desktop-lang-switcher">
              <button
                type="button"
                id="btn-lang-switch-vi"
                onClick={() => setLanguage('vi')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 text-xs font-extrabold rounded-lg transition-all duration-200 ${
                  language === 'vi'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🇻🇳</span>
                <span>VI</span>
              </button>
              <button
                type="button"
                id="btn-lang-switch-en"
                onClick={() => setLanguage('en')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 text-xs font-extrabold rounded-lg transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🇺🇸</span>
                <span>EN</span>
              </button>
            </div>

            <a
              href="tel:0905123456"
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-750 text-amber-400 rounded-xl font-bold border border-slate-700 transition duration-200"
              id="hotline-btn-top"
            >
              <Phone className="h-4 w-4 animate-bounce" />
              <span>{t.navbar.zaloCall}</span>
            </a>
            <button
              onClick={() => handleNavClick('booking')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all duration-250 transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              id="quick-book-button"
            >
              {t.navbar.bookNow}
            </button>
          </div>

          {/* Tablet & Mobile Header Right Aligned items */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Quick Language Toggle on Mobile Header */}
            <button
              id="mobile-header-lang-toggle"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-850 rounded-xl text-xs font-black text-amber-400 flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'vi' ? 'EN 🇺🇸' : 'VI 🇻🇳'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 transition duration-300 ease-in-out" id="mobile-menu">
          <div className="px-3 pt-2 pb-4 space-y-1.5 sm:px-4">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`mobile-nav-btn-${item.id}`}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <IconComp className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
              {/* Language Selection Bar inside Mobile Drawer */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-850" id="mobile-drawer-lang-selector">
                <button
                  type="button"
                  id="mobile-lang-vi"
                  onClick={() => setLanguage('vi')}
                  className={`py-2 text-xs font-extrabold rounded-lg flex items-center justify-center space-x-1 ${
                    language === 'vi'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🇻🇳</span>
                  <span>Tiếng Việt</span>
                </button>
                <button
                  type="button"
                  id="mobile-lang-en"
                  onClick={() => setLanguage('en')}
                  className={`py-2 text-xs font-extrabold rounded-lg flex items-center justify-center space-x-1 ${
                    language === 'en'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🇺🇸</span>
                  <span>English</span>
                </button>
              </div>

              <a
                href="tel:0905123456"
                className="flex items-center justify-center space-x-2 py-3 bg-slate-900 text-amber-400 rounded-xl font-bold border border-slate-800"
              >
                <Phone className="h-4 w-4" />
                <span>{t.navbar.zaloCall}</span>
              </a>
              <button
                onClick={() => handleNavClick('booking')}
                className="w-full py-3 bg-amber-500 text-slate-950 rounded-xl font-bold text-center shadow-lg"
              >
                {t.bookingForm.submitBooking}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
