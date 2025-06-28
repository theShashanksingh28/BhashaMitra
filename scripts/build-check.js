#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build prerequisites...');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found');
  process.exit(1);
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
}

// Check if dist directory exists and clean it
if (fs.existsSync('dist')) {
  console.log('🧹 Cleaning dist directory...');
  fs.rmSync('dist', { recursive: true, force: true });
}

console.log('✅ Build prerequisites check completed');
console.log('�� Ready to build!'); 