FROM node:lts AS builder

COPY . .
RUN npm i && \
    npm run build

FROM php:7-apache
RUN apt-get update && apt-get install -y \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    && docker-php-ext-install -j$(nproc) sockets \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

# Copy built app into webserver
COPY --from=builder dist/ /var/www/html/
# Use the default production configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
