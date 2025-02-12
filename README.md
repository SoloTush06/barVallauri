# Vallauri Bar ![Vallauri Bar Logo](https://github.com/SoloTush06/VallauriBar/blob/main/assets/Logo1.png?raw=true)

Vallauri Bar è un gestionale per il bar della scuola, inizialmente sviluppato come applicazione web in C# e successivamente convertito in un'app mobile utilizzando Cordova. L'app consente una gestione facile e rapida delle operazioni di acquisto e vendita nel bar, sia per i clienti che per il personale del bar.

---

## Funzionalità

### Per i Clienti:
- ✅ **Visualizzazione del menù del bar.**
- 🛒 **Possibilità di aggiungere prodotti al carrello.**
- 📊 **Accesso al resoconto degli ordini mensili.**
- 🏆 **Classifica degli utenti con il maggior numero di acquisti presso il bar.**

### Per il Bar:
- ❌ **Segnalazione dei prodotti esauriti.**
- 💰 **Resoconto del fatturato mensile.**
- 🧾 **Possibilità di stampare la ricevuta per ogni ordine.**

---

## Come Funziona?

1. **Accesso dell'utente**: L'utente si connette con le proprie credenziali.
2. **Visualizzazione del menù**: Dopo l'accesso, l'utente può visualizzare il menù del bar e selezionare i prodotti desiderati, che vengono aggiunti al carrello.
3. **Conferma dell'ordine**: Una volta completata la selezione, l'utente conferma l'ordine. Questo viene inviato al bar per il controllo della disponibilità dei prodotti.
   - ✅ **Disponibilità positiva**: L'ordine viene confermato e viene generato un codice unico per il ritiro.
   - ❌ **Disponibilità negativa**: Se qualche prodotto non è disponibile, l'utente riceve un messaggio con l'elenco dei prodotti disponibili e non disponibili, con la possibilità di procedere comunque con l'ordine solo per i prodotti disponibili.
4. **Stampa della ricevuta**: Al termine dell'ordine, sarà generata una ricevuta in formato PDF che l'utente potrà scaricare.
5. **Storico degli ordini**: Gli utenti possono accedere allo storico degli ordini dell'ultimo mese, con la possibilità di generare un resoconto completo della spesa mensile.

### Funzionalità Opzionale:
Alla fine di ogni mese, viene pubblicata una classifica che mostra i 3 utenti con il maggior numero di ordini effettuati presso il bar. I vincitori riceveranno dei buoni da utilizzare nel mese successivo.

---

## Tecnologie Utilizzate

- 💻 **Backend**: C#
- 📱 **Mobile App**: Cordova
- 📦 **Database**: (Indicare il tipo di database utilizzato, se applicabile)
- 📑 **PDF Generation**: (Tecnologia o libreria utilizzata per generare la ricevuta PDF)

---

## Installazione

### Requisiti:
- Cordova
- (Eventuali altre dipendenze o librerie)

### Per avviare il progetto:
1. Clonare il repository:
   ```bash
   git clone https://github.com/tuo-username/vallauri-bar.git
