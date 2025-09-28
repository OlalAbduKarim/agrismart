
export interface Listing {
  id: number;
  type: 'land' | 'product';
  title: string;
  price: string;
  location: string;
  image: string;
  seller: string;
  sellerPhoto: string;
  size?: string; // acres for land
  rating?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
  image?: string;
}

export interface Forecast {
  day: string;
  icon: string;
  temp: number;
}

export interface WeatherData {
  district: string;
  temperature: number;
  condition: string;
  icon: string;
  forecast: Forecast[];
}

export interface Conversation {
  id: number;
  userName: string;
  userPhoto: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  listingTitle: string;
}

export interface DirectMessage {
  id: number;
  text: string;
  timestamp: string;
  senderId: 'me' | 'other';
}
