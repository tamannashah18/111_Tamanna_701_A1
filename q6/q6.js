const readline = require('readline');
const fs = require('fs');
const util = require('util');

const unlinkAsync = util.promisify(fs.unlink);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the path of the file to delete: ', async (filePath) => {
    try {
        await unlinkAsync(filePath.trim());
        console.log(`File deleted: ${filePath}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    } finally {
        rl.close();
    }
});