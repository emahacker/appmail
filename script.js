let socialTime = 0;
let webTime = 0;
let trackingInterval;

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTracking() {
    trackingInterval = setInterval(() => {
        socialTime += 1; // Simula incremento tempo sui social
        webTime += 2;    // Simula incremento tempo sul web

        document.getElementById('social-time').textContent = formatTime(socialTime);
        document.getElementById('web-time').textContent = formatTime(webTime);
    }, 1000); // Aggiorna ogni secondo
}

function stopTracking() {
    clearInterval(trackingInterval);
}

function sendReport() {
    fetch("/send-report")
        .then(response => response.text())
        .then(data => {
            alert(data); // Mostra messaggio di successo
        })
        .catch(error => {
            alert('Errore nell\'invio del report');
        });
}

// Event Listeners
document.getElementById('start-tracking').addEventListener('click', startTracking);
document.getElementById('stop-tracking').addEventListener('click', stopTracking);
document.getElementById('send-report').addEventListener('click', sendReport);
document.getElementById('send-report').addEventListener('click', function() {
    fetch('/send-report')
        .then(response => response.text())
        .then(data => {
            alert(data);  // Mostra un messaggio di successo o errore
        })
        .catch(error => {
            alert('Errore nell\'invio del report');
        });
});
