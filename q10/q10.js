const readline = require('readline');
const path = require('path');
const ftpClient = require('simple-ftp-module'); // Adjust path if needed

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

(async () => {
    try {
        const host = await ask('FTP Host: ');
        const user = await ask('Username: ');
        const password = await ask('Password: ');

        const client = await ftpClient.connectToFTP(
            host.replace(/^ftp:\/\//, ''), // sanitize input
            user,
            password
        );

        await ftpClient.listFiles(client);

        // Optional: Upload and download
        const localUploadPath = path.join(__dirname, 'local.txt');
        const remoteUploadPath = 'remote.txt';
        await ftpClient.uploadFile(client, localUploadPath, remoteUploadPath);

        const localDownloadPath = path.join(__dirname, 'downloaded.txt');
        await ftpClient.downloadFile(client, remoteUploadPath, localDownloadPath);

        await ftpClient.closeConnection(client);
    } catch (err) {
        console.error('Fatal error:', err.message);
    } finally {
        rl.close();
    }
})();