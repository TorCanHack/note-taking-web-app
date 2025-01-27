# Frontend Mentor - Note-taking web app solution

This is a solution to the [Note-taking web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/note-taking-web-app-773r7bUfOG). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Create, read, update, and delete notes
- Archive notes
- View all their notes
- View all archived notes
- View notes with specific tags
- Search notes by title, tag, and content
- Select their color theme
- Select their font theme
- Receive validation messages if required form fields aren't completed
- Navigate the whole app and perform all actions using only their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account, log in, change password (add user authentication to the full-stack app)
- **Bonus**: Reset their password (add password reset to the full-stack app)

### Screenshot

![](./screenshot.jpg)



### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- TailWindCSS
- Vite
- Express.js



### What I learned

Building a note taking app that is full stack exposed me to the a lot of concepts and logic necessary for the note's app functionality. I used the vite for the frontend and express.js for the backend. I learnd a lot on implimenting communications between the front end and the backend. 

To enable smooth communciation between the backend and frontend, I created an axios instance and saved it in a variable called api as follows: 

````js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://locahost:3000/api',
  header: {
    'Content-Type': 'application/json'
  },
  withCredentianls: true
});
```` 
First, I imported the axios library into the file I was using for api services, then I created an axios instance and saved it in the api variable. Thereafter the `baseURl` is set to the backend server. The `Content-Type` has its configuration set to `apllication/json` which indicates that the body of request will be in JSON format. Finally, `withCredentials` is set to true. This enables me to send cookies wit cross-origin requests, accept cookies from servers automatically include cookies in all API calls.  This axios instance I saved in the api variable enables me to make multiple requests to the backend server, with consistent header configuration. 

Having set up my axios instance, I then defined a request interceptor, which I had earlier configured to attach tokens (gotten from local storage) to all out going requests, but upon review and research decided not to rather use HTTP-only cookies so the tokens are no longer stored in localStorage which was more prone to XSS.

````js
api.interceptor.request.use(config =>{

  config.withCredentials = true;
});
````
`withCredentialss = true` ensures that cookies are sent for cross origin requests.  The axios instance i created together with this interceptor ensures that cookies are passed to the server. 

At the backend I had to install:

````js
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser')
````
## jsonwebtokens
The jwt instance is used to encode strings that enable transmitting information securely between parties. It's common operations are 
1.sign: create token with payload and secret key
2.verify: check token signature is valid 
3.Decode: Extract payload data

I used the jsonwebtoken to encode the tokens i used for authentication purposes.

## Bcrpyt
is a password hashing algorithm I used to secure the users' password. It has two methods: 

1.`hash()`: creates password harsh
2.`compare()`: checks password against stored harsh. 

## cookie-parser: 
I used this to enable my server work with and understand cookies.

Futhermore, I learned how to create a middleware that authenticates all incoming requests. 

````js
const auth = async (req, res, next) => {

    try {
        const token = req.cookies.token;

        if(!token) {
          throw new Error('No authentication token found');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if(!user) {
            throw new Error("User does not exist")
        }

        req.user = user;
        next()

    } catch(error){

        const errorMessage = error.name === 'JsonWebTokenError'
            ? 'Invalid authentication toke'
            : 'Authentication required';

        res.status(401).json({error: errorMessage})
    }

}
````
The authenticating middleware function provided above checks and makes sure all incoming requests are authorized. It athutenticates requests by extratcing the token stored in the cookie into a variable called token for easy reference, however, if the token does not exist the function stops and throws up an error: 'no token found'. If the token exists, the token is verified to ensure it hasnt expired, been tampered with or generally invalid. Once verified, it is stored in the decoded variable. a query is carried out to to fetch the userid associated with the token and the valid user is now added to the request for furtehr use. 

The project has a lot of features, for example the functionality allowing users to archive notes they are not immediately using. When I was reviewing the system design I was contemplating whether to use one model to store both active ad archived notes or a different model for each type. I decided to use different models for each type. Although it was a small project and I was quite aware using the same model would not create performance issues and there was always the option of scaling if the userbase increased substanaially. Using a different model nonetheless felt cleaner,  and since this was a pratice porject i wated to experiment with using a different model for archive notes since in reality performance, scalbiity and even some laws (depending on the jursidiction ) necesttiate a different model for ahciveed records.

in the search functionality, I used a debounce function to prevent the search input from firing as the user was typing sinve that will lag performce. Basically, a debounce function is a delay mechanism that prevents the function from being too called frequently.

````js
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}
````
The debounce function takes two parameters, the function to delay and the amount of time the delay will last, in the debounce function itself, timeoutId is declared to uniquely indentify the timeout. The return funtion returns a function with any number of arguments. `clearTimeout` clears the timeout for a new timeout to be set whenever the function is about to be called. A new timeout is stored in the timeoutId that runs whenever the firing event stops the delay has countdown. So by this above code I can prevent the search input from query the databse too often why a user is typing a word.


### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.




