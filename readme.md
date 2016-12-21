[Zori](http://zori.trgdy.com/#/) [![devDependency Status](https://david-dm.org/FlipFlopWeekly/zori/dev-status.png)](https://david-dm.org/FlipFlopWeekly/zori#info=devDependencies) [![Code Climate](https://codeclimate.com/github/FlipFlopWeekly/zori.png)](https://codeclimate.com/github/FlipFlopWeekly/zori)
====

A real-time link sharer using Firebase as its backend and AngularJS on the frontend.

## Installation
    
    # Install global NPM dependencies:
    npm install -g gulp bower jshint recess

    # Install project NPM dependencies:
    npm install

## Contributing
    
    # You may want to install the development
    # dependencies (above) to make your life easier.
    # Once it is done, just run:
    gulp work

This command will:

- Launch an express instance to serve the files
- Launch the app in your favorite browser
- Watch for file modification and automatically compile / refresh your browser

Another option if you don't want to bother installing node & npm:
     
    # Just use a simple static file server like:
    cd source/
    python -m SimpleHTTPServer 4000
    # Then go to http://localhost:4000/

## Troubleshooting

The main project dependencies are:
- git to contribute to the code base
- node (+ npm) to build the project

You also need a web server to serve the static files. Fortunately, there is one included in the gulp build file.

To get up and running behind a corporate proxy, you'll have to:
- `npm config set proxy http://proxy.company.com:8080`
- `npm config set https-proxy http://proxy.company.com:8080`
- `export HTTP_PROXY=http://proxy.company.com:8080`
- `export HTTPS_PROXY=http://proxy.company.com:8080`
- There also is an equivalent parameter for Windows: `SET HTTP_PROXY=http://proxy.company.com:8080`
- Note that `npm install -g` must be ran with administrative privileges (`sudo` or Windows equivalent)

## Deployment

Zori only contains static files, it can thus be deployed everywhere static files can be served (S3, EC2, Dropbox, GitHub Pages, Heroku, etc).

### Testing

The testing environment is currently hosted [on Firebase Hosting (beta)](https://shining-fire-3337.firebaseapp.com/).

    # Install the Firebase Command Line Tools
    npm install -g firebase-tools

    # Build the project
    gulp build

    # Run the firebase deploy command
    firebase deploy

    # Voilà, you can go to
    # https://shining-fire-3337.firebaseapp.com/
    # to access the running app.

### Production

The production environment is hosted [on GitHub Pages](http://zori.trgdy.com/).

    # Build the project
    gulp build

    # Run the deploy command
    gulp deploy

    # Voilà, you can go to
    # http://zori.trgdy.com/
    # to access the running app.

## Project roadmap

Our project roadmap is shared on the [Wiki](https://github.com/FlipFlopWeekly/zori/wiki).

## Credits

Copyright (c) 2014 [FlipFlop Crew](https://github.com/FlipFlopWeekly)
