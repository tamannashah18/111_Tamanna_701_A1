# simple-ftp-module

A lightweight and easy-to-use Node.js module for performing FTP operations using [`basic-ftp`](https://www.npmjs.com/package/basic-ftp). Upload, download, list, and manage files on remote FTP servers with a clean, promise-based API.

## Features

- Upload files to an FTP server
- Download files from an FTP server
- List files in a remote directory
- Graceful connection and disconnection
- Promise-based and beginner-friendly

## Installation

```bash
npm install simple-ftp-module
```

## Eg-Usage:
``` js

const ftp = require('simple-ftp-module');
(async () => {
    try {
        const client = await ftp.connectToFTP('ftp.example.com', 'username', 'password');
        await ftp.listFiles(client);
        await ftp.uploadFile(client, './local.txt', 'remote.txt');
        await ftp.downloadFile(client, 'remote.txt', './downloaded.txt');
        ftp.closeConnection(client);
    } catch (err) {
        console.error('FTP Error:', err.message);
    }
})();

```

## API Documentation

### connectToFTP(host, user, password)
Connects to the FTP server and returns a client instance.
### uploadFile(client, localPath, remotePath)
Uploads a file from your local system to the FTP server.
### downloadFile(client, remotePath, localPath)
Downloads a file from the FTP server to your local system.
### listFiles(client, remoteDir = '.')
Lists files in the specified remote directory.
### closeConnection(client)
Closes the FTP connection.

## Requirements
- Node.js v14+
- Internet access to connect to FTP servers
