insert into login values('smit', 'smity', '');

insert into product values
('SKUSKILNP', 'so klin pewangi', 15000, 'IDR', 0, '13 cm x 10 cm', 'PCS'),
('SKUSKILNB', 'GIV Biru', 11000, 'IDR', 0, '13 cm x 10 cm', 'PCS'),
('SKUSKILNG', 'So klin liquid', 18000, 'IDR', 0, '13 cm x 10 cm', 'PCS');

SELECT 
  CONCAT(transaction_header.document_code, " ", transaction_header.document_number) AS transaction,
  login.user AS user,
  transaction_header.total,
  transaction_header.date,
  (SELECT CONCAT(product.product_name, " X ",transaction_detail.quantity) 
  from transaction_detail 
  INNER JOIN product on product.product_code = transaction_detail.product_code 
  group by transaction_detail.document_number, transaction_detail.document_code
  order by transaction_detail.document_number)
FROM 
  transaction_detail
LEFT JOIN transaction_header 
  ON transaction_detail.document_number = transaction_header.document_number 
  AND transaction_detail.document_code = transaction_header.document_code
INNER JOIN login
  ON login.user = transaction_header.user
order by transaction_header.document_number



SELECT 
  CONCAT(transaction_header.document_code, " ", transaction_header.document_number) AS transaction,
  login.user AS user,
  transaction_header.total,
  transaction_header.date,
  (
    SELECT GROUP_CONCAT(CONCAT(product.product_name, ' x ', transaction_detail.quantity) SEPARATOR '\n\t\t\t\t')
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
order by transaction_header.document_number;