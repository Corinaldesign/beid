FROM php:5.6.22-apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
#COPY . /var/www/html/





