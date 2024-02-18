<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TransactionHeader extends Model
{
    use HasFactory;
    protected $table = 'transaction_header';
    public $timestamps = false;
    protected $primarykey = ['document_code', 'document_number'];
    public $incrementing = false;

    protected $fillable = ["document_code",
    "document_number",
    "user",
    "total",
    "date",];

    public static function getSalesReport() {
        $data = DB::select("SELECT 
        CONCAT(transaction_header.document_code, ' ', transaction_header.document_number) AS transaction,
        login.user AS user,
        transaction_header.total,
        transaction_header.date,
        (
            SELECT GROUP_CONCAT(CONCAT(product.product_name, ' x ', transaction_detail.quantity) SEPARATOR '\n')
            FROM transaction_detail
            INNER JOIN product ON product.product_code = transaction_detail.product_code
            WHERE transaction_detail.document_number = transaction_header.document_number
            AND transaction_detail.document_code = transaction_header.document_code
        ) AS items
        FROM 
        transaction_detail
        LEFT JOIN transaction_header 
        ON transaction_detail.document_number = transaction_header.document_number 
        AND transaction_detail.document_code = transaction_header.document_code
        INNER JOIN login
        ON login.user = transaction_header.user
        group by transaction_header.document_number, transaction_header.document_code, login.user, transaction_header.total, transaction_header.date
        order by transaction_header.document_number");
        return $data;
    }
}
