<?php

namespace App\Http\Controllers;

use App\Mail\SendMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendEmail($id)
    {
        $user = User::where('id', $id)->first();
        $title = '[Conferma registrazione] Grazie per la tua registrazione';
        $customer_details = [
            'nome' => $user['nome'],
            'cognome' => $user['cognome'],
            'ruolo' => $user['ruolo'],
            'n_tessera' => $user['n_tessera'],
            'email' => 'rondacard.dellacarita@gmail.com',
            'password' => $user['password']
        ];

        $sendmail = Mail::to($customer_details['email'])->send(new SendMail($title, $customer_details));
        if (empty($sendmail)) {
            return response()->json(['message' => 'Mail Sent Sucssfully'], 200);
        }else{
            return response()->json(['message' => 'Mail Sent fail'], 400);
        }
    }
}
