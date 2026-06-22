import { Vehicle, Route, Destination } from './types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'car-4',
    name: 'Xe Sang 4 Chỗ (Sedan)',
    type: '4-seat',
    models: ['Toyota Vios', 'Honda City', 'Hyundai Accent', 'Mazda 3'],
    capacity: {
      passengers: 3,
      luggage: 2
    },
    features: [
      'Điều hòa làm lạnh sâu',
      'Khoang hành lý rộng rãi độc lập',
      'Wifi di động 4G tốc độ cao miễn phí',
      'Đầy đủ khăn lạnh, nước suối chai',
      'Cổng sạc điện thoại USB tại ghế',
      'Gối tựa đầu êm ái'
    ],
    pricePerKm: 11000,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600', // Premium sedan
    description: 'Lựa chọn tiết kiệm, kín đáo và thoải mái nhất cho các cặp đôi, cá nhân đi công tác hoặc gia đình nhỏ từ 2-3 người.'
  },
  {
    id: 'car-7',
    name: 'Xe Đa Dụng 7 Chỗ (SUV/MPV)',
    type: '7-seat',
    models: ['Toyota Innova', 'Toyota Fortuner', 'Mitsubishi Xpander'],
    capacity: {
      passengers: 5,
      luggage: 4
    },
    features: [
      'Hàng ghế sau gập linh hoạt tinh tế',
      'Gầm cao êm ái thích hợp mọi địa hình',
      'Wifi di động 4G tốc độ cao miễn phí',
      'Nước suối và khăn lạnh chuẩn bị sẵn',
      'Hệ thống âm thanh Bluetooth sống động',
      'Điều hòa độc lập từng hàng ghế'
    ],
    pricePerKm: 13000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600', // Premium SUV / Innova/Fortuner
    description: 'Khoang xe vô cùng rộng rãi, phù hợp với gia đình từ 4-5 người cùng nhiều hành lý ký gửi cỡ lớn.'
  },
  {
    id: 'car-16',
    name: 'Xe Du Lịch 16 Chỗ (Minibus)',
    type: '16-seat',
    models: ['Ford Transit', 'Hyundai Solati'],
    capacity: {
      passengers: 12,
      luggage: 8
    },
    features: [
      'Không gian trần xe cao thoáng đãng',
      'Ghế ngồi ngã lưng sâu tới 135 độ',
      'Hệ thống điều hòa đa chiều siêu mát',
      'Micro và âm thanh karaoke cho đoàn du lịch',
      'Mỗi khách 1 bộ nước suối + khăn lạnh',
      'Bệ bước chân đóng mở tự động an toàn'
    ],
    pricePerKm: 18000,
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=600', // Modern Transit / Minivan
    description: 'Giải pháp hoàn hảo và tiết kiệm chi phí thông minh cho đoàn du lịch từ 6-12 người, đại gia đình hoặc teambuilding công ty.'
  },
  {
    id: 'car-limousine',
    name: 'Chuyên Cơ Mặt Đất - VIP Limousine 9/12 Chỗ',
    type: 'limousine',
    models: ['Dcar Limousine Ford Transit', 'Hyundai Solati Limousine'],
    capacity: {
      passengers: 9,
      luggage: 6
    },
    features: [
      'Ghế hạng nhất (First Class) massage đa chế độ',
      'Đèn LED bầu trời sao lãng mạn sang trọng',
      'Cổng sạc USB & ổ cắm 220V tại từng vị trí ghế',
      'Tủ lạnh mini ướp lạnh nước uống liên tục',
      'Màn hình TV LCD 19 inches giải trí trung tâm',
      'Rèm cửa nhập khẩu cao cấp che nắng tuyệt đối'
    ],
    pricePerKm: 25000,
    image: 'https://images.unsplash.com/photo-1620986503022-de510ceb2052?auto=format&fit=crop&q=80&w=600', // Premium Limousine Interior
    description: 'Dòng xe chuyên biệt phục vụ các sự kiện trọng đại, đưa đón đối tác VIP, cô dâu chú rể hoặc đoàn khách thích tận hưởng sự hoàn mỹ bậc nhất.'
  }
];

export const ROUTES: Route[] = [
  {
    id: 'route-dn-ha',
    name: 'Đón Tiễn Sân Bay Đà Nẵng ↔ Hội An (VIP Airport Transfer)',
    slug: 'san-bay-da-nang-di-hoi-an',
    from: 'Sân bay Đà Nẵng (hoặc trung tâm Hải Châu/Sơn Trà)',
    to: 'Phố cổ Hội An (Khách sạn/Resort/Nhà riêng bất kỳ)',
    distanceKm: 30,
    durationMin: 45,
    prices: {
      '4-seat': 250000, // Fixed price premium
      '7-seat': 320000,
      '16-seat': 550000,
      'limousine': 850000
    },
    highlights: [
      'Tài xế đón tại sảnh chờ ga đến với biển tên sang trọng (miễn phí chờ kể cả delay)',
      'Xe đời mới sạch sẽ, đi thẳng tuyến bờ biển tuyệt đẹp, không ghép khách dư thừa',
      'Miễn phí vé vào cổng sân bay Đà Nẵng',
      'Hỗ trợ mang vác hành lý cẩn thận, chu đáo'
    ],
    description: 'Tuyến di chuyển chủ đạo nối liền cảng hàng không quốc tế miền Trung với đô thị cổ Hội An xinh đẹp. Quý khách được đón tận tình ngay khi đáp cánh, không lo bỡ ngỡ, không chặt chém, thanh toán sau chuyến đi cực kỳ an tâm.',
    attractions: ['Bán đảo Sơn Trà', 'Bãi biển Mỹ Khê', 'Ngũ Hành Sơn', 'Phố cổ Hội An'],
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800' // Beautiful Hoi An Lantern Bridge
  },
  {
    id: 'route-dn-bana',
    name: 'Đà Nẵng ↔ Bà Nà Hills (Khứ Hồi Trọn Gói Trong Ngày)',
    slug: 'da-nang-di-ba-na-hills',
    from: 'Đà Nẵng (Khách sạn/Sân bay/Nhà riêng)',
    to: 'Khu du lịch Sun World Ba Na Hills (Ga cáp treo)',
    distanceKm: 42,
    durationMin: 60,
    prices: {
      '4-seat': 550000, // Round trip includes waiting
      '7-seat': 650000,
      '16-seat': 950000,
      'limousine': 1500000
    },
    highlights: [
      'Giá đã bao gồm khứ hồi 2 chiều và tài xế đợi suốt cả ngày (lên đến 8 tiếng)',
      'Tư vấn mua vé cáp treo Bà Nà miễn phí, bỏ qua xếp hàng chờ đợi tại quầy vé',
      'Đúng giờ hẹn, đón tiễn tận cổng cáp treo cực kỳ thuận tiện cho cả người già và trẻ nhỏ',
      'Hỗ trợ đặt ăn buffet trưa ưu đãi lên tới 10%'
    ],
    description: 'Chuyến hành trình khám phá tiên cảnh Bà Nà Hills huyền ảo với Cầu Vàng, Làng Pháp cổ kính. Chúng tôi mang đến gói đưa đón khứ hồi trọn gói tiện lợi, tài xế túc trực đợi sẵn đưa đoàn về lại khách sạn an yên sau ngày vui chơi trọn vẹn.',
    attractions: ['Cầu Vàng (Golden Bridge)', 'Làng Pháp cổ', 'Vườn hoa Le Jardin d’Amour', 'Hầm rượu Debay'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' // Golden Bridge
  },
  {
    id: 'route-dn-hue',
    name: 'Đà Nẵng ↔ Hải Vân Pass ↔ Huế (Heritage Day Tour)',
    slug: 'da-nang-di-hue-heritage',
    from: 'Đà Nẵng (Khách sạn/Nhà riêng)',
    to: 'Cố đô Huế (Đại Nội, Các Lăng Tẩm Hoàng Gia)',
    distanceKm: 105,
    durationMin: 140,
    prices: {
      '4-seat': 1100000,
      '7-seat': 1300000,
      '16-seat': 1800000,
      'limousine': 2700000
    },
    highlights: [
      'Tùy chọn vượt Đèo Hải Vân hùng vĩ ngắm cảnh núi non hoặc đi Hầm đường bộ an toàn nhanh chóng',
      'Dừng chân check-in chụp hình tại Đầm Lập An, Vịnh biển Lăng Cô thơ mộng miễn phí',
      'Tài xế Am hiểu văn hóa lịch sử, hỗ trợ gợi ý các quán ăn đặc sản Huế siêu ngon chuẩn vị',
      'Xe phục vụ cả chiều đi, đưa đón suốt các điểm nội thành Huế (Đại Nội, Lăng Khải Định, Chùa Thiên Mụ)'
    ],
    description: 'Hành trình di sản xuyên đèo kết nối hai đô thị du lịch lớn nhất miền Trung. Vừa đi vừa ngắm cảnh Vịnh Lăng Cô hoang sơ, Đèo Hải Vân được mệnh danh Thiên hạ đệ nhất hùng quan, rồi đắm mình vào vẻ đẹp trầm mặc cổ kính của Đại Nội Huế.',
    attractions: ['Đèo Hải Vân', 'Vịnh Lăng Cô & Đầm Lập An', 'Đại Nội Huế', 'Lăng Khải Định & Minh Mạng', 'Chùa Thiên Mụ'],
    imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=800' // Hue Imperial Palace Monument
  },
  {
    id: 'route-dn-myson',
    name: 'Đà Nẵng / Hội An ↔ Thánh Địa Mỹ Sơn (Khu Di Tích Champa)',
    slug: 'da-nang-di-thanh-dia-my-son',
    from: 'Đà Nẵng hoặc Hội An',
    to: 'Thánh địa Mỹ Sơn (Quảng Nam)',
    distanceKm: 55,
    durationMin: 75,
    prices: {
      '4-seat': 650000,
      '7-seat': 750000,
      '16-seat': 1100000,
      'limousine': 1600000
    },
    highlights: [
      'Gói khứ hồi 2 chiều bao gồm thời gian tài xế đợi 3-4 tiếng khách tham quan',
      'Linh hoạt thời gian xuất phát buổi sáng sớm để đón bình minh tuyệt diệu hoặc buổi chiều mát mẻ',
      'Đại lộ thênh thang, đón tận cửa resort/khách sạn vô cùng thoải mái'
    ],
    description: 'Trở về quá khứ cùng quần thể đền tháp Chăm cổ kính nằm ẩn mình giữa thung lũng đại ngàn Mỹ Sơn. Chúng tôi cung cấp xe đời mới điều hòa mát lạnh giúp xua tan cái nóng bức của chuyến hành trình tham quan tháp cổ lịch sử.',
    attractions: ['Khu đền tháp Champa cổ', 'Show diễn múa Chăm thần thoại', 'Hồ Mỹ Sơn'],
    imageUrl: 'https://images.unsplash.com/photo-1608958416629-de9be4949e29?auto=format&fit=crop&q=80&w=800' // My Son Sanctuary Temple ruins
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-hoian',
    name: 'Phố Cổ Hội An',
    description: 'Di sản Văn hóa Thế giới UNESCO với những dãy nhà cổ màu vàng đặc trưng, hàng nghìn chiếc đèn lồng rực rỡ lãng mạn bên sông Hoài thơ mộng.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=400',
    famousFor: 'Thả hoa đăng sông Hoài, Nhà cổ Tân Ký, Chùa Cầu, Bánh mỳ Phượng.',
    distanceFromDaNang: '30 km - 45 phút chạy xe'
  },
  {
    id: 'dest-bana',
    name: 'Bà Nà Hills (Sun World)',
    description: 'Đà Lạt của miền Trung với thời tiết 4 mùa trong một ngày, hệ thống cáp treo đạt nhiều kỷ lục thế giới và kỳ quan Cầu Vàng nổi tiếng toàn cầu.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400',
    famousFor: 'Cầu Vàng nâng đỡ bởi bàn tay đá khổng lồ, Làng Pháp sương mù, Fantasy Park.',
    distanceFromDaNang: '42 km - 1 giờ chạy xe'
  },
  {
    id: 'dest-hue',
    name: 'Cố Đô Huế',
    description: 'Thủ phủ triều Nguyễn trầm mặc cổ kính với Hoàng Thành trang nghiêm, lăng tẩm hoàng gia tráng lệ độc đáo, dòng sông Hương hiền hòa phẳng lặng.',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&q=80&w=400',
    famousFor: 'Ngọ Môn Đại Nội, Chùa Thiên Mụ, Ca trù sông Hương, Lăng Khải Định, Bún bò Huế.',
    distanceFromDaNang: '105 km - 2.5 giờ chạy xe'
  },
  {
    id: 'dest-nuhanh',
    name: 'Ngũ Hành Sơn & Mỹ Khê',
    description: 'Quần thể 5 ngọn núi đá vôi nhô lên sừng sững bên bờ biển Mỹ Khê cát trắng mịn màng - một trong những bãi biển quyến rũ nhất hành tinh.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
    famousFor: 'Chùa Linh Ứng, Động Huyền Không, Làng đá mỹ nghệ Non Nước, Lướt ván biển Mỹ Khê.',
    distanceFromDaNang: '8 km - 15 phút chạy xe'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Nguyễn Minh Hải',
    role: 'Gia đình du lịch từ TP.HCM',
    avatar: '👨',
    stars: 5,
    comment: 'Tôi đặt xe 7 chỗ Fortuner đón sân bay Đà Nẵng đi Hội An. Chuyến bay bị delay 45 phút nhưng bác tài vẫn vui vẻ đứng sảnh chờ với bảng tên đầy đủ. Lái xe cẩn thận, không phóng nhanh vượt ẩu, xe sạch thơm tho. Rất hài lòng và sẽ ủng hộ tiếp khi đi Bà Nà!'
  },
  {
    name: 'Ms. Sarah Connor',
    role: 'Du khách Australia',
    avatar: '👩',
    stars: 5,
    comment: 'Splendid luxury pickup service. The Ford Tourneo Limousine is super comfortable. WiFi was incredibly fast and the driver offered bottles of cold water right when we got in. Absolute peace of mind for first-time visitors in Da Nang.'
  },
  {
    name: 'Trần Thị Thu Thảo',
    role: 'Trưởng nhóm teambuilding Hà Nội',
    avatar: '👩',
    stars: 5,
    comment: 'Đoàn mình 12 người đặt xe 16 chỗ Hyundai Solati đi Huế qua Đèo Hải Vân. Tài xế rất nhiệt tình dừng lại ở Vịnh Lăng Cô cho cả đoàn chụp ảnh lưu niệm cực đẹp. Xe rất rộng rãi, điều hòa mát lịm, giá cả lại niêm yết rõ ràng không phát sinh thêm.'
  }
];

export const FAQS = [
  {
    q: 'Bảng giá thuê xe đã bao gồm đầy đủ tất cả chi phí chưa? Có phát sinh không?',
    a: 'Giá của chúng tôi được niêm yết công khai và TRỌN GÓI. Đã bao gồm lương tài xế, nhiên liệu xe xăng dầu, phí cầu đường bến bãi đỗ xe và bảo hiểm hành khách. Tuyệt đối không phát sinh thêm bất cứ khoản phí ẩn nào khác ngoài thỏa thuận ban đầu.'
  },
  {
    q: 'Nếu chuyến bay của tôi bị hoãn hoặc delay, tôi có bị tính phí chờ đợi không?',
    a: 'Không! Chúng tôi liên tục cập nhật lịch trình bay trực tuyến của quý khách thông qua mã số chuyến bay cung cấp sẵn khi đặt xe. Tài xế sẽ chỉ xuất phát phù hợp với giờ đáp thực tế của quý khách và miễn phí chờ vô thời hạn, không thu phí delay sân bay.'
  },
  {
    q: 'Tôi nên đặt xe trước bao lâu trước chuyến đi?',
    a: 'Để đảm bảo điều phối xe tốt nhất, quý khách nên đăng ký lịch từ trước 1 ngày đến 1 tuần. Tuy nhiên, đối với các chuyến đón tiễn sân bay Đà Nẵng khẩn cấp đi Hội An, chúng tôi có thể điều chuyển xe đón nhanh trong vòng 15-30 phút sau khi xác nhận.'
  },
  {
    q: 'Hệ thống thanh toán của công ty hoạt động như thế nào?',
    a: 'Hệ thống đặt xe của chúng tôi bảo mật và không yêu cầu đặt cọc trước đối với đa số chuyến đi ngắn (như sảnh đón Sân Bay Đà Nẵng - Hội An). Lái xe đón quý khách an toàn và quý khách thanh toán trực tiếp bằng tiền mặt hoặc chuyển khoản ngân hàng số trực tiếp cho tài xế/văn phòng điều hành sau khi hoàn thành lộ trình.'
  },
  {
    q: 'Lái xe của công ty có được đào tạo chuyên nghiệp không?',
    a: '100% đội ngũ bác tài có giấy phép lái xe chuẩn hạng, kinh nghiệm trên 5 năm chạy tour khách du lịch nước ngoài và nội địa. Các tài xế phục vụ lịch sự, sạch sẽ, không hút thuốc lá trong xe, lái xe an toàn, điềm đạm, am hiểu địa hình miền Trung sâu sắc.'
  }
];
