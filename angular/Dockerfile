#########################
### build environment ###
#########################

# base image
FROM node:9.6.1 as builder



# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app


# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@1.7.1 --unsafe

# add app

COPY . /usr/src/app

# generate build
RUN npm run build --prod

##################
### production ###
##################

# base image
FROM nginx:1.13.9-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# run nginx
CMD ["nginx", "-g", "daemon off;"]
