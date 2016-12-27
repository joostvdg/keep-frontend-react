#!/usr/bin/env bash
IMAGE="keep-frontend-react-image"
NAME="keep-frontend-react-instance"

RUNNING=`docker ps | grep -c $NAME`
if [ $RUNNING -gt 0 ]
then
   echo "Stopping $NAME"
   docker stop $NAME
fi

EXISTING=`docker ps -a | grep -c $NAME`
if [ $EXISTING -gt 0 ]
then
   echo "Removing $NAME"
  docker rm $NAME
fi

#--net=$NETWORK --net-alias=$NAME
echo "Create new instance $NAME based on $IMAGE"
docker run --name $NAME -d $IMAGE

echo "Tail the logs of the new instance"
sleep 10
docker logs $NAME
