#!/usr/bin/env node

/**
 * Educational Platform Backend Setup Script
 * This script helps set up the development environment
 */

const fs = require('fs');
const path = require('path');

console.log('?? Educational Platform Backend Setup');
console.log('=====================================\n');

// Create necessary directories
const directories = ['uploads', 'logs', 'docs'];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`? Created directory: ${dir}/`);
  } else {
    console.log(`?? Directory already exists: ${dir}/`);
  }
});

// Check if .env exists
if (!fs.existsSync('.env')) {
  if (fs.existsSync('.env.example')) {
    fs.copyFileSync('.env.example', '.env');
    console.log('? Created .env file from .env.example');
    console.log('??  Please edit .env file with your configuration');
  } else {
    console.log('? .env.example not found');
  }
} else {
  console.log('?? .env file already exists');
}

// Display setup information
console.log('\n?? Setup Information:');
console.log('=====================');
console.log('?? Platform Features:');
console.log('  • 10 Subject categories (STEM, Humanities, Languages, Arts, Social Sciences)');
console.log('  • 52+ Comprehensive lessons');
console.log('  • 1,820+ Interactive exercises');
console.log('  • 6 Languages supported (EN, EL, DE, IT, FR, TR)');
console.log('  • Advanced filtering and search');
console.log('  • Role-based access control');

console.log('\n?? Demo Accounts:');
console.log('  ????? Student: demo@example.com / demo123');
console.log('  ????? Teacher: teacher@edugames.com / teacher123');
console.log('  ????? Admin: admin@edugames.com / admin123');

console.log('\n?? Next Steps:');
console.log('  1. Edit .env file with your configuration');
console.log('  2. Run: npm run dev');
console.log('  3. Visit: http://localhost:3001/api/health');
console.log('  4. Test with demo accounts');

console.log('\n?? Documentation:');
console.log('  • README.md - Complete setup guide');
console.log('  • docs/API.md - Detailed API documentation');
console.log('  • .env.example - Configuration options');

console.log('\n?? Deployment Options:');
console.log('  • Railway: https://railway.app (Recommended)');
console.log('  • Heroku: https://heroku.com');
console.log('  • DigitalOcean: https://digitalocean.com');

console.log('\n? Setup completed successfully!');
console.log('Run "npm run dev" to start the development server.\n');