use LibraryManagementDb;
select * from books;
select 
    b.BOOK_PK,b.name as BOOK_NAME,
    b.ISBN,b.CATEGORY_FK,
    c.name as CATEGORY_NAME,b.AUTHOR_NAME,b.PUBLICATION_BY_FK,p.name as PUBLICATION_NAME,
    b.PUBLICATION_YEAR,b.NUMBER_OF_PAGE,b.PRICE,b.QUANTITY
    from books as b 
    join categorys as c 
    on b.CATEGORY_FK=c.CATEGORY_PK 
    join publishers as p 
    on b.publication_by_fk=p.publisher_pk;
    
select * from customers;
insert IGNORE  into customers (name,phone,customer_type,mail,address) 
values ('uday','01830546042',1,'udayusq@gmail.com','merul badda,dhaka');

select * from sales where DATE(SALE_TIME) between '2020-10-1' and '2020-10-10';
select  s.SALE_PK as TRN_NO,
c.NAME as CUSTOMER_NAME,
Date(s.SALE_TIME) as DATE,
s.COMMISSION,
sum(b.PRICE*sd.QUENTITY) as TOTAL,
sum(b.PRICE*sd.QUENTITY)-sum(b.PRICE*sd.QUENTITY)*(s.COMMISSION/100) as NET_TOTAL
from  sales as s 
join sale_details as sd on s.SALE_PK=sd.SALE_FK  
join books as b  on sd.BOOK_FK=b.BOOK_PK   
join customers as c on s.CUSTOMER_FK=c.CUSTOMER_PK
where SALE_TIME between '2020-09-12' and '2020-10-12' group by s.SALE_PK order by s.SALE_PK ;

select s.SALE_PK, count(s.SALE_PK)  from sales as s
join sale_details as sd on s.SALE_PK=sd.SALE_FK
join books as b on sd.BOOK_FK=b.BOOK_PK group by s.SALE_PK ;

select s.SALE_PK, sum(b.PRICE*sd.QUENTITY)  from sales as s
join sale_details as sd on s.SALE_PK=sd.SALE_FK
join books as b on sd.BOOK_FK=b.BOOK_PK group by s.SALE_PK having avg(b.PRICE*sd.QUENTITY)>sum(b.PRICE*sd.QUENTITY)  ;

