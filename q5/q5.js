const fs = require('fs');
const unzipper = require('unzipper');
const readline = require('readline');
const path = require('path');

// Function to extract ZIP

async function extractZip(zipPath, outputDir) {
    const resolvedZipPath = path.resolve(zipPath);
    const resolvedOutputDir = path.resolve(outputDir);

    if (!fs.existsSync(resolvedZipPath)) {
        console.error(`❌ ZIP file not found: ${resolvedZipPath}`);
        return;
    }

    try {
        const directory = await unzipper.Open.file(resolvedZipPath);
        await Promise.all(directory.files.map(async file => {
            const filePath = path.join(resolvedOutputDir, file.path);
            if (file.type === 'File') {
                await file.stream().pipe(fs.createWriteStream(filePath));
                console.log(`✅ Extracted: ${file.path}`);
            }
        }));
        console.log(`🎉 Extraction complete to: ${resolvedOutputDir}`);
    } catch (err) {
        console.error(`❌ Extraction failed: ${err.message}`);
    }
}

// If command-line args are provided
if (process.argv.length >= 4) {
    const zipPath = process.argv[2];
    const outputDir = process.argv[3];
    extractZip(zipPath, outputDir);
} else {
    // Use readline for interactive input
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter path to ZIP file: ', (zipPath) => {
        rl.question('Enter destination folder: ', (outputDir) => {
            extractZip(zipPath.trim(), outputDir.trim());
            rl.close();
        });
    });
}