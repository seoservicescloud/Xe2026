import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FleetGrid from './components/FleetGrid';
import RouteLandingPages from './components/RouteLandingPages';
import BookingForm from './components/BookingForm';
import BookingTracker from './components/BookingTracker';
import AdminDashboard from './components/AdminDashboard';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Star, Shield, HelpCircle, Gift, Phone, PhoneForwarded } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [prefilledRouteId, setPrefilledRouteId] = useState<string | undefined>(undefined);
  const [prefilledVehicleType, setPrefilledVehicleType] = useState<'4-seat' | '7-seat' | '16-seat' | 'limousine' | undefined>(undefined);
  const { t, testimonialsList } = useLanguage();

  // Quick routing trigger selectors
  const handleQuickSearch = (routeId: string, vehicleType: string) => {
    setPrefilledRouteId(routeId);
    setPrefilledVehicleType(vehicleType as any);
    setActiveTab('booking');
    
    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFleetCar = (vehicleType: '4-seat' | '7-seat' | '16-seat' | 'limousine') => {
    setPrefilledVehicleType(vehicleType);
    setPrefilledRouteId(undefined); // Reset route to let user choose freely
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRoutePage = (routeId: string) => {
    setPrefilledRouteId(routeId);
    setPrefilledVehicleType(undefined);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreatedBooking = () => {
    // Automatically swap to tracker tab so customers can inspect progress
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col justify-between" id="app-root-frame">
      
      {/* Top Banner alert sales strip */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[11px] sm:text-xs font-black py-2.5 px-4 text-center select-none flex items-center justify-center space-x-2 border-b border-amber-600/20">
        <Gift className="h-4 w-4 text-slate-900 animate-bounce" />
        <span>{t.promoBanner}</span>
      </div>

      {/* Navigation bar Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main stage transitions */}
      <main className="flex-grow">
        
        {/* TAB 1: HOME PAGE ROUTER */}
        {activeTab === 'home' && (
          <div className="space-y-0 animate-fadeIn" id="tab-home-container">
            {/* Elegant Hero Banner / Calculator */}
            <Hero onQuickSearch={handleQuickSearch} setActiveTab={setActiveTab} />
            
            {/* Trust Badges Bar */}
            <div className="bg-slate-950 py-10 border-t border-b border-slate-800/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
                    <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-500 border border-amber-500/20">
                      <Star className="h-6 w-6 fill-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.trustBadges.badge1Title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">{t.trustBadges.badge1Desc}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
                    <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-500 border border-amber-500/20">
                      <Shield className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.trustBadges.badge2Title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">{t.trustBadges.badge2Desc}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
                    <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-500 border border-amber-500/20">
                      <HelpCircle className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.trustBadges.badge3Title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">{t.trustBadges.badge3Desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Destinations Route Showcase Landing pages widget */}
            <RouteLandingPages onSelectRoute={handleSelectRoutePage} />

            {/* Vehicles Fleet showcasing under safe background */}
            <FleetGrid onSelectVehicle={handleSelectFleetCar} />

            {/* Testimonials customer cards list */}
            <section className="py-16 bg-slate-900 border-t border-slate-800" id="testimonials">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
                <div className="max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">{t.testimonials.title}</span>
                  <h3 className="text-3xl font-black text-white">{t.testimonials.heading}</h3>
                  <p className="text-xs sm:text-sm text-slate-400">{t.testimonials.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {testimonialsList.map((testi, i) => (
                    <div key={i} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between space-y-4">
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                        "{testi.comment}"
                      </p>
                      <div className="flex items-center space-x-3 pt-3 border-t border-slate-900">
                        <div className="text-2xl">{testi.avatar}</div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{testi.name}</h5>
                          <span className="text-[10px] text-slate-500">{testi.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Collapsed Accordion FAQ strip */}
            <FAQ />
          </div>
        )}

        {/* TAB 2: ROUTES DIRECT LANDING TAB */}
        {activeTab === 'routes' && (
          <div className="py-10 animate-fadeIn" id="tab-routes-container">
            <RouteLandingPages onSelectRoute={handleSelectRoutePage} />
          </div>
        )}

        {/* TAB 3: FLEET GRID TAB */}
        {activeTab === 'fleet' && (
          <div className="py-10 animate-fadeIn" id="tab-fleet-container">
            <FleetGrid onSelectVehicle={handleSelectFleetCar} />
          </div>
        )}

        {/* TAB 4: AUTOMATIC SECURE BOOKING FORM TAB */}
        {activeTab === 'booking' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn" id="tab-booking-container">
            <BookingForm
              initialRouteId={prefilledRouteId}
              initialVehicleType={prefilledVehicleType}
              onBookingSuccess={handleCreatedBooking}
            />
          </div>
        )}

        {/* TAB 5: TRACKER SEARCH TICKET TAB */}
        {activeTab === 'tracker' && (
          <div className="py-10 animate-fadeIn" id="tab-tracker-container">
            <BookingTracker />
          </div>
        )}

        {/* TAB 6: ADMIN OPERATOR PANEL TAB */}
        {activeTab === 'admin' && (
          <div className="py-10 animate-fadeIn" id="tab-admin-container">
            <AdminDashboard />
          </div>
        )}

      </main>

      {/* Floating Messenger Quick Direct Hotline Call button */}
      <div className="fixed bottom-6 right-6 z-40 space-y-3 flex flex-col items-end" id="quick-hotline-float">
        <a
          href="https://zalo.me/0905123456"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-2xl py-3 px-4 rounded-full transition transform hover:scale-105"
        >
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <span>Nhắn Zalo: 0905.123.456</span>
        </a>
        
        <a
          href="tel:0905123456"
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-2xl py-3 px-4 rounded-full transition transform hover:scale-105"
        >
          <PhoneForwarded className="h-4 w-4 animate-bounce text-white" />
          <span>Gọi Tổng Đài Tư Vấn</span>
        </a>
      </div>

      {/* Custom styled Footer component */}
      <Footer />

    </div>
  );
}
