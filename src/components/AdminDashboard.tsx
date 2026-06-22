import { useState, useEffect, FormEvent } from 'react';
import { ShieldCheck, Users, TrendingUp, Calendar, Trash2, Edit2, CheckCircle2, RotateCw, PlusCircle, UserCheck } from 'lucide-react';
import { Booking, BookingStatus } from '../types';
import { ROUTES } from '../data';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  
  // Edit mode driver state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [carPlate, setCarPlate] = useState('');

  // Fetch bookings lists
  const loadBookings = () => {
    const stored = localStorage.getItem('danang_hoian_bookings');
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (err) {
        setBookings([]);
      }
    } else {
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin' || passcode === '1234' || passcode === '') {
      setIsAuthenticated(true);
    } else {
      alert('Mã PIN quản trị viên không chính xác (mặc định để trống hoặc nhập "admin" / "1234").');
    }
  };

  // Seed realistic bookings for demonstration
  const handleSeedMockData = () => {
    const mockBookings: Booking[] = [
      {
        id: 'DNAH-8025',
        customerName: 'Trần Minh Hoàng',
        phone: '0905999888',
        email: 'hoang.tran@gmail.com',
        pickupLocation: 'Sân bay Đà Nẵng (Ga Quốc Tế)',
        dropoffLocation: 'Resort Shilla Monogram Hội An',
        pickupDate: '2026-06-25',
        pickupTime: '14:30',
        isRoundTrip: false,
        vehicleType: '4-seat',
        estimatedCost: 250000,
        status: 'assigned',
        flightNumber: 'VJ-521',
        driverName: 'Bác tài Lê Anh Tuấn',
        driverPhone: '0905.777.888',
        carPlate: '43A-688.88',
        createdAt: new Date().toISOString(),
        securedHash: 'SECURE-9Z2X1A-SSL'
      },
      {
        id: 'DNAH-4412',
        customerName: 'Ms. Elizabeth Watson',
        phone: '0917333222',
        email: 'elizabeth-watson@yahoo.com',
        pickupLocation: 'Khách sạn Novotel Đà Nẵng',
        dropoffLocation: 'Khu du lịch Bà Nà Hills (Cổng cáp treo)',
        pickupDate: '2026-06-26',
        pickupTime: '08:00',
        isRoundTrip: true,
        vehicleType: '7-seat',
        estimatedCost: 650000,
        status: 'pending',
        notes: 'Cần tài xế giao tiếp được tiếng Anh cơ bản.',
        createdAt: new Date().toISOString(),
        securedHash: 'SECURE-1F4Y5E-SSL'
      },
      {
        id: 'DNAH-5091',
        customerName: 'Nguyễn Thùy Linh (Đoàn Du Lịch Hải Phòng)',
        phone: '0983222111',
        email: 'thuylinhhp@gmail.com',
        pickupLocation: 'Sân bay nội địa Đà Nẵng',
        dropoffLocation: 'Khách sạn Silk Sense Resort Hội An',
        pickupDate: '2026-06-27',
        pickupTime: '11:15',
        isRoundTrip: false,
        vehicleType: '16-seat',
        estimatedCost: 550000,
        status: 'confirmed',
        flightNumber: 'VN-115',
        createdAt: new Date().toISOString(),
        securedHash: 'SECURE-3K8J9R-SSL'
      }
    ];

    localStorage.setItem('danang_hoian_bookings', JSON.stringify(mockBookings));
    setBookings(mockBookings);
    alert('Đã khôi phục dữ liệu mẫu thành công với 3 hóa đơn chân thực!');
  };

  const handleUpdateStatus = (id: string, newStatus: BookingStatus) => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    localStorage.setItem('danang_hoian_bookings', JSON.stringify(updated));
    setBookings(updated);
  };

  const handleStartEditingDriver = (b: Booking) => {
    setEditingId(b.id);
    setDriverName(b.driverName || 'Lái xe Nguyễn Văn Tài');
    setDriverPhone(b.driverPhone || '0905.888.999');
    setCarPlate(b.carPlate || '43B-099.99');
  };

  const handleSaveDriverInfo = (id: string) => {
    if (!driverName || !driverPhone || !carPlate) {
      alert('Vui lòng nhập đầy đủ Tên bác tài, SĐT và Biển kiểm soát xe.');
      return;
    }

    const updated = bookings.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          driverName,
          driverPhone,
          carPlate,
          status: 'assigned' as const
        };
      }
      return b;
    });

    localStorage.setItem('danang_hoian_bookings', JSON.stringify(updated));
    setBookings(updated);
    setEditingId(null);
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm(`Xoá vĩnh viễn lịch hẹn ${id} khỏi hệ thống?`)) {
      const updated = bookings.filter((b) => b.id !== id);
      localStorage.setItem('danang_hoian_bookings', JSON.stringify(updated));
      setBookings(updated);
    }
  };

  // Metrics configurations
  const totalRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((val, b) => val + b.estimatedCost, 0);

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const assignedCount = bookings.filter((b) => b.status === 'assigned').length;

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-slate-800 text-left" id="admin-login-screen">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-amber-500 text-slate-950 p-3 rounded-2xl inline-flex shadow-lg">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 block">Cổng Điều Hành Lịch Trình Xe</h3>
            <p className="text-xs text-slate-500">
              Khu vực dành riêng cho quản trị viên, tài xế và nhân viên kinh doanh phê duyệt điều phối khách đi Hội An, Bà Nà Hills.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Mã Pin Sân Bay (Mặc định: bỏ trống để đăng nhập nhanh)</label>
              <input
                type="password"
                placeholder="Nhập mã pin hoặc 'admin'..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 font-bold tracking-widest"
                id="admin-passcode"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-amber-400 font-bold rounded-xl transition shadow-lg text-sm uppercase tracking-wider"
              id="admin-login-btn"
            >
              Vào Bảng Điều Hành
            </button>
          </form>

          <div className="p-3 bg-amber-500/10 rounded-xl text-[10px] text-slate-600 text-center border border-amber-500/20">
            💡 Bạn có thể để trống và bấm <strong>Vào Bảng Điều Hành</strong> ngay lập tức để trải nghiệm tính năng phân phối xe đón.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 text-slate-800 text-left" id="admin-board-content">
      
      {/* Top dashboard navigation panel */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
            <span className="text-emerald-500">●</span>
            <span>Hệ Thống Phối Xe & Báo Cáo Tài Chính</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Quản lý duyệt đơn hàng, chỉ định số xe, liên hệ tài xế đón trả khách đi sảnh Đà Nẵng đi Hội An.</p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleSeedMockData}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow-md"
            id="seed-mock-data-btn"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Khôi phục dữ liệu mẫu</span>
          </button>
          
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition"
            id="admin-logout-btn"
          >
            Thoát quản trị
          </button>
        </div>
      </div>

      {/* Metric summary boxes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Bookings sum */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Doanh Thu Dự Kiến</span>
            <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{(totalRevenue).toLocaleString('vi-VN')} đ</p>
          <span className="text-[10px] text-emerald-500 mt-1 block">Không tính cuốc xe đã huỷ</span>
        </div>

        {/* Count pending info */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Tổng Cuốc Đặt</span>
            <Calendar className="h-4.5 w-4.5 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{bookings.length} cuộc gọi</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Bảo lưu lịch sử tối đa</span>
        </div>

        {/* Active awaiting approval */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">Chờ Duyệt Đơn</span>
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{pendingCount} cuốc xe</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Khách đang đợi gọi Zalo</span>
        </div>

        {/* Fleet assigned */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Đã Có Tài Xế</span>
            <Users className="h-4.5 w-4.5 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{assignedCount} xe chạy</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Biển số đã được khóa lồng</span>
        </div>

      </div>

      {/* Bookings operator List panel */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
          <h4 className="font-extrabold text-sm sm:text-base">Màn Hình Điều Phối Xe Trình Khách Theo Thời Gian Thực</h4>
          <span className="text-xs text-slate-400">Điều chỉnh tức thì, dữ liệu tự đông lưu lại</span>
        </div>

        {bookings.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <p className="text-slate-500 text-sm">Chưa có lịch đặt xe nào được lưu trong hệ thống!</p>
            <button
              onClick={handleSeedMockData}
              className="px-5 py-2 bg-slate-900 text-amber-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition"
            >
              Tải mẫu Cuốc Đón Tiễn Sân Bay
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f8fafc] text-[11px] uppercase tracking-wider font-extrabold text-slate-400 border-b border-slate-100 text-left">
                <tr>
                  <th className="px-6 py-4">Mã Số / Khách Hàng</th>
                  <th className="px-6 py-4">Tuyến Đi / Vị Trí Đón Trả</th>
                  <th className="px-6 py-4">Thời Gian Đặt Chuyến</th>
                  <th className="px-6 py-4">Dòng Xe / Chi Phí</th>
                  <th className="px-6 py-4">Tài Xế & Xe</th>
                  <th className="px-6 py-4">Trạng Thái / Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {bookings.map((booking) => {
                  const isEditing = editingId === booking.id;
                  
                  return (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      
                      {/* Cust column */}
                      <td className="px-6 py-4 whitespace-nowrap space-y-1">
                        <span className="text-xs bg-slate-100 font-bold text-slate-600 px-2 py-0.5 rounded block w-max">
                          {booking.id}
                        </span>
                        <strong className="text-slate-900 block font-bold truncate max-w-[150px]">{booking.customerName}</strong>
                        <span className="text-xs block text-slate-500 select-all">{booking.phone}</span>
                      </td>

                      {/* Route Location col */}
                      <td className="px-6 py-4 text-xs space-y-1 max-w-sm">
                        <span className="font-bold text-teal-700 block">
                          {booking.id.includes('bana') ? 'Bà Nà Hills khứ hồi' : 'Đà Nẵng ↔ Hội An Sân Bay'}
                        </span>
                        <span className="text-slate-500 block truncate" title={booking.pickupLocation}>
                          📌 <strong>Đón:</strong> {booking.pickupLocation}
                        </span>
                        <span className="text-slate-500 block truncate" title={booking.dropoffLocation}>
                          📍 <strong>Trả:</strong> {booking.dropoffLocation}
                        </span>
                        {booking.flightNumber && (
                          <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-100 px-1.5 py-0.5 rounded font-bold uppercase w-max block">
                            Chuyến bay: {booking.flightNumber}
                          </span>
                        )}
                      </td>

                      {/* Schedule datetime col */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs space-y-1">
                        <strong className="text-indigo-600 block">{booking.pickupTime}</strong>
                        <span className="text-slate-500 block">{booking.pickupDate}</span>
                        {booking.isRoundTrip && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded block w-max font-semibold">
                            Khứ Hồi 2 chiều
                          </span>
                        )}
                      </td>

                      {/* Vehicles and costs */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs space-y-1">
                        <span className="font-bold uppercase text-slate-800 bg-slate-100 px-2 py-0.5 rounded block w-max">
                          {booking.vehicleType === '4-seat' ? '🚗 4 Chỗ' : booking.vehicleType === '7-seat' ? '🚙 7 Chỗ' : booking.vehicleType === '16-seat' ? '🚐 16 Chỗ' : '👑 Limousine'}
                        </span>
                        <strong className="text-amber-600 text-sm block">{(booking.estimatedCost).toLocaleString('vi-VN')} đ</strong>
                      </td>

                      {/* Driver Assign edit col */}
                      <td className="px-6 py-4 text-xs">
                        {isEditing ? (
                          <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <input
                              type="text"
                              value={driverName}
                              onChange={(e) => setDriverName(e.target.value)}
                              placeholder="Tên lái xe..."
                              className="block w-full p-1 bg-white border border-slate-200 rounded text-xs"
                            />
                            <input
                              type="text"
                              value={driverPhone}
                              onChange={(e) => setDriverPhone(e.target.value)}
                              placeholder="Số ĐT tài xế..."
                              className="block w-full p-1 bg-white border border-slate-200 rounded text-xs"
                            />
                            <input
                              type="text"
                              value={carPlate}
                              onChange={(e) => setCarPlate(e.target.value)}
                              placeholder="BKS: 43A-x.xxx"
                              className="block w-full p-1 bg-white border border-slate-200 rounded text-xs font-mono font-bold uppercase"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveDriverInfo(booking.id)}
                              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold py-1 px-1.5 rounded transition"
                            >
                              Xong & Khóa Xe
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {booking.driverName ? (
                              <>
                                <strong className="text-slate-800 block text-xs">{booking.driverName}</strong>
                                <span className="text-[10px] text-slate-500 block">SĐT: {booking.driverPhone}</span>
                                <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black font-mono inline-block mt-1">
                                  {booking.carPlate}
                                </span>
                              </>
                            ) : (
                              <span className="text-xs text-rose-500 italic font-medium">Chưa điều phối tài xế</span>
                            )}
                            <button
                              onClick={() => handleStartEditingDriver(booking)}
                              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold underline block mt-2.5"
                            >
                              {booking.driverName ? 'Thay đổi tài xế' : '✏ Giao xe ngay'}
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Status / Quick Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs space-y-2">
                        {/* Drop status changes */}
                        <select
                          value={booking.status}
                          onChange={(e) => handleUpdateStatus(booking.id, e.target.value as BookingStatus)}
                          className="block p-1 bg-white border border-slate-200 rounded text-xs font-bold cursor-pointer"
                        >
                          <option value="pending">Chờ xác nhận</option>
                          <option value="confirmed">Đã duyệt lịch</option>
                          <option value="assigned">Đã khóa tài xế</option>
                          <option value="completed">Đã hoàn thành</option>
                          <option value="cancelled">Hủy chuyến</option>
                        </select>

                        {/* Delete history */}
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="flex items-center space-x-1 hover:text-rose-600 text-slate-400 text-[11px] font-semibold transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Xoá lưu trữ</span>
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
