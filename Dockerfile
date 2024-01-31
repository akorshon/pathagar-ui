FROM nginx:alpine

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy our default nginx config
COPY deployment/nginx.conf /etc/nginx/nginx.conf

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY  dist/pathagar-ui /usr/share/nginx/html

USER nonroot

CMD ["nginx", "-g", "daemon off;"]

