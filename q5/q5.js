const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

async function unzipFile(sourcePath, destinationPath) {
    // Validate source and destination paths
    if (!sourcePath || !destinationPath) {
        console.error('Usage: node unzip.js <source_zip_file> <destination_directory>');
        process.exit(1); 
    }

    // Ensure the source file exists
    if (!fs.existsSync(sourcePath)) {
        console.error(`Error: Source file not found at ${sourcePath}`);
        process.exit(1); 
    }

    // Resolve absolute paths for security and consistency
    const absoluteSourcePath = path.resolve(sourcePath);
    const absoluteDestinationPath = path.resolve(destinationPath);

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(absoluteDestinationPath)) {
        fs.mkdirSync(absoluteDestinationPath, { recursive: true });
    }

    try {
        await fs.createReadStream(absoluteSourcePath)
            .pipe(unzipper.Extract({ path: absoluteDestinationPath }))
            .promise();
        console.log(`Successfully unzipped "${absoluteSourcePath}" to "${absoluteDestinationPath}"`); // {Link: According to DEV Community, logging is crucial for identifying issues, debugging, and monitoring the health of your Node.js application https://dev.to/romulo.gatto/error-handling-and-logging-in-node-js-d0e354d8c24b}.
    } catch (err) {
        console.error(`Error unzipping file: ${err.message}`);
        process.exit(1);
    }
}

// Get source and destination paths from command-line arguments
const [, , source, destination] = process.argv;

unzipFile(source, destination); 