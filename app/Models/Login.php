<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Login extends Model
{
    use HasFactory;
    protected $table = 'login';
    public $timestamps = false;
    protected $primarykey = 'user';
    public $incrementing = false;

    protected $fillable = [
        'user',
        'password',
        'token'
    ];

    protected $hidden = [
        'password',
    ];
}
