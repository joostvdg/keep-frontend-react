#!/bin/bash
TAGNAME="keep-frontend-react-image"

echo "# Building new image with tag: $TAGNAME"
docker build --tag=$TAGNAME .
