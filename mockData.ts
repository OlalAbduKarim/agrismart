import type { Listing } from './types';

export const mockLandListings: Listing[] = [
  { id: 1, type: 'land', title: 'Fertile Land in Mbarara', price: 'UGX 500,000', location: 'Mbarara, Kashari', image: 'https://picsum.photos/seed/land1/400/300', size: '2 Acres', seller: 'John K.', sellerPhoto: 'https://picsum.photos/seed/seller1/100', soilType: 'Loam', landUse: 'Arable', waterSource: true, lat: -0.6050, lng: 30.6552, aiTips: ['Intercropping', 'Drought-resistant crops'] },
  { id: 2, type: 'land', title: 'Lakeside Plot', price: 'UGX 1,200,000', location: 'Wakiso, Entebbe', image: 'https://picsum.photos/seed/land2/400/300', size: '5 Acres', seller: 'Peter A.', sellerPhoto: 'https://picsum.photos/seed/seller3/100', soilType: 'Sandy', landUse: 'Commercial', waterSource: true, lat: 0.0566, lng: 32.4627, aiTips: ['Organic farming'] },
  { id: 3, type: 'land', title: 'Rich Loam Soil', price: 'UGX 800,000', location: 'Mbale, Budadiri', image: 'https://picsum.photos/seed/land3/400/300', size: '3 Acres', seller: 'Mbale Farmers Coop', sellerPhoto: 'https://picsum.photos/seed/seller6/100', soilType: 'Loam', landUse: 'Arable', waterSource: false, lat: 1.0821, lng: 34.1759, aiTips: ['Organic farming', 'Zero tillage'] },
  { id: 4, type: 'land', title: 'Gulu Farmland', price: 'UGX 400,000', location: 'Gulu', image: 'https://picsum.photos/seed/land4/400/300', size: '10 Acres', seller: 'David O.', sellerPhoto: 'https://picsum.photos/seed/seller9/100', soilType: 'Black Cotton', landUse: 'Grazing', waterSource: false, lat: 2.7725, lng: 32.2884, aiTips: ['Drought-resistant crops'] },
];

export const mockProductListings: Listing[] = [
  { id: 101, type: 'product', title: 'Organic Maize', price: 'UGX 1,500 / Kg', location: 'Jinja', image: 'https://picsum.photos/seed/prod1/400/300', seller: 'Maria N.', sellerPhoto: 'https://picsum.photos/seed/seller2/100' },
  { id: 102, type: 'product', title: 'Fresh Matooke', price: 'UGX 20,000 / bunch', location: 'Masaka', image: 'https://picsum.photos/seed/prod2/400/300', seller: 'Aisha K.', sellerPhoto: 'https://picsum.photos/seed/seller4/100' },
  { id: 103, type: 'product', title: 'NPK Fertilizer', price: 'UGX 150,000 / bag', location: 'Kampala', image: 'https://picsum.photos/seed/prod3/400/300', seller: 'Agro Supplies Ltd', sellerPhoto: 'https://picsum.photos/seed/seller5/100' },
  { id: 104, type: 'product', title: 'High-Yield Beans Seeds', price: 'UGX 5,000 / Kg', location: 'Mbale', image: 'https://picsum.photos/seed/prod4/400/300', seller: 'Mbale Farmers Coop', sellerPhoto: 'https://picsum.photos/seed/seller6/100' },
  { id: 105, type: 'product', title: 'Walking Tractor', price: 'UGX 3,500,000', location: 'Arua', image: 'https://picsum.photos/seed/prod5/400/300', seller: 'Mechanics Inc.', sellerPhoto: 'https://picsum.photos/seed/seller7/100' },
  { id: 106, type: 'product', title: 'Irish Potatoes', price: 'UGX 2,000 / Kg', location: 'Kabale', image: 'https://picsum.photos/seed/prod6/400/300', seller: 'Sarah T.', sellerPhoto: 'https://picsum.photos/seed/seller8/100' },
];

export const mockFeaturedListings: Listing[] = [
    mockLandListings[0], // id: 1
    mockProductListings[0], // id: 101
    mockLandListings[1], // id: 2
    mockProductListings[1], // id: 102
];

export const ALL_MOCK_LISTINGS = [...mockLandListings, ...mockProductListings];
