function getResponse(input) {
    const message = input.toLowerCase();

    if (message.includes('symptom')) {
        return "Can you describe your symptoms in more detail?";
    } else if (message.includes('fever')) {
        return "A fever can be a sign of infection. Please monitor your temperature and consult a doctor if it persists.";
    } else if (message.includes('appointment')) {
        return "You can book an appointment by calling our clinic or using the health app.";
    } else if (message.includes('covid')) {
        return "If you suspect COVID-19, please get tested and isolate until results arrive.";
    } else if (message.includes('bye')) {
        return "Take care! If you need further assistance, feel free to come back.";
    } else {
        return "I'm here to help with healthcare-related questions. Could you clarify your concern?";
    }
}

module.exports = { getResponse };