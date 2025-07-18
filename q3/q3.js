const readline = require('readline');
const { getResponse } = require('./healthbot');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'You: '
});

console.log("🩺 Welcome to HealthBot! Ask me anything about symptoms, appointments, or COVID-19.");
rl.prompt();

rl.on('line', (line) => {
    const userInput = line.trim();
    const botReply = getResponse(userInput);
    console.log(`Bot: ${botReply}`);

    if (userInput.toLowerCase().includes('bye')) {
        rl.close();
    } else {
        rl.prompt();
    }
});

rl.on('close', () => {
    console.log('👋 Chat ended. Stay healthy!');
    process.exit(0);
});