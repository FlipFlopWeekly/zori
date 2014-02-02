[Zori](https://shining-fire-3337.firebaseapp.com/) [![devDependency Status](https://david-dm.org/FlipFlopWeekly/zori/dev-status.png)](https://david-dm.org/FlipFlopWeekly/zori#info=devDependencies)
====

A real-time link sharer using Firebase as its backend and AngularJS on the frontend

## Installation

    # Get the Sass compiler:
    gem install sass
    
    # Install global NPM dependencies:
    npm -g install bower
    npm -g install gulp
    npm -g install karma

    # Get NPM dependencies:
    npm install

    # Also to be able to run tests from CLI
    # without browser window popping consider
    # to install PhantomJS:
    # http://phantomjs.org/download.html

## Contributing
    
    # Every dependency needed to get the app
    # running is committed into the repository,
    # however, you may want to install the development
    # dependencies (above) to make your life easier.
    # Once it is done, just run:
    gulp work

## Deployment

Zori only contains static files, it can thus be deployed everywhere static files can be served (S3, EC2, Dropbox, GitHub Pages, Heroku, etc).

It is currently hosted [on Firebase Hosting (beta)](https://shining-fire-3337.firebaseapp.com/).

    # Install the Firebase Command Line Tools
    npm install -g firebase-tools

    # Run the deploy command
    firebase deploy

    # Voilà, you can go to
    # https://shining-fire-3337.firebaseapp.com/
    # to access the running app.

## Credits

Copyright (c) 2014 [FlipFlop Crew](https://github.com/FlipFlopWeekly)
