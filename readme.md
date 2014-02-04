[Zori](https://shining-fire-3337.firebaseapp.com/) [![devDependency Status](https://david-dm.org/FlipFlopWeekly/zori/dev-status.png)](https://david-dm.org/FlipFlopWeekly/zori#info=devDependencies) [![Code Climate](https://codeclimate.com/github/FlipFlopWeekly/zori.png)](https://codeclimate.com/github/FlipFlopWeekly/zori)
====

A real-time link sharer using Firebase as its backend and AngularJS on the frontend

## Installation
    
    # Install global NPM dependencies:
    npm -g install bower
    npm -g install gulp
    npm -g install karma

    # Install project NPM dependencies:
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

This command will:

- Launch an express instance to serve the files
- Launch the app in your favorite browser
- Watch for file modification and automatically compile / refresh your browser

## Troubleshooting

TODO

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


## TODO List

- Add Travis-CI
- Add Coderwall
- Add Jasmine tests
- Add JS to build process (currently broken without it)
- Add Firebase
- Logos, content, etc
- Code!
- Troubleshooting installation: git, node, ruby, npm, proxy, admin rights

## Credits

Copyright (c) 2014 [FlipFlop Crew](https://github.com/FlipFlopWeekly)
