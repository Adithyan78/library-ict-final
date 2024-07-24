const { exec } = require('child_process');

// Command to start nodemon for each script
const script1 = exec('nodemon index.js');
const script2 = exec('nodemon indext.js');

script1.stdout.on('data', data => console.log('Script 1:', data.toString()));
script2.stdout.on('data', data => console.log('Script 2:', data.toString()));

// Optional: Handle errors from the child processes
script1.stderr.on('data', data => console.error('index Error:', data.toString()));
script2.stderr.on('data', data => console.error('indext Error:', data.toString()));
