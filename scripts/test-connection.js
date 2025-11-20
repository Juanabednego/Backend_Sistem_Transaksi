const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing MongoDB Atlas connection...');
  console.log('URI:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
  
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ Connection successful!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('IP')) {
      console.log('\n💡 Possible solutions:');
      console.log('1. Add your IP to MongoDB Atlas whitelist');
      console.log('2. Use 0.0.0.0/0 for development (not recommended for production)');
      console.log('3. Check your network connection');
    }
    
    process.exit(1);
  }
}

testConnection();