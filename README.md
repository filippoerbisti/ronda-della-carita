# Ronda della Carità - Verona
La Ronda della Carità è una associazione di carità che 365 giorni all'anno di sera esce con turni di 10 volontari e 4 mezzi per distribuire pasti e raccogliere ordini e distribuzione di vestiario e coperte per persone senza fissa dimora.

#NoProfit


# Introduzione
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=filippoerbisti&layout=compact)](https://github.com/filippoerbisti/ronda-della-carita)
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=filippoerbisti&layout=compact&langs_count=8)](https://github.com/filippoerbisti/ronda-della-carita)

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
composer install
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

# Testing
>sium
>sium
``` sql
SELECT FATT.idstato,
coalesce(FATT.descrizionestato, '') as descrizionestato, 
FATT.sottostato, 
FATT.tipo, 
FATT.idsocieta, 
FATT.data, 
FATT.totfatture, 
FATT.tipofattura 
FROM ( 
SELECT ST.id as idstato, ST.descrizione as descrizionestato, coalesce(FSU.sottostato, 0) as sottostato, coalesce(AST.tipo, '') as tipo 
, FE.idsocieta, min(FSU.datastato) as data, count(*) as totfatture,FE.tipofattura 
from jfel_tagxml_fatturaelettronica FE 
inner join jfel_fatture_stati FSU on FE.idstatocorrente = FSU.id 
inner join jfel_stati ST on FSU.idstato = ST.id 
inner join jfel_alert_stati AST on ST.id = AST.idstato 
	and coalesce(FSU.sottostato, 0) = AST.sottostato 
where FSU.datastato >= ? 
group by ST.id, ST.descrizione, FSU.sottostato, AST.tipo, FE.idsocieta,FE.tipofattura 
) FATT 
group by FATT.idstato, FATT.descrizionestato, FATT.sottostato, FATT.tipo, FATT.idsocieta , FATT.data, FATT.totfatture,FATT.tipofattura
```


