FROM nginx:alpine
COPY pass /etc/nginx/pass
COPY localhost.key /etc/ssl/localhost.key
COPY localhost.crt /etc/ssl/localhost.crt
RUN rm /etc/nginx/conf.d/*
COPY proxy.conf /etc/nginx/conf.d/
