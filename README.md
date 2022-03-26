# in client module we install:
-> axios: to get api request 
-> moment.js: to work with time and date
-> react-file-base64: to convrt our images
-> redux and redux-thunk and react-redux: to asychronous actions using redux
-> material-ui/core

# in server modul we install:

-> body parser: this is going to anable us to send post requests
-> course; is going to enable cross origin requests  
-> express: use as a framework for creating the routing of our application
-> mongoose: to create models for our posts
-> nodemon: use to don't have to manually reset the server evry time we make a change

# for the deployment

->for back-end: 

we use here
## heroku
  - heroku login
  - copy an url and open it in the browser
  - git init
  - git add .
  - git commit -am "make it better"
  - git push heroku master
  - the add <app.get('/',(req, res) => {res.send('Hello to Memories API')});> in your code for know the deployemnet is well
  - in the client/sr/api/index.js replace the <const url = 'http://localhost/5000/posts'> by <const url = 'https://memories-app-mern-stack.herokuapp.com/posts';>
  
-> for the front-end:

we use here
## netlify
  - first step is : npm run build
  - the we found a folder name is build 
  - click on D 
  - reveal in file explorer
  - take it into the netlify
  - then open the link

# the issue i face :
1- the api in mongoDB->i changed by 0.0.0.0/0
2- the cors: Access to XMLHttpRequest at 'http://localhost:5000/posts' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
-> in package.json : i do "proxy":"http://localhost:5000"
-> install cors running the command npm i cors
-> then i go to index.js file and add
var cors = require('cors');
app.use(cors())
