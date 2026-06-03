import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/api/*', cors())

// API routes for CropCortex mobile app backend
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', product: 'CropCortex', version: '1.0.0', tagline: 'Khet ki samajh, haath mein.' })
})

app.get('/api/prices', (c) => {
  return c.json({
    district: 'Nashik',
    date: new Date().toISOString().split('T')[0],
    prices: [
      { crop: 'Tomato', variety: 'Red', price: 2450, prevPrice: 2264, change: 8.2, mandi: 'Nashik APMC', unit: '₹/qtl' },
      { crop: 'Onion', variety: 'Red', price: 1890, prevPrice: 1950, change: -3.1, mandi: 'Lasalgaon', unit: '₹/qtl' },
      { crop: 'Cotton', variety: 'Medium Staple', price: 6800, prevPrice: 6720, change: 1.2, mandi: 'Jalgaon APMC', unit: '₹/qtl' },
      { crop: 'Wheat', variety: 'Sharbati', price: 2275, prevPrice: 2244, change: 1.4, mandi: 'Azadpur', unit: '₹/qtl' },
      { crop: 'Rice', variety: 'Basmati 1121', price: 3850, prevPrice: 3790, change: 1.6, mandi: 'Karnal', unit: '₹/qtl' },
      { crop: 'Sugarcane', variety: 'Co-86032', price: 355, prevPrice: 350, change: 1.4, mandi: 'Kolhapur', unit: '₹/qtl' },
    ],
  })
})

app.get('/api/field/:id', (c) => {
  return c.json({
    id: c.req.param('id'),
    name: 'Kharif 2025',
    crop: 'Tomato',
    variety: 'Hybrid Arka Rakshak',
    area: '1.4 ha',
    stage: 'Flowering',
    ndviScore: 76,
    lastUpdated: '2 days ago',
    stressNote: 'Moderate stress detected in north plot',
    ndviHistory: [
      { month: 'May', score: 45 }, { month: 'Jun', score: 58 }, { month: 'Jul', score: 72 },
      { month: 'Aug', score: 80 }, { month: 'Sep', score: 78 }, { month: 'Oct', score: 76 },
    ],
  })
})

app.get('/api/advisory', (c) => {
  return c.json({
    week: 'Oct 13–19, 2025',
    tasks: [
      { day: 'Monday', task: 'Apply urea fertilizer — 30 kg/acre', crop: 'Tomato', priority: 'critical', time: 'Morning' },
      { day: 'Wednesday', task: 'Rain expected — skip pesticide application', crop: 'All', priority: 'critical', time: 'All Day' },
      { day: 'Friday', task: 'Apply neem oil spray for whitefly control', crop: 'Cotton', priority: 'optional', time: 'Evening' },
    ],
    aiSummary: [
      '🌧 Rain expected Wednesday — avoid pesticide spray Tuesday evening.',
      '🌡 High temperature alert Thu–Fri — irrigate morning only.',
      '🌿 Tomato flowering stage: apply potassium sulphate for better fruit set.',
      '📊 NDVI shows stress in north plot — inspect for nutrient deficiency.',
    ],
  })
})

app.get('/api/yield/:fieldId', (c) => {
  return c.json({
    fieldId: c.req.param('fieldId'),
    yieldRange: '2.8 – 3.4',
    unit: 'tonnes/acre',
    confidence: 81,
    factors: [
      { label: 'NDVI Score', value: '76/100', status: 'good' },
      { label: 'Rainfall (30d)', value: '48mm', status: 'warning' },
      { label: 'Temp Deviation', value: '+1.2°C', status: 'warning' },
      { label: 'Soil Moisture', value: 'Good', status: 'good' },
    ],
    comparison: { yourField: 3.1, districtAvg: 2.6, lastSeason: 2.9 },
  })
})

// Serve landing page
app.get('/', (c) => {
  return c.redirect('/static/index.html')
})

export default app
