import { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, User, Calendar, Clock, MapPin, Sparkles, Shield, Receipt, ChevronLeft, ChevronRight, FileCheck, CheckCircle2, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Booking } from '../types';

interface BookingFormProps {
  initialRouteId?: string;
  initialVehicleType?: '4-seat' | '7-seat' | '16-seat' | 'limousine';
  onBookingSuccess: (booking: Booking) => void;
}

export default function BookingForm({ initialRouteId, initialVehicleType, onBookingSuccess }: BookingFormProps) {
  const { t, routes, language } = useLanguage();
  
  const [step, setStep] = useState(1);
  const [routeId, setRouteId] = useState(initialRouteId || routes[0].id);
  const [vehicleType, setVehicleType] = useState<'4-seat' | '7-seat' | '16-seat' | 'limousine'>(initialVehicleType || '4-seat');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  
  // Passenger Info
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [notes, setNotes] = useState('');
  
  // Custom accessories
  const [needBabySeat, setNeedBabySeat] = useState(false);
  const [englishDriver, setEnglishDriver] = useState(false);

  // Computed price
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Success ticket capture state
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const selectedRoute = routes.find(r => r.id === routeId) || routes[0];

  // Keep state synced if initial values change from quick estimate
  useEffect(() => {
    if (initialRouteId) setRouteId(initialRouteId);
    if (initialVehicleType) setVehicleType(initialVehicleType);
  }, [initialRouteId, initialVehicleType]);

  // Recalculate price dynamically when options change
  useEffect(() => {
    let basePrice = selectedRoute.prices[vehicleType] || 250000;
    
    // Calculate total price based on round trip adjustments
    let total = basePrice;
    if (isRoundTrip) {
      // Round trip has a 10% discount on the return leg
      total = basePrice + (basePrice * 0.9);
    }

    // Small extra options charges
    if (needBabySeat) {
      total += 50000; // 50k for baby seat
    }
    if (englishDriver) {
      total += 100000; // 100k for English-speaking driver
    }

    setEstimatedCost(total);
  }, [routeId, vehicleType, isRoundTrip, needBabySeat, englishDriver, selectedRoute]);

  const handleNextStep = () => {
    // Basic validation
    if (step === 1) {
      if (!pickupDate || !pickupTime) {
        alert(language === 'vi' ? 'Vui lòng chọn đầy đủ Ngày đón và Giờ đón khách.' : 'Please select pick-up date and arrival time.');
        return;
      }
      if (isRoundTrip && (!returnDate || !returnTime)) {
        alert(language === 'vi' ? 'Vui lòng chọn đầy đủ Ngày về và Giờ về đối với hành trình khứ hồi.' : 'Please select return date and return time for your round-trip.');
        return;
      }
      // Fill in default location shortcuts based on route
      setPickupLocation(pickupLocation || selectedRoute.from);
      setDropoffLocation(dropoffLocation || selectedRoute.to);
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const generateSecureBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !email || !pickupLocation || !dropoffLocation) {
      alert(language === 'vi' ? 'Vui lòng điền đầy đủ các thông tin cá nhân và điểm đón trả bắt buộc.' : 'Please enter all passenger particulars and details.');
      return;
    }

    // Generate ticket references and hash keys
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `DNAH-${randomHex}`;
    const secureHash = `SECURE-${Math.random().toString(36).substr(2, 9).toUpperCase()}-SSL`;

    const newBooking: Booking = {
      id: bookingCode,
      customerName,
      phone,
      email,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      returnDate: isRoundTrip ? returnDate : undefined,
      returnTime: isRoundTrip ? returnTime : undefined,
      isRoundTrip,
      vehicleType,
      estimatedCost,
      status: 'pending',
      flightNumber: flightNumber || undefined,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
      securedHash: secureHash
    };

    // Save to local storage to persist
    const stored = localStorage.getItem('danang_hoian_bookings');
    let bookingsList: Booking[] = [];
    if (stored) {
      try {
        bookingsList = JSON.parse(stored);
      } catch (err) {
        bookingsList = [];
      }
    }
    bookingsList.unshift(newBooking);
    localStorage.setItem('danang_hoian_bookings', JSON.stringify(bookingsList));

    // Update state to trigger E-Ticket View
    setCompletedBooking(newBooking);
    onBookingSuccess(newBooking);
  };

  const copyBookingCode = () => {
    if (completedBooking) {
      navigator.clipboard.writeText(completedBooking.id);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  // If booking successfully created, display E-Ticket Invoice directly
  if (completedBooking) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-slate-200" id="booking-success-screen">
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-left">
          
          {/* Header invoice ribbon */}
          <div className="bg-emerald-600 p-6 sm:p-8 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2.5 rounded-2xl border border-white/10">
                <FileCheck className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[10px] text-emerald-200 block">
                  {language === 'vi' ? 'Đã Ghi Nhận Lịch Đón' : 'E-Ticket Active Code'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {language === 'vi' ? 'Đặt Vé Thành Công!' : 'Booking Confirmed!'}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs block text-[10px] text-emerald-100">{language === 'vi' ? 'Mã Khớp Vé' : 'Security Token'}</span>
              <span className="text-base font-black text-amber-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 block mt-1">
                {completedBooking.id}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Visual Security Badge */}
            <div className="p-4 bg-emerald-950/20 rounded-2xl border border-emerald-800/30 flex items-start space-x-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-emerald-400">
                  {language === 'vi' ? 'Gửi Yêu Cầu Đặt Lịch Tự Động Thành Công' : 'Automated Booking Logged Successfully'}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {language === 'vi'
                    ? `Mã số đặt lịch ${completedBooking.id} đã được đồng bộ hóa hóa đơn điện tử bảo mật chuẩn mã hóa SSL. Lưu lại mã này để hủy lịch/tra cứu lái xe bất cứ lúc nào.`
                    : `Ticket reference code ${completedBooking.id} has been registered securely keying complete SSL certificates. Retain this key to track dispatchers or cancel rides.`}
                </p>
              </div>
            </div>

            {/* Travel Summary */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                {language === 'vi' ? 'Chi tiết hành trình di chuyển' : 'Travel Route & Pickup Summary'}
              </h4>
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850/80 grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-slate-500 block font-semibold">{language === 'vi' ? 'Tuyến Đường' : 'Itinerary Path'}</span>
                  <span className="text-sm font-bold block text-white mt-0.5">{selectedRoute.name}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-semibold">{language === 'vi' ? 'Thời Gian Đón' : 'Scheduled Pickup'}</span>
                  <span className="text-sm font-bold block text-white mt-0.5">
                    {language === 'vi' 
                      ? `${completedBooking.pickupTime} - ngày ${completedBooking.pickupDate}`
                      : `${completedBooking.pickupTime} on ${completedBooking.pickupDate}`}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[11px] text-slate-500 block font-semibold">{language === 'vi' ? 'Điểm Đón Chi Tiết' : 'Exact Pick-Up Point'}</span>
                  <span className="text-xs font-medium block text-slate-300 mt-0.5">📌 {completedBooking.pickupLocation}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[11px] text-slate-500 block font-semibold">{language === 'vi' ? 'Điểm Trả Chi Tiết' : 'Exact Drop-Off Point'}</span>
                  <span className="text-xs font-medium block text-slate-300 mt-0.5">📍 {completedBooking.dropoffLocation}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-semibold">{language === 'vi' ? 'Dòng Xe Đăng Ký' : 'Vehicle Category'}</span>
                  <span className="text-xs font-bold block text-white mt-0.5 uppercase">
                    {completedBooking.vehicleType === '4-seat' 
                      ? (language === 'vi' ? '🚗 Xe Sedan 4 Chỗ' : '🚗 4-Seat Sedan') 
                      : completedBooking.vehicleType === '7-seat' 
                      ? (language === 'vi' ? '🚙 Xe SUV 7 Chỗ' : '🚙 7-Seat SUV') 
                      : completedBooking.vehicleType === '16-seat' 
                      ? (language === 'vi' ? '🚐 Minibus 16 Chỗ' : '🚐 16-Seat Coach') 
                      : (language === 'vi' ? '✨ VIP Limousine 9 Chỗ' : '✨ VIP Limousine 9-Seat')}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-semibold">{language === 'vi' ? 'Tổng Cước Cam Kết' : 'Committed Direct Fair'}</span>
                  <span className="text-sm font-black text-amber-500 mt-0.5 animate-pulse">
                    {completedBooking.estimatedCost.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
                {language === 'vi' ? 'Thông tin khách du lịch' : 'Lead Passenger Details'}
              </h4>
              <div className="grid sm:grid-cols-3 gap-4 border border-slate-800 bg-slate-950/40 p-4 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-500 block">{language === 'vi' ? 'Họ và Tên' : 'Full Name'}</span>
                  <span className="text-xs font-bold text-white">{completedBooking.customerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">{language === 'vi' ? 'Số Điện Thoại (Zalo)' : 'Phone Number (Zalo/WA)'}</span>
                  <span className="text-xs font-bold text-white">{completedBooking.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">{language === 'vi' ? 'Thư Điện Tử (Email)' : 'Email Billing Address'}</span>
                  <span className="text-xs font-semibold text-slate-300 truncate block">{completedBooking.email}</span>
                </div>
              </div>
            </div>

            {/* Simulated Driver Assign Phase */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
                {language === 'vi' ? 'Quy Trình Hoạt Động & Điều Xe' : 'Dispatcher Schedule & Driver Assignment'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'vi'
                  ? 'Hệ thống tổng đài tự động đang kết nối tới các tài xế chuẩn trực gần bạn nhất. Lái xe và thông tin biển số xe kèm số điện thoại liên lạc sẽ được cập nhật chi tiết đến số Zalo / SMS của bạn trước 2 tiếng giờ đón sinh hoạt. Bạn không cần lo lắng về việc lỡ xe!'
                  : 'Automated fleet controllers are currently dispatching your request to the closest matching private driver nearby. All driver details, phone links, and car plates will be transmitted directly via WA/Zalo/SMS at least 2 hours prior and reconfirmed. Travel safe!'}
              </p>
            </div>

            {/* Actions for receipts */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={copyBookingCode}
                className="flex-1 py-3 px-4 bg-slate-900 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2 border border-slate-850"
              >
                <span>{copiedText ? (language === 'vi' ? 'Đã Sao Chép!' : 'Copied!') : (language === 'vi' ? 'Sao Chép Mã Số Vé' : 'Copy Booking ID')}</span>
              </button>
              
              <button
                type="button"
                onClick={() => setCompletedBooking(null)}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/15"
              >
                <Receipt className="h-4 w-4" />
                <span>{language === 'vi' ? 'Tạo Mới Đơn Đặt Xe Khác' : 'Book Another Ride'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden text-slate-200 text-left" id="booking-wizard-card">
      
      {/* Form Progress Header bar */}
      <div className="bg-slate-900 px-6 sm:px-8 py-5 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="bg-amber-500 text-slate-950 p-2 rounded-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
              {language === 'vi' ? 'Hệ Thống Đặt Lịch Tự Động' : 'AI Automated Booking Engine'}
            </h3>
            <p className="text-[11px] text-slate-400">
              {language === 'vi' ? 'Nhanh gọn - Tin cậy - Bảo mật thông tin tuyệt đối' : 'Fast - Secure - Direct curbside service guaranteed'}
            </p>
          </div>
        </div>
        
        {/* Step dots Indicator */}
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-400">
          <span className={`h-6 w-6 rounded-full flex items-center justify-center border ${
            step >= 1 ? 'bg-amber-500 text-slate-950 border-amber-500' : 'border-slate-700'
          }`}>1</span>
          <span className="h-px w-4 bg-slate-700" />
          <span className={`h-6 w-6 rounded-full flex items-center justify-center border ${
            step >= 2 ? 'bg-amber-500 text-slate-950 border-amber-500' : 'border-slate-700'
          }`}>2</span>
          <span className="h-px w-4 bg-slate-700" />
          <span className={`h-6 w-6 rounded-full flex items-center justify-center border ${
            step >= 3 ? 'bg-amber-500 text-slate-950 border-amber-500' : 'border-slate-700'
          }`}>3</span>
        </div>
      </div>

      {/* Main wizard frame */}
      <div className="p-6 sm:p-8">
        
        {/* STEP 1: Lộ trình & Phương Tiện */}
        {step === 1 && (
          <div className="space-y-6" id="booking-step-1">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white flex items-center space-x-1.5">
                <MapPin className="h-5 w-5 text-amber-500" />
                <span>{language === 'vi' ? 'Bước 1: Thiết Lập Tuyến Đường & Dòng Xe' : 'Step 1: Set Route & Choose Car'}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'vi' ? 'Lựa chọn tuyến du lịch bạn mong muốn, ngày khởi hành và loại xe tương xứng.' : 'Select tour route destination, date of service, and vehicle type.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              
              {/* Route Select drop */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {language === 'vi' ? 'Tuyến Đường Du Lịch' : 'Select Tour Travel Route'}
                </label>
                <select
                  value={routeId}
                  onChange={(e) => setRouteId(e.target.value)}
                  className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-505 text-white text-sm"
                  id="wizard-route-select"
                >
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name} - ({route.id === 'route-dn-ha' ? (language === 'vi' ? 'Đón Sân Bay' : 'Airport Shuttles') : (language === 'vi' ? 'Khứ Hồi Trọn Gói' : 'Roundtrip Package')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Select button blocks */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {language === 'vi' ? 'Chọn Loại Xe Phù Hợp' : 'Select Car Segment'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['4-seat', '7-seat', '16-seat', 'limousine'] as const).map((type) => {
                    const price = selectedRoute.prices[type];
                    if (!price) return null;
                    const isSelected = vehicleType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setVehicleType(type)}
                        className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                            : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold tracking-tight block">
                          {type === '4-seat' ? '🚗 4 Chỗ' : type === '7-seat' ? '🚙 7 Chỗ' : type === '16-seat' ? '🚐 16 Chỗ' : '✨ Limo'}
                        </span>
                        <span className="text-[11px] font-black text-amber-500 block mt-1">
                          {price.toLocaleString('vi-VN')}đ
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Round Trip Selector */}
              <div className="md:col-span-2 p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">
                    {language === 'vi' ? 'Đặt Xe Khứ Hồi (Đi & Về 2 Chiều)' : 'Book Round-Trip Shuttles (2-Way)'}
                  </h5>
                  <p className="text-[10px] text-slate-400">
                    {language === 'vi' ? 'Giảm ngay 10% chi phí cho lượt về đối với toàn bộ dòng xe.' : 'Instantly save 10% on the return route for any vehicle selected.'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer font-semibold text-slate-400 text-sm">
                  <input
                    type="checkbox"
                    checked={isRoundTrip}
                    onChange={(e) => setIsRoundTrip(e.target.checked)}
                    className="sr-only peer"
                    id="round-trip-toggle"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {/* Departure Pickers */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {language === 'vi' ? 'Ngày Đón Khách' : 'Pickup Date'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-555" />
                  </div>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {language === 'vi' ? 'Giờ Đón Khách' : 'Pickup Time'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-4 w-4 text-slate-555" />
                  </div>
                  <input
                    type="time"
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  />
                </div>
              </div>

              {/* Conditional Return Pickers if Round Trip checked */}
              {isRoundTrip && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      {language === 'vi' ? 'Ngày Về (Khứ hồi)' : 'Return Leg Date'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-slate-555" />
                      </div>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      {language === 'vi' ? 'Giờ Đón Chiều Về' : 'Return Departure Time'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-4 w-4 text-slate-555" />
                      </div>
                      <input
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Price Preview Panel */}
            <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">{language === 'vi' ? 'Ước tính giá cước trọn gói' : 'Estimated Total Pricing'}</span>
                <span className="text-2xl font-black text-amber-500">{estimatedCost.toLocaleString('vi-VN')} đ</span>
              </div>
              <p className="text-[10px] text-slate-400 max-w-sm text-left leading-relaxed">
                {language === 'vi' 
                  ? '* Mức giá ước tính chi tiết đầy đủ xăng xe, lương lái xe và chi phí đỗ bến/vào cổng sân bay Đà Nẵng, tuyệt đối không tính phụ phí xe chạy rỗng.'
                  : '* Final cost calculated includes tolls, parking entry points, drivers fee, and fuel. Fixed flat ride fee with zero hidden extras or runbacks.'}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center space-x-2 text-sm"
                id="next-step-1-btn"
              >
                <span>{language === 'vi' ? 'Nhập Thông Tin Đưa Đón' : 'Fill Contact details'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Thông tin liên lạc & Điểm đón cụ thể */}
        {step === 2 && (
          <div className="space-y-6" id="booking-step-2">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white flex items-center space-x-1.5">
                <User className="h-5 w-5 text-amber-500" />
                <span>{language === 'vi' ? 'Bước 2: Thông Tin Liên Lạc & Điểm Đón' : 'Step 2: Passenger Details & Pickup address'}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'vi' ? 'Cung cấp địa điểm chính xác và thông tin liên lạc để tổng đài làm việc.' : 'Declare exact pickup points and communications numbers.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {language === 'vi' ? 'Họ & Tên Khách Hàng' : 'Lead Traveler Name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none font-semibold">
                    <User className="h-4 w-4 text-slate-555" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={language === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white font-medium"
                    id="customer-name-input"
                  />
                </div>
              </div>

              {/* Phone (Zalo linked) */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-semibold">
                  {language === 'vi' ? 'Số điện thoại (Nhận thông tin Zalo)' : 'Phone Signal (Zalo/WhatsApp)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-slate-555" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="+84 9xx-xxx-xxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                    id="phone-input"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-slate-400">
                  {language === 'vi' ? 'Địa chỉ Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-555" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="passenger@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                    id="email-input"
                  />
                </div>
              </div>

              {/* Airport Specific Code Input (Optional but recommended) */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {language === 'vi' ? 'Mã Chuyến Bay (Không bắt buộc)' : 'Flight Number (Optional)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-xs text-slate-500 font-bold">✈</span>
                  </div>
                  <input
                    type="text"
                    placeholder="VN-124, VJ-628 ..."
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white uppercase font-semibold"
                    id="flight-number-input"
                  />
                </div>
                <span className="text-[10px] text-slate-550 mt-1 block">
                  {language === 'vi' 
                    ? 'Rất hữu ích khi đón tại sân bay Đà Nẵng để tài xế chủ động theo dõi thời gian bay delay.'
                    : 'Highly recommended for airport arrivals; we monitor delays in real-time to adjust curbside pickups.'}
                </span>
              </div>

              {/* Exact pick location */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-slate-400">
                  {language === 'vi' ? 'Địa Điểm Đón Chi Tiết' : 'Specific Pickup Location Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-xs text-emerald-500">📌</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={language === 'vi' ? 'Sân bay Đà Nẵng, Khách sạn Mường Thanh, resort, nhà riêng...' : 'Da Nang Airport terminal, private stay lobby, resort gates, specific house no...'}
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-505 text-white"
                    id="pickup-location-input"
                  />
                </div>
              </div>

              {/* Exact Destination Location */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-slate-400">
                  {language === 'vi' ? 'Địa Điểm Trả Khách Chi Tiết' : 'Specific Location Drop-Off Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-xs text-amber-500">📍</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={language === 'vi' ? 'Khách sạn Resort Hội An, bãi tắm, địa danh du lịch...' : 'Resort lobby Hoi An, local homestay name, tourist landmark destination...'}
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="pl-9 pr-4 py-2.5 w-full bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-505 text-white"
                    id="dropoff-location-input"
                  />
                </div>
              </div>

              {/* Special Options Add-ons */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-slate-400 tracking-wider">
                  {language === 'vi' ? 'Dịch Vụ Tiền Ích Cộng Thêm' : 'Optional Comfort Amenities'}
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-705 transition">
                    <input
                      type="checkbox"
                      checked={needBabySeat}
                      onChange={(e) => setNeedBabySeat(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-amber-500 h-4 w-4 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {language === 'vi' ? 'Ghế Ô Tô Cho Em Bé (+50.000đ)' : 'Infant Toddler Seat (+50,000 VND)'}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {language === 'vi' ? 'Đảm bảo quãng đường cho bé đi khoẻ mạnh.' : 'Secure, ISO certified child capsule seat.'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-705 transition">
                    <input
                      type="checkbox"
                      checked={englishDriver}
                      onChange={(e) => setEnglishDriver(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-amber-500 h-4 w-4 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {language === 'vi' ? 'Tài Xế Giao Tiếp Tiếng Anh (+100.000đ)' : 'English Conversational Driver (+100,000 VND)'}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {language === 'vi' ? 'Thích hợp cho du khách quốc tế.' : 'Ideal for seamless tourist feedback/VIP guides.'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Special requests / Notes */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {language === 'vi' ? 'Ghi Chú Đặc Biệt' : 'Special Notes / Instructions'}
                </label>
                <textarea
                  placeholder={language === 'vi' ? 'Yêu cầu xe không mùi tỏi, chuẩn bị thêm nước uống lạnh...' : 'Scent-free interior, chilled bottles of water, additional stops...'}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-white h-24"
                  id="notes-input"
                />
              </div>

            </div>

            {/* Actions progress */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-3 bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800 font-bold rounded-xl text-sm flex items-center space-x-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{language === 'vi' ? 'Quay Lại Bước 1' : 'Back to Step 1'}</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center space-x-2 text-sm"
                id="next-step-2-btn"
              >
                <span>{language === 'vi' ? 'Xác Nhận Đặt Ghế' : 'Estimate Detail Summary'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Xác nhận tóm tắt & Ký gửi cam kết SSL */}
        {step === 3 && (
          <form onSubmit={generateSecureBooking} className="space-y-6" id="booking-step-3">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white flex items-center space-x-1.5">
                <Shield className="h-5 w-5 text-emerald-500" />
                <span className="text-white font-extrabold">{language === 'vi' ? 'Bước 3: Xác Nhận Hóa Đơn Trực Tuyến Bảo Mật' : 'Step 3: Secure SSL Checkout Confirmation'}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'vi' ? 'Đảm bảo thông tin khớp nối hoàn toàn đồng nhất trước khi lưu hành.' : 'Verify detailed route specs and passenger information to lock fare.'}
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-slate-500 block pb-2 border-b border-slate-800/60">
                {language === 'vi' ? 'Tóm tắt dịch vụ du lịch' : 'Ride specification summary'}
              </span>
              
              <div className="grid sm:grid-cols-3 gap-y-3 gap-x-6 text-sm">
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">{language === 'vi' ? 'Khách Hàng' : 'Passenger'}</span>
                  <span className="font-extrabold text-white">{customerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">{language === 'vi' ? 'Số Điện Thoại' : 'Phone Tag'}</span>
                  <span className="font-bold text-white">{phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">Email</span>
                  <span className="font-medium text-slate-300 truncate block">{email}</span>
                </div>
                
                <div className="sm:col-span-3">
                  <span className="text-[10px] text-slate-500 block font-bold">{language === 'vi' ? 'Lộ Trình Tuyến Đi' : 'Selected Tour Run'}</span>
                  <span className="font-bold text-white block text-xs">🚗 {selectedRoute.name}</span>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-[10px] text-slate-500 block font-bold">{language === 'vi' ? 'Điểm Đi Đón Chi Tiết' : 'Specific curbside address description'}</span>
                  <p className="text-xs text-slate-200 leading-tight block mt-1">
                    📌 {pickupLocation} <br className="sm:hidden" />
                    ➜ 📍 {dropoffLocation}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">{language === 'vi' ? 'Thời Điểm Lịch Hẹn' : 'Pickup Schedule'}</span>
                  <span className="font-bold text-amber-500 block text-xs">
                    {pickupTime} {language === 'vi' ? 'ngày' : 'on'} {pickupDate}
                  </span>
                  {isRoundTrip && (
                    <span className="font-semibold text-emerald-400 block text-[10px]">
                      {language === 'vi' ? `Lượt về: ${returnTime} ngày ${returnDate}` : `Return: ${returnTime} on ${returnDate}`}
                    </span>
                  )}
                </div>
              </div>

              {/* Extra checklist */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-x-4 gap-y-1 bg-slate-900/40 p-3 rounded-lg">
                <span className="text-xs text-slate-300 font-medium">
                  {language === 'vi' ? 'Dòng xe:' : 'Car Segment:'} <strong className="uppercase text-white">{vehicleType}</strong>
                </span>
                <span className="text-slate-700">|</span>
                <span className="text-xs text-slate-300 font-medium">
                  {language === 'vi' ? 'Cước Trọn Gói:' : 'Inclusive Fare:'} <strong className="text-amber-400 text-sm">{(estimatedCost).toLocaleString('vi-VN')} VNĐ</strong>
                </span>
                {flightNumber && (
                  <>
                    <span className="text-slate-700">|</span>
                    <span className="text-xs text-slate-300 font-medium">{language === 'vi' ? 'Chuyến bay:' : 'Flight:'} <strong className="text-white">{flightNumber}</strong></span>
                  </>
                )}
              </div>
            </div>

            {/* Cryptographic SSL Booking Secure block */}
            <div className="p-4 bg-slate-955 text-white rounded-2xl border border-slate-850 space-y-3 text-left">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{language === 'vi' ? 'MÃ HÓA BẢO MẬT SSL 256-BIT HOÀN TOÀN TỰ ĐỘNG' : '256-BIT SSL ENCRYPTED GATEWAY ONLINE'}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {language === 'vi'
                  ? 'Khi nhấp nút khởi tạo, hệ thống sẽ tự động cấu hình lịch trình của quý khách lên dịch vụ điện toán đám mây. Chúng tôi cam kết bảo vệ hoàn toàn thông tin cá nhân của hành khách. Đảm bảo dữ liệu không bị chia sẻ cho bên thứ ba ngoài mục đích phối kiểm của tài xế đưa đón.'
                  : 'Upon tapping secure book, the engine routes your specifications into a secure memory buffer. Our database complies with personal encryption protocols, ensuring driver dispatching matches the strict confidentiality acts.'}
              </p>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="rounded text-amber-500 focus:ring-amber-500 h-4.5 w-4.5 bg-slate-900 border-slate-800"
                />
                <span className="text-[10px] text-slate-300 leading-normal">
                  {language === 'vi'
                    ? 'Tôi đã rà soát kỹ thông tin di chuyển cá nhân và hoàn toàn đồng ý đón xe theo bảng giá niêm yết trọn gói cực kỳ ưu đãi của công ty.'
                    : 'I certify that all details correspond perfectly, and commit to the displayed flat fare without changes.'}
                </span>
              </label>
            </div>

            {/* Actions submit */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-3 bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800 font-bold rounded-xl text-sm flex items-center space-x-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{language === 'vi' ? 'Quay Lại Bước 2' : 'Back to Step 2'}</span>
              </button>

              <button
                type="submit"
                id="submit-booking-secure-btn"
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl shadow-xl shadow-emerald-600/25 flex items-center space-x-2 text-sm uppercase tracking-wider"
              >
                <Shield className="h-4.5 w-4.5 animate-pulse" />
                <span>{language === 'vi' ? 'Ký Hoàn Tất Đặt Xe' : 'Confirm & Secure Book'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
