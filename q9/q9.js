const fs = require('fs');
const path = require('path');

// Define a sample file path
const filePath = path.join(__dirname, 'sample.txt');
const renamedPath = path.join(__dirname, 'renamed.txt');

fs.writeFile(filePath, 'This is a test file.', (err) => {
    if (err) return console.error('Write error:', err);
    console.log('File written successfully.');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return console.error('Read error:', err);
        console.log('File content:', data);
        if (fs.existsSync(filePath)) {
            console.log('File exists.');
            fs.rename(filePath, renamedPath, (err) => {
                if (err) return console.error('Rename error:', err);
                console.log(`File renamed to ${renamedPath}`);

                fs.appendFile(renamedPath, '\nAppended line.', (err) => {
                    if (err) return console.error('Append error:', err);
                    console.log('Line appended.');

                    const stats = fs.statSync(renamedPath);
                    console.log('File stats:', stats);

                   
                });
            });
        } else {
            console.log('File does not exist.');
        }
    });
});