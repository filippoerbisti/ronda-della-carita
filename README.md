# Ronda della Carità - Verona
La Ronda della Carità è una associazione di carità che 365 giorni all'anno di sera esce con turni di 10 volontari e 4 mezzi per distribuire pasti e raccogliere ordini e distribuzione di vestiario e coperte per persone senza fissa dimora.

#NoProfit

# Installazione

1. Installare globalmente angular:
```
npm install -g @angular/cli
```

2. Scaricare il progetto
3. Entrare nella cartella ronda-della-carità ed eseguire npm install nel terminale
Una volta scaricato il progetto, nella cartella del frontend lanciare i comandi:
```
npm install
npm install -g yarn
yarn add axios
```
Nella cartella del backend, invece, lanciare il comando:
```
composer update
```

# Collegare il DB al backend

Nel backend, creare il file **.env** e cercare la riga giusta in cui scrivere **DB_DATABASE=cinemissimo_db**.

# Effettuare le migrazioni
Per effettuare le migrazioni **(nome del database: cinemissimo_db)**, nella cartella del backend lanciare il comando
```
php artisan migrate
```




