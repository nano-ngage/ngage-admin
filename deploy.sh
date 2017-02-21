#!/usr/bin/env bash

echo "stopping running application"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker stop nanongage/ngage-admin'
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker rm nanongage/ngage-admin'

echo "pulling latest version of the code"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker pull nanongage/ngage-admin:latest'

echo "starting the new version"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker run -d --restart=always --name ngage-admin -p 49016:5000 nanongage/ngage-admin:latest'

echo "success!"

exit 0