# demo-auth
This is a Simple User Registration &amp; Login systems app
This is a Node.js web application that uses the Express framework to handle routing, Mongoose for interacting with a MongoDB database, and EJS for rendering views. The app allows users to sign up and log in, and once logged in, a user will be able to see their username on the homepage.
Here is a brief overview of what the code is doing:

The code starts by importing various modules such as express, body-parser, mongoose, express-session, connect-mongo, ejs and path.

Next, it creates an instance of the Express app, and sets the server to listen on port 3000.

It connects to a MongoDB database using the Mongoose library and the connection string mongodb+srv://siddu:Siddu%40123@cluster0.gjp169q.mongodb.net/DemoAuth?retryWrites=true&w=majority

It also enables session handling for the application, with the session being stored in the same MongoDB database that the app is connected to.

It sets the views directory to the views folder and set the view engine to ejs.

It use body-parser middleware to parse incoming request bodies in a middleware before the handlers, available under the req.body property.

Then it define a user schema and create a model from the schema.

Next, it sets up routing for the application, with two main routes: '/signup' and '/login'.

The '/signup' route renders the signup page and handles the post request for the signup form. It takes the data from the form and saves it to the database.

The '/login' route renders the login page and handles the post request for the login form. It takes the email and password from the form and check for the user in the database and if the user is present and the password matches it redirects to home page.

The '/' route is protected route, which means that only logged in users can access it. It finds the user in the database with the current session's userId and if the user is present it sends the username of the user else redirects to login page.

