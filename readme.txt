
a Realtime Chat App 

Highlights:

Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
Authentication && Authorization with JWT
Real-time messaging with Socket.io
Online user status
Global state management with Zustand
Error handling both on the server and on the client
At the end Deployment like a pro for FREE!
And much more!


Frontend Libraries - 

axios
lucide-react
react-hot-toast
react-router-dom
zustand
daisyui
tailwindcss
socket.io-client

BACKEND LIBRARIES 

express 
mongoose
cors 
dotenv 
jsonwebtoken 
bcryptjs 
cookie-parser 
cloudinary 
socket.io
nodemon (for development only)

PORTS:

frontend: localhost:5173
backend: localhost:5001

SOCKET FUNCTIONALITY:

IN SOCKET.JS:
Created socket.js file 
created server with socket
build connection and disconnection and online users state

IN MESSAGE CONTROLLER:
recieved msg saved in database then if user online msg is send to the user specifically

IN AUTHSTORE
if the user Authenticate user instantly connect socket using connectsocket function with base url
updating the online user array with socket

IN CHATSTORE :
subscribe to new messages updating state of new msgs 
unsubscribe when we clean up 

FOR Deployment:
run react application in single server domain so we can deploy everything in one place(need only one url)

package.json file in root using (npm init -y)

build application and make it ready for Deployment
("build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend",)
run this script under the backend folder because when we deploy code to github we are not going to have node modules  

("start": "npm run start --prefix backend") 
run under the backend folder because it start the index.js file in backend package.json 

run (npm run build) command in root dirctory 

dist folder created in frontend folder optimized version of entire react application

now in index.js (import path from "path";) and create a variable (const __dirname = path.resolve();)

add path to static assets and react application in index.js file

IN AXIOS.JS:
change BASE_URL to (baseURL: import.meta.env.MODE=== "development" ? "http://localhost:5001/api": "/api",)

INAUTHSTORE:
const BASE_URL= import.meta.env.MODE=== "development" ? "http://localhost:5001" : "/";


Important notes :

Add (type:"module") in package.json.
Cors error because trying to send the request from frontend to backend which is on a different port.

