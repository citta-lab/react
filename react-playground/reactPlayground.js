/*-----------------------------------------------------------------------------------
	Playground: https://jscomplete.com/repl/
	Purpose: Understanding the basic react examples.
	How: Each example are tested seperate and has been compiled in one file for ease 
	of read and understanding.
-----------------------------------------------------------------------------------*/

/*
  Example: 1
  Description: Rendering using react code instead of mixing it with Jsx, howeveer in real
  time application troubleshooting using react code would be cumbersome.
*/

const Button = function (props){
	return (
  	React.createElement("button",null,"Hey")
  );
}

ReactDOM.render(<Button/>, mountNode);

/*
  Example: 2
  Description: Rendering react code with Jsx which will be compiled to Example#1 code before   rendering it to virtual DOM.
*/

const Button = function (props){
	return (
  	<button>Oye</button>
  );
}

ReactDOM.render(<Button/>, mountNode);


/*
  Example: 3
  Description: Using react's properties (i.e props ) to generate dynamic changes in the UI. Props can be used to get update from the DOM to script and is immutable.
*/

const Button = function (props){
	return (
  	<button>{props.name}</button>
  );
}

ReactDOM.render(<Button name="Dynamic"/>, mountNode);


/*
  Example: 4
  Description: functional component cannot have state and props are immutable, so we can redfine the component using class component and use the private state object. However first lets convert the functional component to class component.
  Note: this refer to component instance given to react dom.
*/

class Button extends React.Component {
	render() {
  	return (
    	<button>{this.props.name}</button>
    );
  }
}

ReactDOM.render(<Button name="Dynamic"/>, mountNode);

/*
  Example: 5
  Description: Implementing private state tied to the component to change the values in the DOM.
  Note: this refer to component instance given to react dom.
*/

class Button extends React.Component {
  constructor(props){
  	super(props)
    this.state = { name : "StateName" }
  }
	render() {
  	return (
    	<button>{this.state.name}</button>
    );
  }
}

ReactDOM.render(<Button/>, mountNode);


