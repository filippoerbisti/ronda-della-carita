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
        <h1>RONDA DELLA CARITA'</h1>
        <h2>Numero ordine: {{ $order->n_ordine }}</h2>
        <h2>Destinatario: {{ $client->nome }} {{ $client->cognome }} - N. {{ $client->n_tessera }}</h2>
        <h2>Punto Ritiro: {{ $order->p_ritiro }}</h2>
        <br>
        <h2>Riepilogo</h2>
        <table>
            <tr>
                <th>Vestiario</th>
                <th>Taglia</th>
                <th>Quantita</th>
            </tr>
            <?php
                
                foreach($clothe as $key){
                    echo "
                    <tr>
                        <td>$key->t_vestiario</td>
                        <td>$client->t_maglietta</td>
                        <td>$key->quantita</td>
                    </tr>
                    ";
                }
            ?>
        </table>
        <p>Creato il {{ $formatted_date }}</p>
    </body>
</html>