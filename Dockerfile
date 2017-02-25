FROM node:boron
# Create app directory
RUN mkdir -p /usr/src/admin
WORKDIR /usr/src/admin
# Install app dependencies
COPY package.json /usr/src/admin/
RUN npm install
ARG SESSION_SECRET
ARG AUTH0_CLIENT_SECRET
ARG AUTH0_CLIENT_ID
ARG AUTH0_DOMAIN
ARG DBIP
ENV SESSION_SECRET $SESSION_SECRET
ENV AUTH0_CLIENT_SECRET $AUTH0_CLIENT_SECRET
ENV AUTH0_CLIENT_ID $AUTH0_CLIENT_ID
ENV AUTH0_DOMAIN $AUTH0_DOMAIN
ENV DBIP
run echo ${SESSION_SECRET}
run echo ${AUTH0_CLIENT_SECRET}
run echo ${AUTH0_CLIENT_ID}
run echo ${AUTH0_DOMAIN}
run echo ${DBIP}
# Bundle app source
COPY . /usr/src/admin
RUN npm run build
EXPOSE 3001
CMD [ "npm", "start" ]