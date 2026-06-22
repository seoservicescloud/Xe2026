import React, { createContext, useContext, useState, useEffect } from "react";
import { Vehicle, Route, Destination } from "../types";

export type Language = "vi" | "en";

// Define the shape of our general translation dictionary
export interface Dictionary {
  promoBanner: string;
  navbar: {
    home: string;
    routes: string;
    fleet: string;
    booking: string;
    tracker: string;
    admin: string;
    zaloCall: string;
    bookNow: string;
  };
  trustBadges: {
    badge1Title: string;
    badge1Desc: string;
    badge2Title: string;
    badge2Desc: string;
    badge3Title: string;
    badge3Desc: string;
  };
  testimonials: {
    title: string;
    heading: string;
    subtitle: string;
  };
  hero: {
    pillsText: string;
    titleFirst: string;
    titleHighlight: string;
    titleLast: string;
    subtitle: string;
    btnRates: string;
    tabQuickSearch: string;
    tabCustomRoute: string;
    formFrom: string;
    formTo: string;
    formVehicle: string;
    btnEstimate: string;
    features: string[];
    placeholderFrom: string;
    placeholderTo: string;
  };
  weather: {
    title: string;
    subtitle: string;
    btnRefresh: string;
    humidity: string;
    windSpeed: string;
    forecastLabel: string;
    updated: string;
    source: string;
    fallbackWarning: string;
  };
  faq: {
    pill: string;
    heading: string;
    subtitle: string;
    helpHeading: string;
    helpDesc: string;
    zaloCta: string;
  };
  footer: {
    desc: string;
    services: string;
    support: string;
    contact: string;
    address: string;
    workHours: string;
    copyright: string;
    tagline: string;
  };
  bookingForm: {
    step1: string;
    step2: string;
    step3: string;
    selectRoute: string;
    selectRoutePlaceholder: string;
    oneWay: string;
    roundTrip: string;
    routeDetails: string;
    distance: string;
    duration: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    priceEst: string;
    priceDisclaimer: string;
    nextStep: string;
    prevStep: string;
    custTitle: string;
    custSubtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    flightCode: string;
    flightPlaceholder: string;
    addonsTitle: string;
    addonBaby: string;
    addonBabyDesc: string;
    addonEnglish: string;
    addonEnglishDesc: string;
    notesLabel: string;
    notesPlaceholder: string;
    submitBooking: string;
    successTitle: string;
    successSubtitle: string;
    successDesc: string;
    bookingCode: string;
    copyCode: string;
    copied: string;
    trackStatusCta: string;
    errorFields: string;
  };
  tracker: {
    title: string;
    subtitle: string;
    phoneLabel: string;
    phonePlaceholder: string;
    codeLabel: string;
    codePlaceholder: string;
    btnSearch: string;
    btnReset: string;
    noResult: string;
    detailsTitle: string;
    statusLabel: string;
    routeLabel: string;
    vehicleLabel: string;
    scheduleLabel: string;
    totalCostLabel: string;
    customerLabel: string;
    noteLabel: string;
    timelineTitle: string;
    created: string;
    confirmed: string;
    assigned: string;
    ongoing: string;
    completed: string;
    cancelled: string;
    statusPending: string;
    statusConfirmed: string;
    statusAssigned: string;
    statusCompleted: string;
    statusCancelled: string;
  };
}

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
  vehicles: Vehicle[];
  routes: Route[];
  destinations: Destination[];
  faqs: { q: string; a: string }[];
  testimonialsList: { name: string; role: string; avatar: string; comment: string }[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const viDictionary: Dictionary = {
  promoBanner: "Khuyến mãi đặc biệt: Giảm ngay 10% cho tất cả các cuốc đặt khứ hồi Đà Nẵng ↔ Hội An từ hôm nay!",
  navbar: {
    home: "Trang Chủ",
    routes: "Tuyến Đường Du Lịch",
    fleet: "Đội Xe 4-16 Chỗ",
    booking: "Đặt Xe Trực Tuyến",
    tracker: "Tra Cứu Lịch Hẹn",
    admin: "Quản Trị Viên",
    zaloCall: "Zalo / Gọi: 0905.123.456",
    bookNow: "Đặt Xe Ngay"
  },
  trustBadges: {
    badge1Title: "Đánh Giá Phản Hồi 5 Sao",
    badge1Desc: "Được 5000+ du khách trong và ngoài nước tin cậy chọn lựa hàng đầu.",
    badge2Title: "Mã Hóa SSL Bảo Mật Tuyệt Đối",
    badge2Desc: "Dữ liệu thông tin cá nhân và hành trình đi lại của khách luôn bảo mật.",
    badge3Title: "Chăm Sóc Chu Đáo 24/7",
    badge3Desc: "Hỗ trợ khẩn cấp, theo dõi giờ bay tại ga nội địa/ga quốc tế liên tục."
  },
  testimonials: {
    title: "Trải Nghiệm Khách Hàng",
    heading: "Ý Kiến Của Các Hành Khách Đã Đi Xe",
    subtitle: "Xem nhận xét khách quan của cộng đồng khách du lịch trong nước và quốc tế."
  },
  hero: {
    pillsText: "Giá Trọn Gói - Không Ẩn Phí",
    titleFirst: "Thuê Xe Du Lịch",
    titleHighlight: "Đà Nẵng ↔ Hội An",
    titleLast: "Chuyên Nghiệp",
    subtitle: "Dẫn đầu chất lượng đưa đón sân bay Đà Nẵng và các điểm di sản miền Trung. Xe riêng sang trọng đời mới, lái xe an toàn chu đáo, phục vụ 24/7.",
    btnRates: "Xem Bảng Giá Từng Tuyến",
    tabQuickSearch: "Ước Tính Nhanh Chi Phí",
    tabCustomRoute: "Tìm Xe Theo Tuyến Đường",
    formFrom: "Điểm Đón (Địa chỉ từ Đà Nẵng...)",
    formTo: "Điểm Đến (Khách sạn ở Hội An...)",
    formVehicle: "Chọn Dòng Xe Mong Muốn",
    btnEstimate: "TÍNH CƯỚC & ĐẶT XE NGAY",
    features: [
      "Không phóng nhanh vượt ẩu",
      "Đón khách đúng giờ hẹn 100%",
      "Hỗ trợ hủy chuyến miễn phí",
      "Mở cửa & xách hành lý chu đáo"
    ],
    placeholderFrom: "Ví dụ: Sân bay Đà Nẵng, Khách sạn Novotel...",
    placeholderTo: "Ví dụ: Phố cổ Hội An, Khách sạn Vinpearl Resort..."
  },
  weather: {
    title: "Thời tiết địa phương",
    subtitle: "Hỗ trợ lên kế hoạch di chuyển",
    btnRefresh: "Cập nhật",
    humidity: "Độ ẩm",
    windSpeed: "Sức gió",
    forecastLabel: "Dự báo ngày mai",
    updated: "Cập nhật",
    source: "Nguồn",
    fallbackWarning: "* Hiện đang sử dụng dữ liệu dự phòng cục bộ"
  },
  faq: {
    pill: "Giải Đáp Thắc Mắc Khách Hàng",
    heading: "Câu Hỏi Thường Gặp Khi Thuê Xe Du Lịch",
    subtitle: "Mọi thắc mắc của quý khách về quy trình đón tiễn sảnh sân bay Đà Nẵng, giá cước xe 4 - 16 chỗ và quyền lợi khi tham quan du lịch đều được giải đáp chi tiết dưới đây.",
    helpHeading: "Cần thêm giải đáp khẩn cấp?",
    helpDesc: "Đội ngũ tư vấn viên sẵn sàng trả lời trực tiếp các câu hỏi của bạn qua số Hotline/Zalo.",
    zaloCta: "Nhắn Tin Zalo Tư Vấn Miễn Phí"
  },
  footer: {
    desc: "Đơn vị cung cấp giải pháp vận tải hạng sang, đưa đón sân bay Đà Nẵng - Hội An chất lượng cao. Đảm bảo an tâm tuyệt đối, giá cước bình ổn, hỗ trợ tận tình suốt chặng.",
    services: "Dịch Vụ Đưa Đón",
    support: "Hỗ Trợ Khách Hàng",
    contact: "Thông Tin Liên Hệ",
    address: "Địa chỉ: 123 Nguyễn Văn Linh, Quận Hải Châu, TP. Đà Nẵng",
    workHours: "Giờ làm việc: Hoạt động 24/7 (Kể cả lễ Tết)",
    copyright: "© 2026 Danang Hoian Chauffeur. Tất cả quyền được bảo lưu.",
    tagline: "Xe riêng đưa đón du lịch chuẩn VIP miền Trung Việt Nam."
  },
  bookingForm: {
    step1: "Hành Trình & Thời Gian",
    step2: "Thông Tin Liên Hệ",
    step3: "Hoàn Tất Lịch Hẹn",
    selectRoute: "Chọn tuyến đường muốn di chuyển",
    selectRoutePlaceholder: "Chọn lộ trình di chuyển để tính giá...",
    oneWay: "Hành Trình Một Chiều",
    roundTrip: "Hành Trình Khứ Hồi (10% Off)",
    routeDetails: "Chi Tiết Hành Trình Chọn Sẵn",
    distance: "Quãng đường khoảng",
    duration: "Thời gian di chuyển ước tính",
    pickupDate: "Ngày Đón Khách",
    pickupTime: "Giờ Đón Khách",
    returnDate: "Ngày Về (Khứ hồi)",
    returnTime: "Giờ Xe Đón Chiều Về",
    priceEst: "Ước tính giá cước trọn gói",
    priceDisclaimer: "* Mức giá ước tính chi tiết đầy đủ xăng xe, lương lái xe và chi phí đỗ bến/vào cổng sân bay Đà Nẵng, tuyệt đối không tính phụ phí xe chạy rỗng.",
    nextStep: "Tiếp Tục Bước 2",
    prevStep: "Quay Lại Bước 1",
    custTitle: "Hành Lý & Liên Hệ",
    custSubtitle: "Vui lòng nhập các thông tin dưới đây để tài xế dễ dàng liên lạc khi đáp cánh đón khách",
    fullName: "Họ Và Tên Hành Khách",
    fullNamePlaceholder: "Nhập đầy đủ tên người đi xe...",
    phone: "Số Điện Thoại Nhận SMS / Zalo",
    phonePlaceholder: "Nhập số điện thoại di động liên hệ...",
    flightCode: "Mã Hiệu Chuyến Bay (Nếu có)",
    flightPlaceholder: "Ví dụ: VN123, VJ245 (Tài xế tự check lịch delay)",
    addonsTitle: "Tiện ÍCH Đi Kèm Cộng Thêm",
    addonBaby: "Ghế Ô Tô Cho Em Bé (+50.000đ)",
    addonBabyDesc: "Đảm bảo trẻ em đi đường dài thư thái an toàn.",
    addonEnglish: "Tài Xế Giao Tiếp Tiếng Anh (+100.000đ)",
    addonEnglishDesc: "Lý tưởng cho khách du lịch nước ngoài / đối tác VIP.",
    notesLabel: "Ghi Chú Đặc Biệt Cho Lái Xe",
    notesPlaceholder: "Yêu cầu xe không mùi tỏi, chuẩn bị thêm nước lọc lạnh, hoặc hướng dẫn đón tại khu khách sạn cụ thể...",
    submitBooking: "XÁC NHẬN ĐẶT XE CHUYÊN NGHIỆP",
    successTitle: "Đặt Xe Thành Công!",
    successSubtitle: "Lịch trình đón tiễn của quý khách đã được ghi nhận trên hệ thống vận tải",
    successDesc: "Nhân viên điều phối sẽ nhắn tin Zalo/gọi điện xác nhận trực tiếp trong vòng 5-10 phút. Quý khách vui lòng chụp màn hình hoặc lưu lại mã đặt xe dưới đây:",
    bookingCode: "MÃ ĐẶT XE (TICKET CODE)",
    copyCode: "Sao Chép Mã",
    copied: "Đã chép!",
    trackStatusCta: "Xem Trạng Thái Xe Trên Bản Đồ",
    errorFields: "Vui lòng điền đầy đủ thông tin hành khách bắt buộc."
  },
  tracker: {
    title: "Tra Cứu Lịch Hẹn Đón Tiễn",
    subtitle: "Nhập số điện thoại đặt xe để xem tài xế đã khởi hành và kiểm tra tình trạng đặt chỗ thời gian thực.",
    phoneLabel: "Số Điện Thoại Đã Sử Dụng",
    phonePlaceholder: "Ví dụ: 0905123456...",
    codeLabel: "Mã Vé Đặt Xe (Tùy chọn)",
    codePlaceholder: "Ví dụ: DN-HA-XXXX...",
    btnSearch: "KIỂM TRA LỊCH HẸN NGAY",
    btnReset: "Nhập Số Khác",
    noResult: "Không tìm thấy bất kỳ cuộc đặt xe nào khớp với thông tin bạn cung cấp. Vui lòng xác định kỹ hoặc liên hệ Hotline để hỗ trợ tức thì.",
    detailsTitle: "Kết Quả Tra Cứu Đặt Lịch",
    statusLabel: "Trạng thái",
    routeLabel: "Tuyến đi",
    vehicleLabel: "Dòng xe đón",
    scheduleLabel: "Thời gian hẹn",
    totalCostLabel: "Tổng cước trọn gói",
    customerLabel: "Khách hàng",
    noteLabel: "Lưu ý đặc biệt",
    timelineTitle: "Biểu Đồ Tiến Độ Hành Trình",
    created: "Tạo lịch",
    confirmed: "Đã Duyệt",
    assigned: "Có Xe",
    ongoing: "Xe Chạy",
    completed: "Hoàn Thành",
    cancelled: "Đã Hủy",
    statusPending: "Đang Chờ Duyệt",
    statusConfirmed: "Đã Xác Nhận",
    statusAssigned: "Đã Điều Phối Lái Xe",
    statusCompleted: "Đã Đưa Đón Hoàn Tất",
    statusCancelled: "Đã Hủy Lịch"
  }
};

const enDictionary: Dictionary = {
  promoBanner: "Special Promo: Save 10% on all round-trip bookings Da Nang ↔ Hoi An from today!",
  navbar: {
    home: "Home",
    routes: "Tour Routes",
    fleet: "Fleet (4-16 Seats)",
    booking: "Online Booking",
    tracker: "Track Ride",
    admin: "Admin Operator",
    zaloCall: "Zalo / Call: +84 905.123.456",
    bookNow: "Book Now"
  },
  trustBadges: {
    badge1Title: "5-Star Customer Rating",
    badge1Desc: "Trusted and chosen by 5000+ domestic and international travelers as their top pick.",
    badge2Title: "SSL Secure Encrypted",
    badge2Desc: "All personal identifiers and travel detail transactions remain strictly private.",
    badge3Title: "24/7 Dedicated Care",
    badge3Desc: "Emergency standby & real-time monitoring of arrival gate delayed flights."
  },
  testimonials: {
    title: "Customer Experiences",
    heading: "What Our Passengers Say",
    subtitle: "Check out objective feedback recorded from domestic and foreign tourism communities."
  },
  hero: {
    pillsText: "All-Inclusive Price - No Hidden Fees",
    titleFirst: "Professional",
    titleHighlight: "Da Nang ↔ Hoi An",
    titleLast: "Chauffeur",
    subtitle: "Premium airport transfers and historical heritage tours across Central Vietnam. Luxury private cars, safe professional drivers, and 24/7 care.",
    btnRates: "View Route Price List",
    tabQuickSearch: "Quick Cost Estimator",
    tabCustomRoute: "Find Car by Location",
    formFrom: "Pickup Point (Address in Da Nang...)",
    formTo: "Dropoff Point (Hotel in Hoi An...)",
    formVehicle: "Select Desired Vehicle Type",
    btnEstimate: "ESTIMATE & BOOK NOW OUTRIGHT",
    features: [
      "No speeding or aggressive overtaking",
      "100% on-time pickup guaranteed",
      "Free booking cancellation",
      "Warm door greeting & luggage handling"
    ],
    placeholderFrom: "e.g. Da Nang Airport, Novotel Hotel...",
    placeholderTo: "e.g. Hoi An Ancient Town, Vinpearl Resort..."
  },
  weather: {
    title: "Local Weather",
    subtitle: "Check to plan your trip better",
    btnRefresh: "Refresh",
    humidity: "Humidity",
    windSpeed: "Wind",
    forecastLabel: "Tomorrow's Forecast",
    updated: "Updated",
    source: "Source",
    fallbackWarning: "* Currently using local fallback weather database"
  },
  faq: {
    pill: "Customer Solutions FAQ",
    heading: "Frequently Asked Questions",
    subtitle: "All your questions about pickup procedures, 4 - 16 seat fleet rates, and transfer guarantees answered comprehensively.",
    helpHeading: "Need urgent support?",
    helpDesc: "Our customer experience team is ready to assist you directly via Hotline/Zalo.",
    zaloCta: "Message Zalo for Free Advice"
  },
  footer: {
    desc: "Provider of high-quality premium transport solutions and Da Nang - Hoi An airport transfers. Guarantees safety, steady pricing, and dedicated support every mile.",
    services: "Transfer Services",
    support: "Customer Care",
    contact: "Contact Information",
    address: "Add: 123 Nguyen Van Linh, Hai Chau, Da Nang City, Vietnam",
    workHours: "Hours: Operational 24/7 (Including holidays)",
    copyright: "© 2026 Danang Hoian Chauffeur. All rights reserved.",
    tagline: "Private VIP tourist transfer service in Central Vietnam."
  },
  bookingForm: {
    step1: "Route & Schedule",
    step2: "Contact Information",
    step3: "Finalize Appointment",
    selectRoute: "Select your desired route",
    selectRoutePlaceholder: "Choose a tour route to fetch price...",
    oneWay: "One-Way Ride",
    roundTrip: "Round-Trip Ride (10% Off)",
    routeDetails: "Predefined Route Specifics",
    distance: "Distance roughly",
    duration: "Estimated travel time",
    pickupDate: "Pickup Date",
    pickupTime: "Pickup Time",
    returnDate: "Return Date (Round-trip)",
    returnTime: "Return Pickup Time",
    priceEst: "All-inclusive estimated cost",
    priceDisclaimer: "* Fully includes petrol, tolls, driver wage, and Da Nang airport terminal entry fees. Absolutely no negative pricing or empty-run surcharges.",
    nextStep: "Continue to Step 2",
    prevStep: "Back to Step 1",
    custTitle: "Contact & Luggage",
    custSubtitle: "Please fill in the fields below so the driver can effortlessly contact you on arrival",
    fullName: "Primary Passenger Full Name",
    fullNamePlaceholder: "Enter passenger name...",
    phone: "Phone Number (with SMS/Zalo)",
    phonePlaceholder: "Enter contact mobile number...",
    flightCode: "Flight Number (Optional)",
    flightPlaceholder: "e.g., VN123, VJ245 (Driver checks schedule for delays)",
    addonsTitle: "Optional Travel Add-ons",
    addonBaby: "Add Baby Safety Seat (+50,000đ)",
    addonBabyDesc: "Guarantees a safe and relaxed long-distance journey for toddlers.",
    addonEnglish: "English-Speaking Chauffeur (+100,000đ)",
    addonEnglishDesc: "Ideal for foreign tourists / VIP business partners.",
    notesLabel: "Special Instructions for Driver",
    notesPlaceholder: "No garlic smell, chill mineral water bottle requested, or specific hotel lobby gate pickup instructions...",
    submitBooking: "CONFIRM CHAUFFEUR BOOKING",
    successTitle: "Booking Confirmed!",
    successSubtitle: "Your pickup schedule has been safely recorded by our dispatch fleet",
    successDesc: "A dispatcher will send a Zalo message/call to confirm within 5-10 minutes. Please take a screenshot or note down the ticket code below:",
    bookingCode: "TICKET CODE",
    copyCode: "Copy Code",
    copied: "Copied!",
    trackStatusCta: "Track Vehicle on Live Map",
    errorFields: "Please fill in all mandatory passenger details."
  },
  tracker: {
    title: "Track Your Ride Schedule",
    subtitle: "Provide your booking phone number to verify driver status, allocated car, and real-time transit milestones.",
    phoneLabel: "Registered Phone Number",
    phonePlaceholder: "e.g., 0905123456...",
    codeLabel: "Ticket Booking Code (Optional)",
    codePlaceholder: "e.g., DN-HA-XXXX...",
    btnSearch: "CHECK RIDE STATUS NOW",
    btnReset: "Enter Another Phone",
    noResult: "No booking matches the details provided. Please double check the number or connect directly with our hotline helper.",
    detailsTitle: "Booking Status & Details",
    statusLabel: "Status",
    routeLabel: "Route",
    vehicleLabel: "Vehicle Class",
    scheduleLabel: "Scheduled Time",
    totalCostLabel: "Total Fixed Price",
    customerLabel: "Guest Name",
    noteLabel: "Special Remarks",
    timelineTitle: "Transit Progress Checklist",
    created: "Booked",
    confirmed: "Approved",
    assigned: "Dispatched",
    ongoing: "In Transit",
    completed: "Arrived",
    cancelled: "Voided",
    statusPending: "Awaiting Dispatcher Review",
    statusConfirmed: "Confirmed & Scheduled",
    statusAssigned: "Driver Dispatched & Ready",
    statusCompleted: "Ride Completed Success",
    statusCancelled: "Booking Voided/Cancelled"
  }
};

const viVehicles: Vehicle[] = [
  {
    id: "car-4",
    name: "Xe Sang 4 Chỗ (Sedan)",
    type: "4-seat",
    models: ["Toyota Vios", "Honda City", "Hyundai Accent", "Mazda 3"],
    capacity: { passengers: 3, luggage: 2 },
    features: [
      "Điều hòa làm lạnh sâu cực mát",
      "Khoang hành lý rộng độc lập",
      "Wifi di động 4G miễn phí",
      "Nước suối lạnh đóng chai và khăn ẩm",
      "Cổng sạc pin USB tiện lợi",
      "Gối nằm êm ái chống nhức mỏi"
    ],
    pricePerKm: 11000,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    description: "Lựa chọn tiết kiệm, kín đáo và thoải mái nhất cho các cặp đôi, cá nhân đi du lịch hoặc đối tác công tác."
  },
  {
    id: "car-7",
    name: "Xe Đa Dụng 7 Chỗ (SUV/MPV)",
    type: "7-seat",
    models: ["Toyota Innova", "Toyota Fortuner", "Mitsubishi Xpander"],
    capacity: { passengers: 5, luggage: 4 },
    features: [
      "Ghế gập linh hoạt không gian tối ưu",
      "Gầm xe cao leo lội cực kỳ êm ái",
      "Wifi di động 4G phát sóng liên tục",
      "Khăn lạnh mỏng thơm, nước suối miễn phí",
      "Hệ thống loa âm thanh đỉnh cao",
      "Dàn lạnh điều hòa độc lập tới từng ghế"
    ],
    pricePerKm: 13000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    description: "Khoang cabin vô cùng rộng thoáng, phù hợp gia đình từ 4 đến 5 thành viên mang theo nhiều kiện va li cỡ lớn."
  },
  {
    id: "car-16",
    name: "Xe Du Lịch 16 Chỗ (Minibus)",
    type: "16-seat",
    models: ["Ford Transit", "Hyundai Solati"],
    capacity: { passengers: 12, luggage: 8 },
    features: [
      "Trần xe cực cao, lối đi thông thoáng",
      "Hàng ghế ngả sâu thư thái đến 135 độ",
      "Hệ thống làm lạnh đa chiều sảng khoái",
      "Micro hát karaoke giải trí sôi động",
      "Suất nước khoáng mát lạnh chuẩn bị sẵn",
      "Bậc bước chân tự động thông minh an toàn"
    ],
    pricePerKm: 18000,
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=600",
    description: "Giải pháp du lịch hoàn hảo và siêu tiết kiệm ngân sách cho đoàn tham quan từ 6-12 người hoặc công ty teambuilding."
  },
  {
    id: "car-limousine",
    name: "Chuyên Cơ VIP Limousine 9/12 Chỗ",
    type: "limousine",
    models: ["Dcar Limousine Ford", "Hyundai Solati VIP"],
    capacity: { passengers: 9, luggage: 6 },
    features: [
      "Hàng ghế thương gia bọc da massage đa điểm",
      "Hệ thống đèn LED bầu trời sao lấp lánh sang trọng",
      "Ổ cắm sạc đa năng 220V tại vị trí từng hành khách",
      "Tủ lạnh mini giữ nhiệt, phục vụ đồ mát liên tục",
      "Màn hình tivi LCD giải trí sắc nét sống động",
      "Màn rèm nhung cao cấp che nắng và giữ sự riêng tư"
    ],
    pricePerKm: 25000,
    image: "https://images.unsplash.com/photo-1620986503022-de510ceb2052?auto=format&fit=crop&q=80&w=600",
    description: "Xe chuyên chở thương gia phục vụ đón khách VIP, liên kết đối tác lớn, đám cưới sang trọng hoặc kỳ nghỉ hoàn mỹ."
  }
];

const enVehicles: Vehicle[] = [
  {
    id: "car-4",
    name: "Premium 4-Seat Sedan",
    type: "4-seat",
    models: ["Toyota Vios", "Honda City", "Hyundai Accent", "Mazda 3"],
    capacity: { passengers: 3, luggage: 2 },
    features: [
      "High-power icy cool air conditioning",
      "Independent spacious luggage compartment",
      "Complementary high-speed 4G portable Wi-Fi",
      "Bottled fresh mineral water & cooling wet wipes",
      "Useful phone USB charging dock at slots",
      "Comfortable plush relaxing headrest pillows"
    ],
    pricePerKm: 11000,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    description: "The most cost-saving, quiet, and comfortable private choice for couples, solo business trips, or small families."
  },
  {
    id: "car-7",
    name: "Multi-purpose 7-Seat SUV/MPV",
    type: "7-seat",
    models: ["Toyota Innova", "Toyota Fortuner", "Mitsubishi Xpander"],
    capacity: { passengers: 5, luggage: 4 },
    features: [
      "Versatile reclining folding rear passenger seats",
      "High chassis layout smoothly taking all terrains",
      "Consistent unlimited 4G mobile Wi-Fi hotspot",
      "Prepared refreshing wet towels & pure drinking water",
      "Immersive surrounding Bluetooth sound system",
      "Independent individual climate vents at rows"
    ],
    pricePerKm: 13000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600",
    description: "Extremely spacious cabin interior, custom-built for travel parties of 4 to 5 bearing multiple heavy baggars."
  },
  {
    id: "car-16",
    name: "Family Minibus 16-Seat Coach",
    type: "16-seat",
    models: ["Ford Transit", "Hyundai Solati"],
    capacity: { passengers: 12, luggage: 8 },
    features: [
      "Aloft vaulted ceiling with free aisle headroom",
      "Seat rows reclining down to broad 135 degrees",
      "Multi-directional high-capacity breeze ventilation",
      "Karaoke system with microphone for social tours",
      "Prepared bottle of spring water & wet tissue per guest",
      "Safety-engineered automatic fold-out entry step"
    ],
    pricePerKm: 18000,
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=600",
    description: "Superb transit solution and sensible financial split for organized retreats of 6-12 folks or corporate teambuilding."
  },
  {
    id: "car-limousine",
    name: "VIP Land Cruiser Limousine (9-12 Seats)",
    type: "limousine",
    models: ["Dcar Limousine Ford", "Hyundai Solati VIP"],
    capacity: { passengers: 9, luggage: 6 },
    features: [
      "Luxury First Class leather seats with electric massage",
      "Ambient starry-sky LED roof lights for elite feel",
      "Dual 220V power outlets & USB fast docks for every traveler",
      "Fully loaded refrigerator cooling refreshments",
      "Brilliant overhead central LCD display monitor",
      "Heavy velvet luxury drapes preserving elite privacy"
    ],
    pricePerKm: 25000,
    image: "https://images.unsplash.com/photo-1620986503022-de510ceb2052?auto=format&fit=crop&q=80&w=600",
    description: "Elite bespoke carrier built for VIP transfers, wedding motorcades, executive alignments, or extreme relaxation."
  }
];

const viRoutes: Route[] = [
  {
    id: "route-dn-ha",
    name: "Đón Tiễn Sân Bay Đà Nẵng ↔ Hội An (VIP Airport Transfer)",
    slug: "san-bay-da-nang-di-hoi-an",
    from: "Sân bay Đà Nẵng (hoặc trung tâm Hải Châu/Sơn Trà)",
    to: "Phố cổ Hội An (Khách sạn/Resort/Nhà riêng bất kỳ)",
    distanceKm: 30,
    durationMin: 45,
    prices: {
      "4-seat": 250000,
      "7-seat": 320000,
      "16-seat": 550000,
      "limousine": 850000
    },
    highlights: [
      "Tài xế đón tại sảnh chờ ga đến với biển tên sang trọng (miễn phí chờ kể cả delay)",
      "Xe đời mới sạch sẽ, đi thẳng tuyến bờ biển tuyệt đẹp, không ghép khách dư thừa",
      "Miễn phí vé vào cổng sân bay Đà Nẵng",
      "Hỗ trợ mang vác hành lý cẩn thận, chu dạo"
    ],
    description: "Tuyến di chuyển chủ đạo nối liền cảng hàng không quốc tế miền Trung với đô thị cổ Hội An xinh đẹp. Quý khách được đón tận tình ngay khi đáp cánh, không lo bỡ ngỡ, không chặt chém, thanh toán sau chuyến đi cực kỳ an tâm.",
    attractions: ["Bán đảo Sơn Trà", "Bãi biển Mỹ Khê", "Ngũ Hành Sơn", "Phố cổ Hội An"],
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "route-dn-bana",
    name: "Đà Nẵng ↔ Bà Nà Hills (Khứ Hồi Trọn Gói Trong Ngày)",
    slug: "da-nang-di-ba-na-hills",
    from: "Đà Nẵng (Khách sạn/Sân bay/Nhà riêng)",
    to: "Khu du lịch Sun World Ba Na Hills (Ga cáp treo)",
    distanceKm: 42,
    durationMin: 60,
    prices: {
      "4-seat": 550000,
      "7-seat": 650000,
      "16-seat": 950000,
      "limousine": 1500000
    },
    highlights: [
      "Giá đã bao gồm khứ hồi 2 chiều và tài xế đợi suốt cả ngày (lên đến 8 tiếng)",
      "Tư vấn mua vé cáp treo Bà Nà miễn phí, bỏ qua xếp hàng chờ đợi tại quầy vé",
      "Đúng giờ hẹn, đón tiễn tận cổng cáp treo cực kỳ thuận tiện cho cả người già và trẻ nhỏ",
      "Hỗ trợ đặt ăn buffet trưa ưu đãi lên tới 10%"
    ],
    description: "Chuyến hành trình khám phá tiên cảnh Bà Nà Hills huyền ảo với Cầu Vàng, Làng Pháp cổ kính. Chúng tôi mang đến gói đưa đón khứ hồi trọn gói tiện lợi, tài xế túc trực đợi sẵn đưa đoàn về lại khách sạn an yên sau ngày vui chơi trọn vẹn.",
    attractions: ["Cầu Vàng (Golden Bridge)", "Làng Pháp cổ", "Vườn hoa Le Jardin d’Amour", "Hầm rượu Debay"],
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "route-dn-hue",
    name: "Đà Nẵng ↔ Hải Vân Pass ↔ Huế (Heritage Day Tour)",
    slug: "da-nang-di-hue-heritage",
    from: "Đà Nẵng (Khách sạn/Nhà riêng)",
    to: "Cố đô Huế (Đại Nội, Các Lăng Tẩm Hoàng Gia)",
    distanceKm: 105,
    durationMin: 140,
    prices: {
      "4-seat": 1100000,
      "7-seat": 1300000,
      "16-seat": 1800000,
      "limousine": 2700000
    },
    highlights: [
      "Tùy chọn vượt Đèo Hải Vân hùng vĩ ngắm cảnh núi non hoặc đi Hầm đường bộ an toàn nhanh chóng",
      "Dừng chân check-in chụp hình tại Đầm Lập An, Vịnh biển Lăng Cô thơ mộng miễn phí",
      "Tài xế Am hiểu văn hóa lịch sử, hỗ trợ gợi ý các quán ăn đặc sản Huế siêu ngon chuẩn vị",
      "Xe phục vụ cả chiều đi, đưa đón suốt các điểm nội thành Huế (Đại Nội, Lăng Khải Định, Chùa Thiên Mụ)"
    ],
    description: "Hành trình di sản xuyên đèo kết nối hai đô thị du lịch lớn nhất miền Trung. Vừa đi vừa ngắm cảnh Vịnh Lăng Cô hoang sơ, Đèo Hải Vân được mệnh danh Thiên hạ đệ nhất hùng quan, rồi đắm mình vào vẻ đẹp trầm mặc cổ kính của Đại Nội Huế.",
    attractions: ["Đèo Hải Vân", "Vịnh Lăng Cô & Đầm Lập An", "Đại Nội Huế", "Lăng Khải Định & Minh Mạng", "Chùa Thiên Mụ"],
    imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "route-dn-myson",
    name: "Đà Nẵng / Hội An ↔ Thánh Địa Mỹ Sơn (Khu Di Tích Champa)",
    slug: "da-nang-di-thanh-dia-my-son",
    from: "Đà Nẵng hoặc Hội An",
    to: "Thánh địa Mỹ Sơn (Quảng Nam)",
    distanceKm: 55,
    durationMin: 75,
    prices: {
      "4-seat": 650000,
      "7-seat": 750000,
      "16-seat": 1100000,
      "limousine": 1600000
    },
    highlights: [
      "Gói khứ hồi 2 chiều bao gồm thời gian tài xế đợi 3-4 tiếng khách tham quan",
      "Linh hoạt thời gian xuất phát buổi sáng sớm để đón bình minh tuyệt diệu hoặc buổi chiều mát mẻ",
      "Đại lộ thênh thang, đón tận cửa resort/khách sạn vô cùng thoải mái"
    ],
    description: "Trở về quá khứ cùng quần thể đền tháp Chăm cổ kính nằm ẩn mình giữa thung lũng đại ngàn Mỹ Sơn. Chúng tôi cung cấp xe đời mới điều hòa mát lạnh giúp xua tan cái nóng bức của chuyến hành trình tham quan tháp cổ lịch sử.",
    attractions: ["Khu đền tháp Champa cổ", "Show diễn múa Chăm thần thoại", "Hồ Mỹ Sơn"],
    imageUrl: "https://images.unsplash.com/photo-1608958416629-de9be4949e29?auto=format&fit=crop&q=80&w=800"
  }
];

const enRoutes: Route[] = [
  {
    id: "route-dn-ha",
    name: "Da Nang Airport ↔ Hoi An Transfer (VIP Airport Transfer)",
    slug: "san-bay-da-nang-di-hoi-an",
    from: "Da Nang Airport (or Hai Chau/Son Tra custom pick points)",
    to: "Hoi An Ancient Town (Any Hotel/Resort/Private Home)",
    distanceKm: 30,
    durationMin: 45,
    prices: {
      "4-seat": 250000,
      "7-seat": 320000,
      "16-seat": 550000,
      "limousine": 850000
    },
    highlights: [
      "Chauffeur meets you at arrival hall with custom nameplate (no cost for flight delays)",
      "Sparkling modern private vehicle, straight scenic beach path, zero ride pooling",
      "All airport terminal parking fees and harbor entry tickets included",
      "Polite assistance handling & loading heavy luggage into car"
    ],
    description: "The classic essential run bridging Central Vietnam's bustling air portal with gorgeous Hoi An Ancient Town. Enjoy professional pickup greeting immediately when crossing gates, fixed transparent prices, and cash/transfer payment afterward.",
    attractions: ["Son Tra Peninsula", "My Khe Beach", "Marble Mountains", "Hoi An Town"],
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "route-dn-bana",
    name: "Da Nang ↔ Ba Na Hills (Same-day Round-trip Transfer)",
    slug: "da-nang-di-ba-na-hills",
    from: "Da Nang (Hotel/Airport/Private Stay)",
    to: "Sun World Ba Na Hills Resort (Cable Car Terminal)",
    distanceKm: 42,
    durationMin: 60,
    prices: {
      "4-seat": 550000,
      "7-seat": 650000,
      "16-seat": 950000,
      "limousine": 1500000
    },
    highlights: [
      "Includes two-way round-trip transport with driver waiting patiently up to 8 hours",
      "Complementary advice booking Ba Na cable car tickets, skip wait lines entirely",
      "Perfect timing, door-to-door shuttle right at terminal gates for kids & elderly",
      "10% special discount on premium buffet dining booking assistance"
    ],
    description: "A magical excursion exploring Ba Na Hills wonderland, Golden Bridge, and historic French settings. We supply an all-day round-trip layout where the driver remains stationed, bringing you back safely whenever you conclude.",
    attractions: ["The Golden Bridge", "French Village", "Le Jardin d’Amour Garden", "Debay Cellar"],
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "route-dn-hue",
    name: "Da Nang ↔ Hai Van Pass ↔ Hue (Ancient Heritage Day Tour)",
    slug: "da-nang-di-hue-heritage",
    from: "Da Nang (Residence/Lobby pickup)",
    to: "Hue Imperial Citadel (Citadel Palace & Royal Tomb Areas)",
    distanceKm: 105,
    durationMin: 140,
    prices: {
      "4-seat": 1100000,
      "7-seat": 1300000,
      "16-seat": 1800000,
      "limousine": 2700000
    },
    highlights: [
      "Ride over dramatic Hai Van Pass for majestic summit views or select speedy express tunnel",
      "Free scenic check-in stops at Lap An lagoon and pristine Lang Co Bay shoreline",
      "Chauffeur with rich local insight suggesting authentic Hue cuisines & spots",
      "Car monitors all your local stops across Hue town (Citadel, Thien Mu Pagoda, Tombs)"
    ],
    description: "An inspiring heritage passage winding across mountains to trace dynastic memories. Witness untouched gulf lagoons, conquer the legendary pass summit, and dive deep into magnificent palace halls.",
    attractions: ["Hai Van Pass Peak", "Lang Co Bay & Lap An Lagoon", "Imperial Citadel", "Khai Dinh & Minh Mang Tombs", "Thien Mu Pagoda"],
    imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "route-dn-myson",
    name: "Da Nang / Hoi An ↔ My Son Sanctuary (Champa Ruins Tour)",
    slug: "da-nang-di-thanh-dia-my-son",
    from: "Da Nang or Hoi An lodging",
    to: "My Son Sanctuary Site (Quang Nam)",
    distanceKm: 55,
    durationMin: 75,
    prices: {
      "4-seat": 650000,
      "7-seat": 750000,
      "16-seat": 1100000,
      "limousine": 1600000
    },
    highlights: [
      "Two-way package includes 3 to 4 hours of chauffeur waiting while you tour ruins",
      "Flexible early morning scheduling to catch mystical sunrises, or cool afternoon breezes",
      "Spacious air-conditioned car picking you up straight from resort lobbies"
    ],
    description: "Travel back in time to discover centuries-old mystical Cham towers nestled in a grand jungle valley. Avoid scorching outdoor heat with our fresh icy-cold vehicles, maintaining peak comfort all day.",
    attractions: ["Cham Ancient Tower Valley", "Mythological Cham Dance Show", "My Son Lake scenery"],
    imageUrl: "https://images.unsplash.com/photo-1608958416629-de9be4949e29?auto=format&fit=crop&q=80&w=800"
  }
];

const viDestinations: Destination[] = [
  {
    id: "dest-hoian",
    name: "Phố Cổ Hội An",
    description: "Di sản Văn hóa Thế giới UNESCO với những dãy nhà cổ màu vàng đặc trưng, hàng nghìn chiếc đèn lồng rực rỡ lãng mạn bên sông Hoài thơ mộng.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=400",
    famousFor: "Thả hoa đăng sông Hoài, Nhà cổ Tân Ký, Chùa Cầu, Bánh mỳ Phượng.",
    distanceFromDaNang: "30 km - 45 phút chạy xe"
  },
  {
    id: "dest-bana",
    name: "Bà Nà Hills (Sun World)",
    description: "Đà Lạt của miền Trung với thời tiết 4 mùa trong một ngày, hệ thống cáp treo đạt nhiều kỷ lục thế giới và kỳ quan Cầu Vàng nổi tiếng toàn cầu.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400",
    famousFor: "Cầu Vàng nâng đỡ bởi bàn tay đá khổng lồ, Làng Pháp sương mù, Fantasy Park.",
    distanceFromDaNang: "42 km - 1 giờ chạy xe"
  },
  {
    id: "dest-hue",
    name: "Cố Đô Huế",
    description: "Thủ phủ triều Nguyễn trầm mặc cổ kính với Hoàng Thành trang nghiêm, lăng tẩm hoàng gia tráng lệ độc dáo, dòng sông Hương hiền hòa phẳng lặng.",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=400",
    famousFor: "Ngọ Môn Đại Nội, Chùa Thiên Mụ, Ca trù sông Hương, Lăng Khải Định, Bún bò Huế.",
    distanceFromDaNang: "105 km - 2.5 giờ chạy xe"
  },
  {
    id: "dest-nuhanh",
    name: "Ngũ Hành Sơn & Mỹ Khê",
    description: "Quần thể 5 ngọn núi đá vôi nhô lên sừng sững bên bờ biển Mỹ Khê cát trắng mịn màng - một trong những bãi biển quyến rũ nhất hành tinh.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400",
    famousFor: "Chùa Linh Ứng, Động Huyền Không, Làng đá mỹ nghệ Non Nước, Lướt ván biển Mỹ Khê.",
    distanceFromDaNang: "8 km - 15 phút chạy xe"
  }
];

const enDestinations: Destination[] = [
  {
    id: "dest-hoian",
    name: "Hoi An Ancient Town",
    description: "A UNESCO Cultural Heritage site featuring yellow historic houses, canals, and thousands of shimmering lanterns beside the romantic Hoai River.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=400",
    famousFor: "Lantern lighting, Tan Ky Ancient House, Japanese Covered Bridge, Banh Mi Phuong.",
    distanceFromDaNang: "30 km - 45 mins drive"
  },
  {
    id: "dest-bana",
    name: "Ba Na Hills Resort",
    description: "Known as Central Vietnam's alpine escape with four distinct weather seasons in a day, scenic world-record cable cars, and the famous Golden Bridge.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400",
    famousFor: "Golden Bridge held by giant rock hands, foggy French Village, Fantasy Theme Park.",
    distanceFromDaNang: "42 km - 1 hour drive"
  },
  {
    id: "dest-hue",
    name: "Imperial Capital Hue",
    description: "The historical Nguyen Dynasty capital with sacred imperial enclosures, grand royal tombs, and pristine scenery sitting by the Perfume River.",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=400",
    famousFor: "Imperial Palace Gates, Thien Mu Pagoda, Perfume River cruises, Khai Dinh tomb, Royal Beef noodles.",
    distanceFromDaNang: "105 km - 2.5 hours drive"
  },
  {
    id: "dest-nuhanh",
    name: "Marble Mountains & My Khe Beach",
    description: "Five majestic limestone peaks guarding a white-sand coast. My Khe Beach is ranked among the most beautiful beaches in Asia.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400",
    famousFor: "Linh Ung Temple, Huyen Khong Caves, Non Nuoc Stone Carving Village, coastal surfing.",
    distanceFromDaNang: "8 km - 15 mins drive"
  }
];

const viFaqs = [
  {
    q: "Bảng giá thuê xe đã bao gồm đầy đủ tất cả chi phí chưa? Có phát sinh không?",
    a: "Giá của chúng tôi được niêm yết công khai và TRỌN GÓI. Đã bao gồm lương tài xế, nhiên liệu xe xăng dầu, phí cầu đường bến bãi đỗ xe và bảo hiểm hành khách. Tuyệt đối không phát sinh thêm bất cứ khoản phí ẩn nào khác ngoài thỏa thuận ban đầu."
  },
  {
    q: "Nếu chuyến bay của tôi bị hoãn hoặc delay, tôi có bị tính phí chờ đợi không?",
    a: "Không! Chúng tôi liên tục cập nhật lịch trình bay trực tuyến của quý khách thông qua mã số chuyến bay cung cấp sẵn khi đặt xe. Tài xế sẽ chỉ xuất phát phù hợp với giờ đáp thực tế của quý khách và miễn phí chờ vô thời hạn, không thu phí delay sân bay."
  },
  {
    q: "Tôi nên đặt xe trước bao lâu trước chuyến đi?",
    a: "Để đảm bảo điều phối xe tốt nhất, quý khách nên đăng ký lịch từ trước 1 ngày đến 1 tuần. Tuy nhiên, đối với các chuyến đón tiễn sân bay Đà Nẵng khẩn cấp đi Hội An, chúng ti có thể điều chuyển xe đón nhanh trong vòng 15-30 phút sau khi xác nhận."
  },
  {
    q: "Hệ thống thanh toán của công ty hoạt động như thế nào?",
    a: "Hệ thống đặt xe của chúng tôi bảo mật và không yêu cầu đặt cọc trước đối với đa số chuyến đi ngắn (như sảnh đón Sân Bay Đà Nẵng - Hội An). Lái xe đón quý khách an toàn và quý khách thanh toán trực tiếp bằng tiền mặt hoặc chuyển khoản ngân hàng số trực tiếp cho tài xế/văn phòng điều hành sau khi hoàn thành lộ trình."
  },
  {
    q: "Lái xe của công ty có được đào tạo chuyên nghiệp không?",
    a: "100% đội ngũ bác tài có giấy phép lái xe chuẩn hạng, kinh nghiệm trên 5 năm chạy tour khách du lịch nước ngoài và nội địa. Các tài xế phục vụ lịch sự, sạch sẽ, không hút thuốc lá trong xe, lái xe an toàn, điềm đạm, am hiểu địa hình miền Trung sâu sắc."
  }
];

const enFaqs = [
  {
    q: "Does the price quote cover all taxes and tolls? Are there hidden surcharges?",
    a: "Our rates are 100% flat, all-inclusive, and guaranteed. It fully covers driver wage, gas, highway/bridge tolls, airport terminal entrance parking limits, and passenger vehicle insurance. No unexpected extra bills are charged beyond the initial calculation."
  },
  {
    q: "What if my incoming flight is delayed? Will I face a delayed lobby waiting fee?",
    a: "No! We track flight itineraries in real-time utilizing the flight number provided during booking. The assigned driver departs matching your real-world touchdown. Your waiting limit is extended with absolutely no delay penalty."
  },
  {
    q: "How early in advance should I complete my chauffeur booking?",
    a: "To ensure optimal coordinator allocation, we suggest booking 1 day to 1 week early. However, for immediate Da Nang Terminal to Hoi An runs, we can dispatch a dedicated car to scoop you in 15-30 minutes post-booking."
  },
  {
    q: "How does the checkout/payment framework work for customers?",
    a: "We do not request digital pre-deposits or credit cards upfront for short airport hops. The driver carries you safely to your stay, and you settle the flat price directly with the driver via cash or digital banking transfers."
  },
  {
    q: "Are your private drivers fully trained, licensed and professional?",
    a: "Yes. 100% of our drivers possess verified professional commercial licenses, with over 5 years of active foreign tourist dispatch service. Our drivers are non-smoking, strictly polite, deeply knowledgeable of regional routes, and practice safe, gentle driving."
  }
];

const viTestimonialsList = [
  {
    name: "Nguyễn Minh Hải",
    role: "Gia đình du lịch từ TP.HCM",
    avatar: "👨",
    comment: "Tôi đặt xe 7 chỗ đón sân bay Đà Nẵng đi Hội An. Chuyến bay bị delay 45 phút nhưng bác tài vẫn vui vẻ đứng sảnh chờ với bảng tên đầy đủ. Lái xe cẩn thận, không phóng nhanh vượt ẩu, xe sạch thơm tho. Rất hài lòng!"
  },
  {
    name: "Ms. Sarah Connor",
    role: "Du khách Australia",
    avatar: "👩",
    comment: "Dịch vụ đón tiễn chuẩn sang xịn mịn. Xe VIP Limousine cực kỳ êm ái nâng tầm chuyến đi. WiFi tốc độ siêu tốc, lái xe còn chuẩn bị sẵn những chai nước suối lạnh sảng khoái tức thì. Hoàn toàn thư giãn!"
  },
  {
    name: "Trần Thị Thu Thảo",
    role: "Trưởng nhóm du lịch Hà Nội",
    avatar: "👩",
    comment: "Đoàn mình 12 người đặt xe 16 chỗ Hyundai Solati đi Huế qua Đèo Hải Vân. Tài xế rất nhiệt tình dừng lại ở Vịnh Lăng Cô cho cả đoàn chụp ảnh lưu niệm cực đẹp. Xe rất rộng rãi, điều hòa mát lịm."
  }
];

const enTestimonialsList = [
  {
    name: "Nguyen Minh Hai",
    role: "Family traveler from HCMC",
    avatar: "👨",
    comment: "Booked a 7-seater SUV from Da Nang Airport to Hoi An. Flight was delayed 45 minutes, but the chauffeur was waiting patiently with a VIP name sign. Smooth ride, clean car, absolutely fantastic experience."
  },
  {
    name: "Ms. Sarah Connor",
    role: "Visitor from Australia",
    avatar: "👩",
    comment: "Splendid luxury pickup service. The VIP Limousine is super comfortable. WiFi was incredibly fast and the driver offered bottles of cold water right when we got in. Absolute peace of mind for first-time visitors."
  },
  {
    name: "Tran Thi Thu Thảo",
    role: "Tour Coordinator from Hanoi",
    avatar: "👩",
    comment: "Our 12-passenger group booked a 16-seater minibus to Hue via the scenic Pass. The driver was extremely hospitable, stopping at Lang Co Bay for scenic group pictures. Clean AC breeze, very competitive rates."
  }
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("app_lang");
    return (saved === "vi" || saved === "en") ? saved : "vi";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const t = language === "vi" ? viDictionary : enDictionary;
  const vehicles = language === "vi" ? viVehicles : enVehicles;
  const routes = language === "vi" ? viRoutes : enRoutes;
  const destinations = language === "vi" ? viDestinations : enDestinations;
  const faqs = language === "vi" ? viFaqs : enFaqs;
  const testimonialsList = language === "vi" ? viTestimonialsList : enTestimonialsList;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        vehicles,
        routes,
        destinations,
        faqs,
        testimonialsList,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
