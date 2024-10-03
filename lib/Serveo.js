const { spawn } = require('child_process');

// Function to connect to Serveo
function connectToServeo() {
    return new Promise((resolve, reject) => {
        const serveoCmd = ['ssh', '-n', '-R', '80:127.0.0.1:8000', 'serveo.net']; // Added '-n'

        const serveoProcess = spawn(serveoCmd[0], serveoCmd.slice(1), {
            stdio: 'pipe', // Capture output
            shell: true
        });

        serveoProcess.stdout.on('data', (data) => {
            
            // Regular expression to extract the URL
            const urlRegex = /(https?:\/\/[^\s]+)/g; 
            const match = data.toString().match(urlRegex);
            
            if (match) {
                const url = match[0]; // Get the first matched URL
                resolve(url);
            }
        });


        // Capture standard error output
        serveoProcess.stderr.on('data', (data) => {
            console.error(`Serveo Error: ${data}`); // Log any errors
        });

        // Handle process exit
        serveoProcess.on('close', (code) => {
            console.log(`Serveo process exited with code ${code}`);
            if (code !== 0) {
                reject(`Serveo connection failed with code ${code}`);
            }
        });
    });
}

// Export the function to be used in other files
module.exports = {
    connectToServeo
};
