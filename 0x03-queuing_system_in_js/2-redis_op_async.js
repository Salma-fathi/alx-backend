import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

// Promisify methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', function (err) {
  console.log(`Redis client not connected to the server: ${err}`);
});

async function setNewSchool(schoolName, value) {
  try {
    const reply = await setAsync(schoolName, value);
    console.log('Reply:', reply);
  } catch (error) {
    console.error('Error setting school:', error);
  }
}

async function displaySchoolValue(schoolName) {
  try {
    const result = await getAsync(schoolName);
    console.log(result);
  } catch (error) {
    console.error('Error displaying school value:', error);
  }
}

async function main() {
  await displaySchoolValue('Holberton');
  await setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

main();