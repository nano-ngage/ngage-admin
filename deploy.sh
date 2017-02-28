#!/usr/bin/env bash

echo "stopping running application"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker stop ngage-admin'
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker rm ngage-admin'

echo "pulling latest version of the code"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker pull nanongage/ngage-admin:latest'

echo "starting the new version"
ssh $DEPLOY_USER@$DEPLOY_HOST 'docker run -d --restart=always -e DBIP="'$DBIP'" -e SESSION_SECRET="'$SESSION_SECRET'" -e AUTH0_CLIENT_SECRET="'$AUTH0_CLIENT_SECRET'" -e AUTH0_CLIENT_ID="'$AUTH0_CLIENT_ID'" -e AUTH0_DOMAIN="'$AUTH0_DOMAIN'" --name ngage-admin -p 3001:3001 nanongage/ngage-admin:latest'

echo "success!"

exit 0