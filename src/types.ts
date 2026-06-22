export interface Vehicle {
  id: string;
  name: string;
  type: '4-seat' | '7-seat' | '16-seat' | 'limousine';
  models: string[];
  capacity: {
    passengers: number;
    luggage: number;
  };
  features: string[];
  pricePerKm: number;
  image: string;
  description: string;
}

export interface Route {
  id: string;
  name: string;
  slug: string;
  from: string;
  to: string;
  distanceKm: number;
  durationMin: number;
  prices: {
    '4-seat': number; // VNĐ
    '7-seat': number; // VNĐ
    '16-seat': number; // VNĐ
    'limousine'?: number; // VNĐ
  };
  highlights: string[];
  description: string;
  attractions: string[];
  imageUrl: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'assigned' | 'completed' | 'cancelled';

export interface Booking {
  id: string; // Dynamic ID, e.g., DNAH-XXXX
  customerName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  isRoundTrip: boolean;
  vehicleType: '4-seat' | '7-seat' | '16-seat' | 'limousine';
  estimatedCost: number;
  status: BookingStatus;
  flightNumber?: string;
  notes?: string;
  driverName?: string;
  driverPhone?: string;
  carPlate?: string;
  createdAt: string;
  securedHash: string; // Mock secure verification signature
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  famousFor: string;
  distanceFromDaNang: string;
}

export interface WeatherItem {
  temp: number;
  condition: string;
  forecast: string;
  humidity: string;
  windSpeed: string;
}

export interface WeatherData {
  danang: WeatherItem;
  hoian: WeatherItem;
  lastUpdated: string;
  sources: string[];
  isFallback?: boolean;
}
