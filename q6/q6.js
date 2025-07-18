const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the path of the file to delete: ', async (filePath) => {
    const fullPath = path.resolve(filePath.trim());
    try {
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
            await fs.rm(fullPath, { recursive: true, force: true });
            console.log(`Directory deleted: ${fullPath}`);
        } else {
            await fs.unlink(fullPath);
            console.log(`File deleted: ${fullPath}`);
        }
    } catch (err) {
        console.error(`Error: ${err.message}`);
    } finally {
        rl.close();
    }
});