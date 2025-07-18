const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
function zipFolder(sourceFolder, outPath) {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Maximum compression
    });

    output.on('close', () => {
        console.log(`Zip created: ${outPath} (${archive.pointer()} total bytes)`);
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);
    archive.directory(sourceFolder, false);
    archive.finalize();
}

const folderToZip = path.join(__dirname, 'public'); 
const zipOutputPath = path.join(__dirname, 'public.zip');

zipFolder(folderToZip, zipOutputPath);