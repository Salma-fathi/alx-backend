import redis from 'redis';

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

// For older versions of redis package
client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', function (err) {
  console.log(`Redis client not connected to the server: ${err}`);
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.error('Error setting value:', err);
    } else {
      console.log('Set operation reply:', reply);
    }
  });
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(result);
  });
}

// Remove .connect() for older versions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
