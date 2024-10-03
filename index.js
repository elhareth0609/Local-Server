// Import Firebase and Serveo modules
const { updateFirebaseUrl } = require('./lib/FireBase');
const { connectToServeo } = require('./lib/Serveo');

// Main function
(async () => {
    try {
        console.log('Connecting to Serveo...');
        const serveoUrl = await connectToServeo();
        console.log(serveoUrl);

        // Store or update the URL in Firebase
        await updateFirebaseUrl(serveoUrl);
    } catch (error) {
        console.error('Error:', error);
    }
})();
