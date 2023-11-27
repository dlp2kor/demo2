# Base image taken from:https://hub.docker.com/r/cypress/browsers/tags
FROM cypress/browsers:node-18.15.0-chrome-106.0.5249.61-1-ff-99.0.1-edge-114.0.1823.51-1

#Defining the variable BROWSER and using it in ENV to mention Browser name
ARG BROWSER
ENV BROWSER=${BROWSER}

# Create the folder where our project will be stored
RUN mkdir /Top99TestAutomation

# We make it our workdirectory
WORKDIR /Top99TestAutomation

# Copying the essential files that we must use to run our scripts.
COPY . .

# Install the cypress dependencies in the work directory
RUN npm i &&\
    npx cypress info

# Executable commands the container will use[Exec Form]

CMD ["npm","run","qa"] 
