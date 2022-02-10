# Ronda della Carità - Verona
La Ronda della Carità è una associazione di carità che 365 giorni all'anno di sera esce con turni di 10 volontari e 4 mezzi per distribuire pasti e raccogliere ordini e distribuzione di vestiario e coperte per persone senza fissa dimora.

#NoProfit


# Installazione

1. Installare globalmente angular:
```
npm install -g @angular/cli
```

2. Scaricare il progetto
3. Entrare nella cartella ```/ronda-della-carita``` 
4. Eseguire nel terminale:
```
npm install
```

5. Entrare nella cartella ```/back-office```
6. Eseguire nel terminale:
```
composer update
```


# Collegamento DB

Nella cartella ```/back-office``` cercare il file ```.env.example```
Creare file ```.env``` uguale al file ```.env.example```, e modificare il nome del database **DB_DATABASE = nome_db**


# Effettuare le migrazioni

Per creare la struttura del database, entrare nella cartella ```/back-office``` ed eseguire nel terminale:
```
php artisan migrate
```


# Serve

Nella cartella ```/back-office``` eseguire nel terminale:
```
php artisan serve
```

Nella cartella ```/ronda-della-carita``` eseguire nel terminale:
```
ng serve / ng s
```
Naviga in ```https://localhost:4200/```. L'applicazione automaticamente si ricarica ad ogni modifica dei file


# Hosting
Host Front-End: ```Netlify App```

Host Back-End: ```Heroku App```

Host Database: ```Heroku App``` (PostgreSQL)