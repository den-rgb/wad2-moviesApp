# Assignment 2 - Web API.
​
Name: Denis Moskalenko
​
## Features.
​
 
 + Helmet - Header Protection
 + Google Authentication - 2 Factor Authentication using speakeasy
 + morgan - logging
 + cookie-Parser - error handling
 + Swagger - api documentation
 + Error prompts - When inputting incorrect information in Register / Login / 2FA code you are shown an error prompt.
 + Delete api requests - Remove Favourites and Watchlist Movies
 
​
## Installation Requirements
​
+ Node version(14.17.6)
+ Npm version(6.14.15) 
+ Mongo / Mongoose
+ Google Authenticator
+ React
​
Cloning Repo:
​
git clone https://github.com/den-rgb/wad2-moviesApp.git

​
followed by installation
​
+ npm install react react-dom --save
+ npm install cookie-parser
+ npm install helmet
+ npm install morgan
+ npm install --save speakeasy
+ npm i swagger --save
+ npm i swagger-ui --save
+ npm i swagger-ui-express --save
+ npm i swagger-jsdoc --save
​
## API Configuration
​
+ Create a .gitignore file containing the following:

```bat
# dependencies
/node_modules

# testing
/coverage

# production
/build

# misc
.DS_Store
/**/.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.env
cypress.env.json.
npm-debug.log*
yarn-debug.log*
yarn-error.log*
/.vscode
.eslintcache
```
+ Create an .env folder containing the following
```bat
NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
TMDB_KEY=YourAuthKey
```
​
​
## API Design
Give an overview of your web API design, perhaps similar to the following: 
​
|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies?page=1&limit=10 | Gets a list of movies with pagination | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/tmdb-upcoming | Get all the upcoming movies | N/A | N/A | N/A
| /api/users | Get all Users | Login | N/A | N/A
| /api/users?action=register | N/A | Register | N/A | N/A
| /api/users/{userName}/favourites | Get all the users Favourites with no duplicates | Add Favourite movie | N/A | Remove user Favourite
| /api/users/{userName}/watchlist | Get all the users Watchlist with no duplicates | Add to movie Watchlist | N/A | Remove from user Watchlist
| /api/code/totp-secret | N/A | Generate a secret key for Google Authenticator | N/A | N/A
| /api/code/totp-generate | N/A | Generate a 6 digit code with a 30 second time window for Google Authenticator | N/A | N/A
| /api/code/totp-validate | N/A | Check inputed 6 digit code against Google Authenticator secret key | N/A | N/A
| ... | ... | ... | ... | ...
​
​
[swagger](http://localhost:8080/api-docs/)
​
## Security and Authentication
Added passport security for the user, user is unable to access Favourites or Watchlist due to Private Routes, Favourites and Watchlist can be accessed once logged in.
Favourites and Watchlist cannot be added until 2FA is complete.
Once logged in a jwt token is generated for that specific user allowing them to not have to sign in constantly.
2FA is done by generating a google auth key that is displayed on screen, User must add the 2FA key to their Google Authenticator app and recieve a 6 digit code.
Once correct code is inputted user will have successfully logged in and can now favourite movies as well as add them to watchlist.
Session may expire after a certain amount of time.
​
## Integrating with React App
​
Created a new api file called movies-api in my React folder with fetch calls shown in the example below. I used a new context file called authContext to create async functions got to do with fetching authorisation promises from the api file. I used the moviesContext file to create async functions got to do with fetching favourites,watchlist etc promises from the api file. Created new api calls such as delete and incorporated those in order to remove favourite movies and movies in watchlist (see example 2 below). Also Created new api calls in order to generate secret keys and codes as well as to validate the code (see example 3 , 4  below).
​

~~~Javascript

export const getMovies = () => {
    return fetch(
        `/api/movies?page=1&limit=10`
      ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

//example 2:

export const removeFavourite= (username,movieId)=>{
    return fetch(`/api/users/${username}/favourites`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method:'delete',
        body:JSON.stringify({id:movieId})
    }).then(res=>res.json())
};

//example 3:

export const submitCode= (token,googleToken)=>{
    return fetch('/api/code/totp-validate',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'post',
        body:JSON.stringify({secret:token,token:googleToken})
    }).then(res=>res.json())
};

//example 4: 

export const getGoogleAuthKey= ()=>{
    return fetch('/api/code/totp-secret',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'post',
    }).then(res=>res.json())
};

​
~~~
​
## Extra features
​
Swagger shows all the api documentation.
Morgan displays logs of all the requests happening on the app.
Helmet protects the express headers by hiding them.
Cookie-Parser looks at the headers between the server and the client and it parses out the cookies that are being sent.
​
## Independent learning
​
Figured out how to stop adding duplicate movies in watchlist and favourites.
Researched how to add 2FA with Google Authenticator with speakeasy.
Researched how to use morgan.
Researched how to use helmet.
Researched how to use cookie-parser.
Researched how to write up a swagger operation calls as well as how to describe parameters correctly in yaml.



