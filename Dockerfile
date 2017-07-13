FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY public /usr/share/nginx/html

EXPOSE 80
ENV VIRTUAL_HOST=www.noahhuppert.com
ENV CERT_NAME=cert
