export const userData = {
  name: 'Ramesh',
  fullName: 'Ramesh Patil',
  mobile: '+91 98765 43210',
  state: 'Maharashtra',
  district: 'Nashik',
  language: 'en',
  avatar: 'RP',
};

export const weatherData = {
  temp: 32,
  condition: 'Partly Cloudy',
  icon: 'partly-sunny-outline' as const,
  humidity: 68,
  windSpeed: 12,
  forecast: 'Rain expected Wednesday',
};

export const fieldData = {
  id: 'field-001',
  name: 'Kharif 2025',
  crop: 'Tomato',
  variety: 'Hybrid Arka Rakshak',
  area: '1.4 ha',
  stage: 'Flowering',
  ndviScore: 76,
  lastUpdated: '2 days ago',
  location: { lat: 19.9975, lng: 73.7898 },
  stressNote: 'Moderate stress detected in north plot',
  ndviHistory: [
    { month: 'May', score: 45 },
    { month: 'Jun', score: 58 },
    { month: 'Jul', score: 72 },
    { month: 'Aug', score: 80 },
    { month: 'Sep', score: 78 },
    { month: 'Oct', score: 76 },
  ],
  ndviZones: [
    { id: 'z1', status: 'healthy', x: 10, y: 20, width: 60, height: 40 },
    { id: 'z2', status: 'stress', x: 70, y: 10, width: 25, height: 30 },
    { id: 'z3', status: 'healthy', x: 10, y: 65, width: 40, height: 30 },
    { id: 'z4', status: 'critical', x: 55, y: 60, width: 20, height: 20 },
    { id: 'z5', status: 'stress', x: 75, y: 50, width: 20, height: 40 },
  ],
  soilReport: {
    uploaded: true,
    ph: 6.5,
    nitrogen: 'Medium',
    phosphorus: 'Low',
    potassium: 'High',
  },
};

export const fields = [
  { id: 'field-001', name: 'Main Plot — Tomato', crop: 'Tomato', active: true },
  { id: 'field-002', name: 'East Plot — Cotton', crop: 'Cotton', active: false },
  { id: 'field-003', name: 'River Side — Rice', crop: 'Rice', active: false },
];

export const alertData = {
  active: true,
  type: 'disease' as const,
  message: 'Possible Early Blight detected — 3 days ago. Tap to view.',
  diseaseId: 'early-blight',
  daysAgo: 3,
};

export const quickActions = [
  { id: 'diagnose', label: 'Diagnose Crop', icon: 'camera-outline' as const, color: '#2D6A4F', bgColor: 'rgba(45,106,79,0.1)' },
  { id: 'prices', label: 'Check Mandi Prices', icon: 'trending-up-outline' as const, color: '#E9C46A', bgColor: 'rgba(233,196,106,0.15)' },
  { id: 'advisory', label: 'View Advisory', icon: 'calendar-outline' as const, color: '#0891B2', bgColor: 'rgba(8,145,178,0.1)' },
  { id: 'soil', label: 'Soil Report', icon: 'flask-outline' as const, color: '#92400E', bgColor: 'rgba(146,64,14,0.1)' },
];

export const cropCalendarPeek = [
  { id: 'cal-1', day: 'Mon', date: 'Oct 14', task: 'Apply nitrogen fertilizer', crop: 'Tomato', urgency: 'critical', icon: '🌱' },
  { id: 'cal-2', day: 'Wed', date: 'Oct 16', task: 'Rain expected — no spray', crop: 'All', urgency: 'warning', icon: '🌧' },
  { id: 'cal-3', day: 'Fri', date: 'Oct 18', task: 'Neem oil spray for whitefly', crop: 'Cotton', urgency: 'normal', icon: '🧴' },
];

export const mandiPrices = [
  { id: 'p1', crop: 'Tomato', variety: 'Red', emoji: '🍅', price: 2450, prevPrice: 2264, change: 8.2, mandi: 'Nashik APMC', category: 'Vegetables' },
  { id: 'p2', crop: 'Onion', variety: 'Red', emoji: '🧅', price: 1890, prevPrice: 1950, change: -3.1, mandi: 'Lasalgaon', category: 'Vegetables' },
  { id: 'p3', crop: 'Cotton', variety: 'Medium Staple', emoji: '🌿', price: 6800, prevPrice: 6720, change: 1.2, mandi: 'Jalgaon APMC', category: 'Grains' },
  { id: 'p4', crop: 'Wheat', variety: 'Sharbati', emoji: '🌾', price: 2275, prevPrice: 2244, change: 1.4, mandi: 'Azadpur', category: 'Grains' },
  { id: 'p5', crop: 'Rice', variety: 'Basmati 1121', emoji: '🍚', price: 3850, prevPrice: 3790, change: 1.6, mandi: 'Karnal', category: 'Grains' },
  { id: 'p6', crop: 'Sugarcane', variety: 'Co-86032', emoji: '🌿', price: 355, prevPrice: 350, change: 1.4, mandi: 'Kolhapur', category: 'Grains' },
  { id: 'p7', crop: 'Soybean', variety: 'JS-335', emoji: '🫘', price: 4680, prevPrice: 4550, change: 2.9, mandi: 'Indore', category: 'Pulses' },
  { id: 'p8', crop: 'Potato', variety: 'Jyoti', emoji: '🥔', price: 1420, prevPrice: 1380, change: 2.9, mandi: 'Agra', category: 'Vegetables' },
  { id: 'p9', crop: 'Chilli', variety: 'Guntur Sannam', emoji: '🌶', price: 12500, prevPrice: 12800, change: -2.3, mandi: 'Guntur', category: 'Vegetables' },
  { id: 'p10', crop: 'Banana', variety: 'Grand Naine', emoji: '🍌', price: 1150, prevPrice: 1100, change: 4.5, mandi: 'Jalgaon', category: 'Fruits' },
  { id: 'p11', crop: 'Mango', variety: 'Alphonso', emoji: '🥭', price: 8500, prevPrice: 8200, change: 3.7, mandi: 'Ratnagiri', category: 'Fruits' },
  { id: 'p12', crop: 'Pomegranate', variety: 'Bhagwa', emoji: '🍎', price: 7200, prevPrice: 7400, change: -2.7, mandi: 'Solapur', category: 'Fruits' },
];

export const priceHistory = [
  { day: 1, price: 2100 },
  { day: 3, price: 2180 },
  { day: 5, price: 2050 },
  { day: 7, price: 2220 },
  { day: 10, price: 2350 },
  { day: 12, price: 2280 },
  { day: 14, price: 2190 },
  { day: 17, price: 2320 },
  { day: 19, price: 2400 },
  { day: 21, price: 2350 },
  { day: 24, price: 2420 },
  { day: 26, price: 2380 },
  { day: 28, price: 2500 },
  { day: 30, price: 2450 },
];

export const nearbyMandis = [
  { name: 'Nashik APMC', price: 2450, distance: '2 km' },
  { name: 'Pimpalgaon', price: 2380, distance: '12 km' },
  { name: 'Dindori', price: 2320, distance: '18 km' },
  { name: 'Vashi (Mumbai)', price: 2680, distance: '165 km' },
];

export const priceCategories = ['All', 'My Crops', 'Vegetables', 'Fruits', 'Grains', 'Pulses'];

export const diseases = {
  'early-blight': {
    id: 'early-blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    crop: 'Tomato',
    confidence: 94,
    severity: 'Moderate',
    severityValue: 0.6,
    description: 'Early blight is a common fungal disease affecting tomato leaves, stems, and fruits. It causes dark brown spots with concentric rings (target-like appearance) on older leaves first.',
    organicTreatment: [
      { step: 1, text: 'Remove and destroy infected leaves immediately to stop spread.', icon: '🍂' },
      { step: 2, text: 'Apply Trichoderma viride biofungicide — 5g per litre of water.', icon: '🧪' },
      { step: 3, text: 'Spray neem oil (3ml/litre) at 7-day intervals as preventive.', icon: '🌿' },
      { step: 4, text: 'Improve air circulation by pruning lower branches.', icon: '✂️' },
    ],
    chemicalTreatment: [
      { step: 1, text: 'Spray Mancozeb 75% WP @ 2.5g per litre of water.', icon: '💊' },
      { step: 2, text: 'Alternate with Chlorothalonil 75% WP @ 2g/litre after 10 days.', icon: '🔄' },
      { step: 3, text: 'Apply Copper Oxychloride 50% WP @ 3g/litre for severe cases.', icon: '⚠️' },
    ],
    dosageInfo: 'Apply in early morning or late evening. Use 500 litres of spray solution per hectare. Repeat at 10–14 day intervals. Do not harvest for 7 days after chemical spray.',
  },
  'powdery-mildew': {
    id: 'powdery-mildew',
    name: 'Powdery Mildew',
    scientificName: 'Erysiphe cichoracearum',
    crop: 'Cucumber',
    confidence: 88,
    severity: 'Mild',
    severityValue: 0.35,
    description: 'White powdery spots on leaves and stems. Common in humid conditions with poor air circulation.',
    organicTreatment: [
      { step: 1, text: 'Spray milk solution (1:9 ratio with water) on affected areas.', icon: '🥛' },
      { step: 2, text: 'Apply sulphur-based organic fungicide @ 3g/litre.', icon: '🧪' },
      { step: 3, text: 'Improve air circulation by proper spacing and pruning.', icon: '✂️' },
    ],
    chemicalTreatment: [
      { step: 1, text: 'Spray Karathane 48EC @ 1ml per litre of water.', icon: '💊' },
      { step: 2, text: 'Apply Hexaconazole 5% SC @ 2ml/litre for resistant strains.', icon: '🔄' },
    ],
    dosageInfo: 'Spray on both surfaces of leaves. Repeat every 7–10 days until symptoms subside. Use 400–500 litres of spray per hectare.',
  },
  'yellow-mosaic': {
    id: 'yellow-mosaic',
    name: 'Yellow Mosaic Virus',
    scientificName: 'Mungbean yellow mosaic India virus',
    crop: 'Soybean',
    confidence: 91,
    severity: 'Severe',
    severityValue: 0.85,
    description: 'Yellow mosaic pattern on leaves caused by whitefly-transmitted virus. Severely stunts growth and reduces yield by 50–85%.',
    organicTreatment: [
      { step: 1, text: 'Remove and destroy all infected plants immediately.', icon: '🔥' },
      { step: 2, text: 'Install yellow sticky traps (25/acre) to control whitefly vector.', icon: '🟡' },
      { step: 3, text: 'Spray neem oil (5ml/litre) to repel whiteflies.', icon: '🌿' },
      { step: 4, text: 'Use resistant varieties for next season (e.g., SL-688, Pusa 9531).', icon: '🌱' },
    ],
    chemicalTreatment: [
      { step: 1, text: 'Spray Imidacloprid 17.8% SL @ 0.5ml/litre to control whitefly.', icon: '💊' },
      { step: 2, text: 'Apply Thiamethoxam 25% WG @ 0.3g/litre as systemic treatment.', icon: '🔄' },
    ],
    dosageInfo: 'No cure for virus-infected plants. Focus on controlling the whitefly vector. Spray insecticides in evening to protect pollinators.',
  },
};

export const diagnosisHistory = [
  { id: 'dh-1', disease: 'Early Blight', crop: 'Tomato', date: 'Oct 11, 2025', severity: 'Moderate', confidence: 94 },
  { id: 'dh-2', disease: 'Powdery Mildew', crop: 'Cucumber', date: 'Oct 3, 2025', severity: 'Mild', confidence: 88 },
  { id: 'dh-3', disease: 'Yellow Mosaic Virus', crop: 'Soybean', date: 'Sep 22, 2025', severity: 'Severe', confidence: 91 },
  { id: 'dh-4', disease: 'Leaf Curl', crop: 'Tomato', date: 'Sep 15, 2025', severity: 'Moderate', confidence: 85 },
  { id: 'dh-5', disease: 'Late Blight', crop: 'Potato', date: 'Sep 8, 2025', severity: 'Severe', confidence: 92 },
];

export const advisoryTasks = [
  { id: 't1', date: '2025-10-14', task: 'Apply urea fertilizer — 30 kg/acre', crop: 'Tomato', field: 'Main Plot', time: 'Morning', priority: 'critical' as const, icon: 'leaf-outline', done: false },
  { id: 't2', date: '2025-10-14', task: 'Check for aphid infestation on lower leaves', crop: 'Tomato', field: 'Main Plot', time: 'Morning', priority: 'recommended' as const, icon: 'bug-outline', done: false },
  { id: 't3', date: '2025-10-15', task: 'Irrigate at root zone — avoid overhead spray', crop: 'Tomato', field: 'Main Plot', time: 'Evening', priority: 'recommended' as const, icon: 'water-outline', done: false },
  { id: 't4', date: '2025-10-16', task: 'Rain expected — skip pesticide application', crop: 'All', field: 'All Fields', time: 'All Day', priority: 'critical' as const, icon: 'rainy-outline', done: false },
  { id: 't5', date: '2025-10-17', task: 'Check soil moisture after rainfall', crop: 'Tomato', field: 'Main Plot', time: 'Morning', priority: 'recommended' as const, icon: 'analytics-outline', done: false },
  { id: 't6', date: '2025-10-18', task: 'Apply neem oil spray for whitefly control', crop: 'Cotton', field: 'East Plot', time: 'Evening', priority: 'optional' as const, icon: 'flask-outline', done: false },
  { id: 't7', date: '2025-10-19', task: 'Harvest first batch of ripe tomatoes', crop: 'Tomato', field: 'Main Plot', time: 'Morning', priority: 'recommended' as const, icon: 'basket-outline', done: false },
  { id: 't8', date: '2025-10-20', task: 'Apply potassium sulphate for fruit development', crop: 'Tomato', field: 'Main Plot', time: 'Morning', priority: 'critical' as const, icon: 'leaf-outline', done: false },
];

export const aiAdvisorySummary = [
  '🌧 Rain expected Wednesday — avoid pesticide spray Tuesday evening.',
  '🌡 High temperature alert Thu–Fri — irrigate morning only to reduce evaporation.',
  '🌿 Tomato flowering stage: apply potassium sulphate for better fruit set.',
  '📊 NDVI shows stress in north plot — inspect for possible nutrient deficiency.',
];

export const yieldForecast = {
  yieldRange: '2.8 – 3.4',
  unit: 'tonnes/acre',
  confidence: 81,
  factors: [
    { label: 'NDVI Score', value: '76/100', status: 'good' as const, icon: 'satellite-outline' },
    { label: 'Rainfall (30d)', value: '48mm', status: 'warning' as const, icon: 'rainy-outline' },
    { label: 'Temp Deviation', value: '+1.2°C', status: 'warning' as const, icon: 'thermometer-outline' },
    { label: 'Soil Moisture', value: 'Good', status: 'good' as const, icon: 'water-outline' },
  ],
  comparison: {
    yourField: 3.1,
    districtAvg: 2.6,
    lastSeason: 2.9,
  },
};

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

export const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
];

export const onboardingSlides = [
  {
    id: 1,
    headline: 'अपने खेत को समझें',
    subtitle: 'Understand your field.',
    body: 'Satellite maps, disease alerts, and mandi prices — all in one app. Made for Indian farmers.',
    visual: 'field',
  },
  {
    id: 2,
    headline: 'Crop Disease? Diagnose Instantly.',
    subtitle: '',
    body: 'Take a photo of a sick leaf. CropCortex identifies the disease and tells you exactly what to do — even offline.',
    visual: 'scan',
  },
  {
    id: 3,
    headline: 'Sell at the Right Time.',
    subtitle: '',
    body: 'See mandi prices across your district, get AI-powered sell timing recommendations.',
    visual: 'chart',
  },
];
