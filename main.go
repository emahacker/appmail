package main

import (
    "fmt"
    "net/http"
    "gopkg.in/gomail.v2"
)

func sendReport(w http.ResponseWriter, r *http.Request) {
    m := gomail.NewMessage()
    m.SetHeader("From", "emanuele.zuffranieri@gmail.com")// Il tuo indirizzo email
    m.SetHeader("To", "segreteria@assocciazioneneden.eu")        // Email del destinatario
    m.SetHeader("Subject", "Report Tracciamento Tempo")  // Oggetto dell'email
    m.SetBody("text/plain", "Ecco il tuo report giornaliero.") // Corpo dell'email

    // Configurazione del dialer per il server SMTP
    d := gomail.NewDialer("smtp.gmail.com", 587, "emanuele.zuffranieri@gmail.com", "Pesciolina8183@")

    // Invia l'email
    if err := d.DialAndSend(m); err != nil {
        fmt.Fprintf(w, "Errore nell'invio del report: %v", err)
        return
    }

    fmt.Fprintf(w, "Report inviato correttamente!")
}

func main() {
    http.HandleFunc("/send-report", sendReport)

    fmt.Println("Server in ascolto sulla porta 8080...")
    http.ListenAndServe(":8080", nil)
}
