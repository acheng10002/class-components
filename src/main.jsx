import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App, ErrorBoundary, FunctionalInput, ClassInput } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* if FunctionalInput of its child component throws an error, 
    ErrorBoundary will catch that error, display a fallback UI with the
    error message I've provided, and send a production error report to
    my error reporting service */}
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <FunctionalInput />
    </ErrorBoundary>
    <ClassInput />
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

think about where it makes sense to display an error message:
for a messaging app -
  error boundary around the list of conversations
  error boundary around every individual message
  but no error boundary around every avatar

modal - pop-up element
tooltip - small, floating label or message that appears when a user hovers
          or focuses on an element
*/
