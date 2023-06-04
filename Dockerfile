FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy our default nginx config
COPY deployment/nginx.conf /etc/nginx/nginx.conf

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY  dist/pathagar-ui /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

