FROM nginx:mainline
MAINTAINER Joost van der Griendt <joostvdg@gmail.com>

LABEL authors="Joost van der Griendt <joostvdg@gmail.com>"
LABEL version="1.0.0"
LABEL description="KEEP Frontend with ReactJS"

RUN apt-get update && apt-get install --no-install-recommends -y curl=7.38.0-4+deb8u5 && rm -rf /var/lib/apt/lists/*
HEALTHCHECK CMD curl --fail http://localhost:80/ || exit 1
COPY dist/ /usr/share/nginx/html/dist
COPY index.html /usr/share/nginx/html
RUN ls -lath /usr/share/nginx/html
