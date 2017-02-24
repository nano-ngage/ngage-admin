FROM node:boron
# Create app directory
RUN mkdir -p /usr/src/admin
WORKDIR /usr/src/admin
# Install app dependencies
COPY package.json /usr/src/admin/
RUN npm install
# Bundle app source
COPY . /usr/src/admin
RUN npm run build
EXPOSE 3001
CMD [ "npm", "start" ]