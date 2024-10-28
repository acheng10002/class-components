import { useState, Component } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  /* components so far have been functional in style and syntax
but there is a class based syntax too 
props and state are used differently in class-based components... */
}

/* this functional component is uncharacteristically involved
has name prop */
const FunctionalInput = ({ name }) => {
  // state to manage todos as an array, initialized to placeholder array
  const [todos, setTodos] = useState(["Just some demo tasks", "As an example"]);
  // state to manage input value, initialized to an empty string
  const [inputVal, setInputVal] = useState("");

  // event handler for new user input and updates inputVal state
  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  // event handler for form submission
  const handleSubmit = (e) => {
    // prevents page reload upon submission
    e.preventDefault();
    // update todos state to include inputVal
    setTodos((todo) => [...todo, inputVal]);
    // reset inputVal
    setInputVal("");
  };

  return (
    <section>
      <h3>{name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="tasl-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      <ul>
        {/* for each element in todos array, create a li item with todo
        value as text content */}
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </section>
  );
};

class Counter extends Component {
  /* props are the component's initial props, constructor should not return anything 
  constructor runs before class component mounts, it has two purposes: */
  constructor(props) {
    // below needs to called before any other statement
    super(props);
    // 1. declare state (constructor is only place where I can assign it directly)
    this.state = { counter: 0 };
    // 2. bind my class methods to the class instance
    this.handleClick = this.handleClick.bind(this);
  }
  /* constructor should not contain side effects or subscriptions
  if I use modern JS syntax, I can use public class field syntax
  which is supported by modern browsers and Babel */
  state = { counter: 0 };
  handleClick = () => {
    // ...
  };
  /* constructor and then the render method will run on the server in server rendering
  lifecycle methods will not run on the server */
}

/* error boundary - special component that lets me display some fallback UI instead of
                    the part that crashed, e.g. an error message */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    // inComponentThatThrows (created by App)
    // inErrorBoundary (created by App)
    // in div (created by App)
    // in App
    logErrorToMyService(error, info.componentStack);

    // componentDidCatch() should not return anything
  }

  render() {
    if (this.state.hasError) {
      // I can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

/* React class needs to have certain properties that qualifies it as a
React component, those properties are on the class Component 
write components by extending the given class */
class ClassInput extends Component {
  /* or,
  import React from 'react';
  class ClassInput extends React.Component {} 
  
  props passed into the component, get passed into the class's constructor */
  constructor(props) {
    super(props);
    /* constructor and super method lets me use the props in the context of this
    this, refers to the component 
    
    in a class-based component, state gets initialized as a part of the constructor */
    this.state = {
      todos: [],
      inputVal: "",
      // state to track the todo currently being edited
      editingTodo: null,
      // state to manage the temporary edited value
      editInputVal: "",
    };

    /* whenever a method is declared, the this of the method must be
    binded to the this of the class instance
    this way, all methods can access the state and props of the class */
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  handleInputChange(e) {
    /* uses functional form to update the component's state, ensures the update
    is based on the most recent state value */
    this.setState((state) => ({
      /* copies the current state, and updates the inputVal state with the
      current input field value */
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    // updates the component's state using the functional form
    this.setState((state) => ({
      ...state,
      // creates a new array with inputVal added to the end of the todos list
      todos: state.todos.concat(state.inputVal),
      // resets inputVal to an empty string, clearing the input field
      inputVal: "",
    }));
  }

  handleDelete(todo) {
    this.setState((state) => ({
      ...state,
      // creates a new array of only items that are not equal to todo
      todos: state.todos.filter((item) => item !== todo),
    }));
  }

  handleEdit(todo) {
    this.setState((state) => ({
      ...state,
      // sets editingTodo state to current todo
      editingTodo: todo,
      // pre-fill input with the current todo text
      editInputVal: todo,
    }));
  }

  handleEditChange(e) {
    // updates editInputVal state as user types in the input
    this.setState((state) => ({
      ...state,
      // sets the edited value state to input value
      editInputVal: e.target.value,
    }));
  }

  handleEditSubmit() {
    this.setState((state) => ({
      ...state,
      /* for each todo, check if it is the one currently being edited
      if it is, replace the current todo with the new value from the
      input field, otherwise leave the current todo */
      todos: state.todos.map((todo) =>
        todo === state.editingTodo ? state.editInputVal : todo
      ),
      // reset editingTodo and editInputVal
      editingTodo: null,
      editInputVal: "",
    }));
  }

  /* if no props, ok to leave the constructor and super with no arguments 
  return my JSX from a render method */
  render() {
    return (
      <section>
        {/* props provided by this instead of as prop passed into a 
        functional component */}
        <h3>{this.props.name}</h3>
        {/* input field to enter todos 
        when Submit button is clicked, new array is created with inputVal 
        added to the end of the todos list */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task:</label>
          <input
            type="text"
            name="task-entry"
            // input field value is the inputVal state value
            value={this.state.inputVal}
            // updates the inputVal state with the current input field value
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* list of all the todos, displayed */}
        <ul>
          {/* for each todo, create an li element */}
          {this.state.todos.map((todo) => (
            <li key={todo}>
              {/* if the editingTodo state is the current todo */}
              {this.state.editingTodo === todo ? (
                <>
                  {/* create an input field */}
                  <input
                    type="text"
                    // input field value is the inputVal state value
                    value={this.state.editInputVal}
                    // updates editInputVal state, setting it to the input value
                    onChange={this.handleEditChange}
                  />
                </>
              ) : (
                /* if the editingTodo state is not the current todo, 
                render the current todo */
                <span>{todo}</span>
              )}
              <button
                type="button"
                onClick={() =>
                  /* if the editingTodo state is the current todo, replace the
                  current todo with the new value from the input field, and have 
                  button text content be Resubmit
                  if not, set editingTodo to the current todo and have button text
                  content be Edit */
                  this.state.editingTodo === todo
                    ? this.handleEditSubmit()
                    : this.handleEdit(todo)
                }
              >
                {this.state.editingTodo === todo ? "Resubmit" : "Edit"}
              </button>
              {/* deletes specific task from the state array */}
              <button type="button" onClick={() => this.handleDelete(todo)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        {/* setting todos prop to this.state.todos binds the todos array in 
        ClassInput's state to todos prop in Count 
        Count can then access todos via this.props.todos and use it to get the
        current count of todos at any time */}
        <Count todos={this.state.todos} />
      </section>
    );
  }
}

class Count extends Component {
  render() {
    /* this.props.todos references the array of todos passed from ClassInput 
    access this.props.todos.length to calculate and display the count */
    return <h4>Number of todos: {this.props.todos.length}</h4>;
  }
}

/* 
How to use lifecycle methods in a class component
  What is the only required lifecycle method? render()
  What lifecycle method should I use for initial data fetching? componentDidMount()
  When I want to act upon change of the DOM, or of state, what lifecycle method would I use? componentDidUpdate()
    avoid endless loop by using conditional statements about the equality of previous and current props when
      updating state 
  When performing cleanup actions, what lifecycle method should be used? componentWillUnmount()
    use it for cancelling network requests, clearing timers, etc.
  How does useEffect hook combine some of the lifecycle methods? 
    the combination depends on its dependency array and if it returns anything
    empty dependency array -> componentDidMount
    dependency array with value/values -> combo of componentDidMount and componentDidUpdate
      only updating when dependencies change
    no dependency array -> componentDidMount and componentDidUpdate combined
    return function inside the useEffect() -> componentWillUnmount()
*/

class ChatRoom extends Component {
  state = {
    serverUrl: "https://localhost: 1234",
  };

  /* componentDidMount gets called when my component is mounted
  this is the place to start data fetching, set up subscriptions, or manipulate the DOM nodes 
  subscription examples:
  - WebSocket connections for receiving real-time data updates (e.g. live chat messages, 
    stock prices, or other live data streams
  - API polling - setting up a recurring interval to fetch data periodically from an API,
                  allowing the component to stay updated with new data from the server w/o
                  requiring a page reload *
  - event listeners - that capture events such as window resizing, scrolling, or custom
                      events
  - state management subscriptions - I can subscribe to specific state updates to respond to
                                     changes in state elsewhere in the app 
  - database service listener - listener to sync data with a database service, where changes
                                to the data on the server side automatically update the 
                                client in real time 
  - browser geolocation API - Geolocation API to start tracking the user's location, which
                              updates automatically as the location changes */
  componentDidMount() {
    this.setupConnection();
  }

  /* componentDidUpdate(prevProps, prevState, snapshot?)  gets called immediately after my
  component has been re-rendered with updated props and state 
    use componentDidUpdate to manipulate the DOM after an update 
    common place to do network requests, where I compare the current props to prev props 
  prevProps - props before the update; compare prevProps to this.props to see what changed 
  prevState - state before the updatedat; compare prevState to this.state to see what changed
  snapshot - if getSnapshotBeforeUpdate was implemented, snapshot contains the value returned
             from that method; otherwise it's undefined 
  componentDidUpdate should not return anything 
  best to avoid calling setState immediately in componentDidUpdate, bc it triggers an extra
    rendering before the browser updates the screen*/
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.roomId !== prevProps.roomId ||
      this.state.serverUrl !== prevState.serverUrl
    ) {
      this.destroyConnection();
      this.setupConnection();
    }
  }

  /* componentWillUnmount gets called before my component is removed from the screen
  common place to cancel data fetching or remove subscriptions 
  logic inside componentWillUnmount should mirror the logic inside componentDidMount
  ex. if componentDidMount sets up a subscription, componentWillUnmount should clean up
      that subscription
  ex. if my componentWillUnmount has cleanup logic that reads some props or state, I need
      to implement componentDidUpdate to clean up resources (such as subscriptions)
      corresponding to old props and state 
      
  componentWillUnmount does not take any parameters
  it should not return anything */
  componentWillUnmount() {
    this.destroyConnection();
  }

  // ...
  /* if I implement componentDidMount (e.g. to read some state or props), I usually need to 
  implement componentDidUpdate (e.g. to handle their changes) and componentWillUnmount (to
  clean up whatever componentDidMount was doing 
  
  componentDidMount does not take any parameters
  componentDidMount should not return anything 
  best to avoid calling setState immediately in componentDidMount, bc it triggers an extra
    rendering before the browser updates the screen
  in most cases, I should be able to assign the initial state in the constructor instead 
  
  componentDidMount, componentDidUpdate, and componentWillUnmount together in a class 
  component is equivalent to calling useEffect in function components
  in rare cases where it's important for the code to run before browser paint, 
    useLayoutEffect is a closer match 
    browser paint - point at which the browser renders visual elements on the screen
    when a component is mounted or updated, browser first processes JavaScript, 
      calculates layouts and styles, and then displays the updated visual result 
      to the user */
}

export { App, FunctionalInput, ClassInput, ErrorBoundary };
