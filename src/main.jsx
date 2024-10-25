import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App, FunctionalInput } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <FunctionalInput />
  </StrictMode>
);

/*  stateful systems - 
    have memory, retain the state of previous actions 
    (e.g. user sessions, values stored in memory, or order of operations)
    are context-dependent, each action/request is dependent on previous ones
    (system needs to remember things to act correctly)
examples of stateful systems: 
- React component with state
- TCP (Transmission Control Protocol) maintains info about the 
  connection during communication 
- shopping cart system that rememvers items a user has selected
  during a session 
  
RESTful systems -
don't have memory, each request from a client to a server must
  contain all the necessary info for the server to understand
  and process the request
  server does not store any info about previous requests
have uniform interface, relying on standard HTTP methods
  to perform operations
  GET, POST,
  PUT - method used in RESTful APIs to modify resources on the server
  DELETE - method used in RESTful APIs to remove resources on the server 
are resource-based, everything-data, operations, etc.-gets treated as
  resources, typically accessed via URLS
example of RESTful systems:
- RESTful API - when I make a request (e.g. GET /users), the server does
  not remember past request or sessions unless specifically included, 
  as with authentication tokens
*/
