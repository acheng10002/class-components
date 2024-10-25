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
    this, refers to the component */
  }
  /* if no props, ok to leave the constructor and super with no arguments 
  return my JSX from a render method */
  render() {
    return (
      <section>
        {/* props provided by this */}
        <h3>{this.props.name}</h3>
        {/* input field to enter todos */}
        <form>
          <label htmlFor="task-entry">Enter a task:</label>
          <input type="text" name="task-entry" />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* list of all the todos, displayed */}
        <ul></ul>
      </section>
    );
  }
}

export { App, FunctionalInput, ClassInput };
