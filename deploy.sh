#!/usr/bin/env bash

echo "stopping running application"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker stop nanongage/ngage-admin'
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker rm nanongage/ngage-admin'

echo "pulling latest version of the code"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker pull nanongage/ngage-admin:latest'

echo "starting the new version"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker run -d --restart=always --link ngage-db:ngagedb -e DBIP="ngagedb" --name ngage-admin -p 3001:3001 nanongage/ngage-admin:latest'

echo "success!"

exit 0