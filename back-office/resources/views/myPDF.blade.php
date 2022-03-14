<!DOCTYPE html>
<html lang="it">
<<<<<<< HEAD

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>PDF</title>
</head>

<body>

    <h3>diocan</h3>

    

</body>

=======
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>PDF</title>
    </head>
    <body>
        <h1>Id: {{ $title->id }}</h1>
        <h1>Punto Ritiro: {{ $title->p_ritiro }}</h1>
        <h1>{{$date}}</h1>
        <?php
        foreach($date as $key){
            echo "<h1>Vestiario: $key->t_vestiario</h1>";
            echo "<h1>Taglia: $key->taglia</h1>";
            echo "<h1>Quantita': $key->quantita</h1>";
        }
        ?>
    </body>
>>>>>>> e9d98f8f038868688cc94c5c08966dfccb6b03ee
</html>