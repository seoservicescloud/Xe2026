import { useState, FormEvent } from 'react';
import { Search, Loader2, Clock, CheckCircle, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Booking } from '../types';

export default function BookingTracker() {
  const { t, routes, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [foundBookings, setFoundBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert(language === 'vi' 
        ? 'Vui lòng nhập Mã số vé (DNAH-xxxx) hoặc Số điện thoại để tiếp tục.' 
        : 'Please specify your private E-Ticket code (DNAH-xxxx) or Phone number to look up.');
      return;
    }

    setLoading(true);
    setHasSearched(true);

    // Simulate database lookup latency for a luxury responsive feeling
    setTimeout(() => {
      const stored = localStorage.getItem('danang_hoian_bookings');
      let bookingsList: Booking[] = [];
      if (stored) {
        try {
          bookingsList = JSON.parse(stored);
        } catch (err) {
          bookingsList = [];
        }
      }

      // Filter matched by Phone or ID
      const cleanedQuery = searchTerm.trim().toLowerCase();
      const results = bookingsList.filter((b) => 
        b.id.toLowerCase().includes(cleanedQuery) || 
        b.phone.includes(cleanedQuery) ||
        b.customerName.toLowerCase().includes(cleanedQuery)
      );

      setFoundBookings(results);
      setLoading(false);
    }, 700);
  };

  const handleCancelBooking = (bookingId: string) => {
    const message = language === 'vi'
      ? `Bạn có chắc chắn muốn phát đơn yêu cầu HỦY lịch đặt xe ${bookingId}? Phí hoàn hủy là 0đ.`
      : `Are you absolutely sure you want to cancel booking ticket ${bookingId}? Cancellation fee is 0 VND.`;
      
    const confirmation = window.confirm(message);
    if (!confirmation) return;

    const stored = localStorage.getItem('danang_hoian_bookings');
    if (stored) {
      try {
        const bookingsList: Booking[] = JSON.parse(stored);
        const index = bookingsList.findIndex(b => b.id === bookingId);
        if (index !== -1) {
          bookingsList[index].status = 'cancelled';
          localStorage.setItem('danang_hoian_bookings', JSON.stringify(bookingsList));
          
          // Re-update found results list state
          setFoundBookings(prev => 
            prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b)
          );
          alert(language === 'vi'
            ? 'Khởi tạo yêu cầu hủy vé thành công! Tổng đài sẽ gọi điện xác thực lại trong ít phút.'
            : 'Cancellation request processed successfully! Dispatchers will reach out within minutes.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 text-slate-800 text-left" id="tracker-module">
      {/* Tracker Intro and Lookups */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <span className="bg-amber-500/10 p-2 rounded-xl text-amber-500">
              <Search className="h-5 w-5" />
            </span>
            <span>
              {language === 'vi' ? 'Tra Cứu Tiến Độ & Điều Tài Xế Trực Tuyến' : 'Real-Time Dispatcher & Booking Tracker'}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {language === 'vi'
              ? 'Nhập Mã Đặt Vé (VD: DNAH-3029) hoặc Số điện thoại để tra cứu trạng thái hành trình, tên lái xe, số điện thoại tài xế và biển kiểm soát của phương tiện chuẩn bị đón đoàn.'
              : 'Enter Ticket ID (e.g. DNAH-3029) or registered Phone to trace active dispatch status, coordinate your private driver, and verify license plates.'}
          </p>
        </div>

        {/* Searching Form Frame */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder={language === 'vi' ? 'Nhập Mã số bảo mật xe đón hoặc Số điện thoại...' : 'Enter your Ticket ID or registered Phone...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 font-medium"
            id="tracker-search-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl transition flex items-center justify-center space-x-2 disabled:bg-slate-705 disabled:text-slate-400"
            id="tracker-search-btn"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                <span>{language === 'vi' ? 'Đang Đọc...' : 'Verifying...'}</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>{language === 'vi' ? 'Tìm Kiếm Vé' : 'Query Safe ID'}</span>
              </>
            )}
          </button>
        </form>

        {/* Informative Guidance */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="flex items-start space-x-2 text-xs">
            <span className="text-amber-500 text-sm">✓</span>
            <div>
              <span className="font-bold text-slate-900 block">{language === 'vi' ? 'Miễn Phí Hủy Vé' : 'Zero Cancellation Fee'}</span>
              <p className="text-slate-500">
                {language === 'vi' ? 'Đơn phương hủy vé từ 2 tiếng trước giờ đi hoàn toàn không mất phụ thu.' : 'Cancel up to 2 hours prior with absolutely no deposit loss.'}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2 text-xs">
            <span className="text-amber-500 text-sm">✓</span>
            <div>
              <span className="font-bold text-slate-900 block">{language === 'vi' ? 'Thông Tin Tài Xế' : 'Driver Matching'}</span>
              <p className="text-slate-500">
                {language === 'vi' ? 'Được phân bổ tự động, chụp hình gởi liên hệ biển số qua Zalo/Viber.' : 'Driver profile and vehicle photo pushed directly to your Zalo/WhatsApp.'}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2 text-xs">
            <span className="text-amber-500 text-sm">✓</span>
            <div>
              <span className="font-bold text-slate-900 block">{language === 'vi' ? 'Tổng Đài 24/7 Hotline' : '24/7 Helpline Support'}</span>
              <p className="text-slate-500">
                {language === 'vi' ? 'Bất kể thời gian đêm muộn, đường bay delay đều được túc trực phục vụ.' : 'Flight delayed or late arrival? Our dispatch handles schedules automatically.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MATCHED RESULTS LIST */}
      <div className="mt-10" id="tracker-results">
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <span className="text-xs font-semibold text-slate-400">
              {language === 'vi' ? 'Đang thực hiện truy xuất cơ sở dữ liệu...' : 'Connecting with local encrypted backups...'}
            </span>
          </div>
        )}

        {!loading && hasSearched && foundBookings.length === 0 && (
          <div className="bg-amber-500/5 text-slate-800 border border-amber-500/20 rounded-2xl p-6 text-center space-y-3">
            <h4 className="text-base font-bold">{language === 'vi' ? 'Không tìm thấy thông tin phù hợp!' : 'Ticket Record Not Found!'}</h4>
            <p className="text-sm text-slate-650 max-w-lg mx-auto">
              {language === 'vi'
                ? `Không tìm thấy biên lai nào trùng với từ khóa "${searchTerm}". Vui lòng rà soát ký số điện thoại hoặc mã đặt vé.`
                : `No active tickets match query "${searchTerm}". Please double check your registered mobile or DNAH code.`}
            </p>
          </div>
        )}

        {!loading && hasSearched && foundBookings.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-black text-slate-400">
              {language === 'vi' ? `Tìm thấy (${foundBookings.length}) Lịch trình liên quan` : `Matched (${foundBookings.length}) Active Itineraries`}
            </h4>
            
            {foundBookings.map((booking) => {
              const matchedRoute = routes.find(r => r.id === booking.id) || routes[0];
              
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden text-slate-700"
                  id={`tracker-item-${booking.id}`}
                >
                  {/* Status Indicator Bar */}
                  <div className={`p-4 text-white flex items-center justify-between ${
                    booking.status === 'pending' ? 'bg-amber-505 bg-amber-500' :
                    booking.status === 'confirmed' ? 'bg-blue-600' :
                    booking.status === 'assigned' ? 'bg-emerald-600' :
                    booking.status === 'completed' ? 'bg-slate-600' : 'bg-rose-500'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-sm uppercase tracking-wider">{language === 'vi' ? 'Mã Vé' : 'Ticket ID'}: {booking.id}</span>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-white font-mono">{booking.securedHash}</span>
                    </div>

                    <div className="flex items-center space-x-1 font-black text-xs uppercase tracking-wider">
                      {booking.status === 'pending' && <><Clock className="h-4 w-4" /> <span>{language === 'vi' ? 'Đang phê duyệt' : 'Pending dispatch'}</span></>}
                      {booking.status === 'confirmed' && <><CheckCircle className="h-4 w-4" /> <span>{language === 'vi' ? 'Đã duyệt lịch hẹn' : 'Confirmed'}</span></>}
                      {booking.status === 'assigned' && <><Car className="h-4 w-4" /> <span>{language === 'vi' ? 'Đang di chuyển' : 'Driver Assigned'}</span></>}
                      {booking.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                      {booking.status === 'cancelled' && <span>{language === 'vi' ? 'Đã hủy chuyến' : 'Cancelled'}</span>}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 grid md:grid-cols-12 gap-6">
                    
                    {/* Passenger Specs (4 columns) */}
                    <div className="md:col-span-4 space-y-4 md:border-r border-slate-100 md:pr-4">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">{language === 'vi' ? 'Khách Du Lịch' : 'Passenger Name'}</span>
                        <span className="text-sm font-bold text-slate-800">{booking.customerName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">{language === 'vi' ? 'Số Điện Thoại' : 'Phone'}</span>
                        <span className="text-sm font-bold text-slate-800">{booking.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold font-mono">{language === 'vi' ? 'Dòng Xe Đặt' : 'Vehicle Choice'}</span>
                        <span className="text-xs font-bold text-amber-600 block uppercase mt-0.5 animate-pulse">
                          {booking.vehicleType === '4-seat' 
                            ? (language === 'vi' ? '🚗 Xe Sedan 4 Chố' : '🚗 4-Seat Sedan') 
                            : booking.vehicleType === '7-seat' 
                            ? (language === 'vi' ? '🚙 Xe SUV 7 Chỗ' : '🚙 7-Seat SUV') 
                            : booking.vehicleType === '16-seat' 
                            ? (language === 'vi' ? '🚐 Minibus 16 Chỗ' : '🚐 16-Seat Coach') 
                            : (language === 'vi' ? '✨ VIP Limousine' : '✨ VIP Limousine')}
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">{language === 'vi' ? 'Giá cước trọn gói' : 'Guaranteed Price'}</span>
                        <span className="text-lg font-black text-slate-900">{booking.estimatedCost.toLocaleString('vi-VN')} đ</span>
                        <span className="text-[9px] text-emerald-600 block">{language === 'vi' ? 'Bao gồm BOT cầu đường sân bay' : 'Airport parking and toll taxes included'}</span>
                      </div>
                    </div>

                    {/* Routing Details (5 columns) */}
                    <div className="md:col-span-5 space-y-4">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">{language === 'vi' ? 'Lịch Hẹn Đón Khách' : 'Scheduled Arrival'}</span>
                        <span className="text-xs font-bold text-slate-800">
                          {booking.pickupTime} - {language === 'vi' ? 'Ngày' : 'Date'} {booking.pickupDate}
                        </span>
                        {booking.isRoundTrip && booking.returnDate && (
                          <span className="text-[10px] text-emerald-600 block mt-0.5">
                            {language === 'vi' 
                              ? `Khứ hồi về ngày: ${booking.returnDate} lúc ${booking.returnTime}` 
                              : `Roundtrip Back: ${booking.returnDate} at ${booking.returnTime}`}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">{language === 'vi' ? 'Điểm Đón' : 'Curbside Pickup'}</span>
                          <span className="text-xs text-slate-700 block mt-0.5">📌 {booking.pickupLocation}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">{language === 'vi' ? 'Điểm Trả' : 'Curbside Drop-off'}</span>
                          <span className="text-xs text-slate-700 block mt-0.5">📍 {booking.dropoffLocation}</span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[11px] text-slate-500">
                           {language === 'vi' ? `Ghi chú: "${booking.notes}"` : `Special Note: "${booking.notes}"`}
                        </div>
                      )}
                    </div>

                    {/* Driver details / operations actions (3 columns) */}
                    <div className="md:col-span-3 space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-black tracking-wider">{language === 'vi' ? 'Thông Tin Tài Xế' : 'Driver & Vehicle'}</span>
                        {booking.status === 'assigned' && booking.driverName ? (
                          <div className="space-y-1 mt-2 text-xs">
                            <span className="font-extrabold text-slate-850 block">👤 {booking.driverName}</span>
                            <span className="text-slate-655 block">SĐT: {booking.driverPhone}</span>
                            <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black font-mono block text-center mt-1">
                              {booking.carPlate}
                            </span>
                          </div>
                        ) : booking.status === 'cancelled' ? (
                          <p className="text-[11px] text-rose-500 mt-2 font-medium">
                            {language === 'vi' ? 'Vé này đã bị hủy bỏ thành công.' : 'This booking request is cancelled.'}
                          </p>
                        ) : (
                          <p className="text-[11px] text-slate-550 mt-2 italic leading-relaxed">
                            {language === 'vi'
                              ? 'Bác tài sẽ được hệ thống điều độ và cập nhật trước giờ đón 2 tiếng.'
                              : 'Private driver details and plates will match and load here 2 hours prior.'}
                          </p>
                        )}
                      </div>

                      {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                        <div className="pt-2 border-t border-slate-200">
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="w-full py-1.5 px-3 bg-white hover:bg-rose-50 text-rose-600 border border-slate-100 hover:border-rose-200 rounded-lg text-[11px] font-bold uppercase transition"
                          >
                            {language === 'vi' ? 'Yêu Cầu Hủy Xe' : 'Cancel Reservation'}
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
