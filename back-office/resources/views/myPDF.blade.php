<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>PDF</title>
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }
        </style>
    </head>
    <body>
        <h2>Id: {{ $title->id }}</h2>
        <h2>Punto Ritiro: {{ $title->p_ritiro }}</h2>
        <table>
            <tr>
                <th>Vestiario</th>
                <th>Taglia</th>
                <th>Quantita</th>
            </tr>
            <?php
                foreach($date as $key){
                    echo "<tr>";
                        echo "<td>$key->t_vestiario</td>";
                        echo "<td> $key->taglia</td>";
                        echo "<td>$key->quantita</td>";
                    echo "</tr>";
                }
            ?>
    </body>
</html>