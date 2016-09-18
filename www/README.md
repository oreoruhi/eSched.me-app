# backand-ionic-social
Create mobile application with [ionic](http://www.ionicframework.com) and [backand](http://www.backand.com).

1- To run starter, download zip and run ionic start:

    ionic start myApp https://github.com/backand/backand-ionic-social
    cd myApp

2 - Run with ionic serve function

    ionic serve

3 - Sign up to application and add new users with Signup tab.

4 - Sign up with all leads social app, Facebook, Google+ and Gitub.

5 - Enjoy your mobile application, with backand at server side and full CRUD commands to server.

6 - Want to customize data model or change authorization?
create a free personal application at [backand.com](https://www.backand.com/apps/#/sign_up)

7 - Use following model (or just keep the default Model):

    [
      {
        "name": "items",
        "fields": {
          "name": {
            "type": "string"
          },
          "description": {
            "type": "text"
          },
          "user": {
            "object": "users"
          }
        }
      },
      {
        "name": "users",
        "fields": {
          "email": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "items": {
            "collection": "items",
            "via": "user" 
          }
        }
      }
    ]
8 - change application name in  /js/app.js file at line 14
to your new application name.
