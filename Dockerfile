FROM abiosoft/caddy

EXPOSE 80

COPY ./deploy/Caddyfile /etc/Caddyfile
COPY ./www /srv
