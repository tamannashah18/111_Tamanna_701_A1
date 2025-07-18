// ftpClient.js
const ftp = require('basic-ftp');

async function connectToFTP(host, user, password) {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host,
            user,
            password,
            secure: false // Set to true if using FTPS
        });
        console.log('Connected to FTP server.');
        return client;
    } catch (err) {
        console.error('Connection failed:', err.message);
        client.close();
        throw err;
    }
}

async function uploadFile(client, localPath, remotePath) {
    try {
        await client.uploadFrom(localPath, remotePath);
        console.log(`Uploaded ${localPath} to ${remotePath}`);
    } catch (err) {
        console.error('Upload failed:', err.message);
    }
}

async function downloadFile(client, remotePath, localPath) {
    try {
        await client.downloadTo(localPath, remotePath);
        console.log(`Downloaded ${remotePath} to ${localPath}`);
    } catch (err) {
        console.error('Download failed:', err.message);
    }
}

async function listFiles(client, remoteDir = '.') {
    try {
        const list = await client.list(remoteDir);
        console.log(`Files in ${remoteDir}:`);
        list.forEach(file => console.log(`- ${file.name}`));
    } catch (err) {
        console.error('Listing failed:', err.message);
    }
}

async function closeConnection(client) {
    client.close();
    console.log('Connection closed.');
}

module.exports = {
    connectToFTP,
    uploadFile,
    downloadFile,
    listFiles,
    closeConnection
};