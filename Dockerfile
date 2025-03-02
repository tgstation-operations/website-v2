FROM docker.io/node:16-bullseye AS builder
WORKDIR /app
# Copy sources
COPY src src
COPY gulpfile.js gulpfile.js
COPY package.json package.json
COPY package-lock.json package-lock.json
# Build the app
RUN npm install && npm run build && rm -rf node_modules

# Alpine PHP + Apache from https://github.com/ulsmith/alpine-apache-php7/
FROM docker.io/alpine:edge
LABEL MAINTAINER="Paul Smith <pa.ulsmith.net>"

# Add repos
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories

# Add basics first
RUN apk update && apk upgrade && apk add \
    bash apache2 php-apache2 curl ca-certificates openssl git \
    php php-phar php-iconv php-openssl tzdata nano

# No composer needed

# Setup apache and php
# TODO: Remove unneeded modules. to shrink image size.
RUN apk add \
    php-ftp \
    php-pecl-xdebug \
    php-mbstring \
    php-soap \
    php-gmp \
    php-pdo_odbc \
    php-dom \
    php-pdo \
    php-zip \
    php-mysqli \
    php-sqlite3 \
    php-pdo_pgsql \
    php-bcmath \
    php-gd \
    php-odbc \
    php-pdo_mysql \
    php-pdo_sqlite \
    php-gettext \
    php-xml \
    php-xmlreader \
    php-xmlwriter \
    php-tokenizer \
    php-bz2 \
    php-pdo_dblib \
    php-curl \
    php-ctype \
    php-session \
    php-pecl-redis \
    php-exif \
    php-intl \
    php-fileinfo \
    php-ldap \
    php-pecl-apcu

RUN cp /usr/bin/php /usr/local/bin/php \
    && rm -f /var/cache/apk/*

# Add apache to run and configure
RUN sed -i "s/#LoadModule\ rewrite_module/LoadModule\ rewrite_module/" /etc/apache2/httpd.conf \
    && sed -i "s/#LoadModule\ session_module/LoadModule\ session_module/" /etc/apache2/httpd.conf \
    && sed -i "s/#LoadModule\ session_cookie_module/LoadModule\ session_cookie_module/" /etc/apache2/httpd.conf \
    && sed -i "s/#LoadModule\ session_crypto_module/LoadModule\ session_crypto_module/" /etc/apache2/httpd.conf \
    && sed -i "s/#LoadModule\ deflate_module/LoadModule\ deflate_module/" /etc/apache2/httpd.conf \
    && sed -i "s#^DocumentRoot \".*#DocumentRoot \"/app/public\"#g" /etc/apache2/httpd.conf \
    && sed -i "s#/var/www/localhost/htdocs#/app/public#" /etc/apache2/httpd.conf \
    && printf "\n<Directory \"/app/public\">\n\tAllowOverride All\n</Directory>\n" >> /etc/apache2/httpd.conf

RUN mkdir /app && mkdir /app/public && chown -R apache:apache /app && chmod -R 755 /app && mkdir bootstrap
ADD start.sh /bootstrap/
RUN chmod +x /bootstrap/start.sh

EXPOSE 80
ENTRYPOINT ["/bootstrap/start.sh"]

# Copy built app into webserver
COPY --from=builder /app/src/ /app/public
