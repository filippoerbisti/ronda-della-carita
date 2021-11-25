# Ronda della Carità - Verona
La Ronda della Carità è una associazione di carità che 365 giorni all'anno di sera esce con turni di 10 volontari e 4 mezzi per distribuire pasti e raccogliere ordini e distribuzione di vestiario e coperte per persone senza fissa dimora.

#NoProfit

# Installazione

1. Installare globalmente angular:
```
npm install -g @angular/cli
```

2. Scaricare il progetto
3. Entrare nella cartella ronda-della-carità 
4. Eseguire nel terminale:
```
npm install
```

5. Entrare nella cartella back-office
6. Eseguire nel terminale:
```
composer install
```

# Collegare il DB al backend

Nella cartella ```/back-office``` cercare il file ```.env.example```
Creare file ```.env``` uguale al file ```.env.example```
Nel backend, creare il file **.env** e cercare la riga giusta in cui scrivere **DB_DATABASE=cinemissimo_db**.

# Effettuare le migrazioni
Per effettuare le migrazioni **(nome del database: cinemissimo_db)**, nella cartella del backend lanciare il comando
```
php artisan migrate
```




