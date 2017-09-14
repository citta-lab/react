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

/*
Example: 6
Description: Shorter syntax (class property without the constructor which is converted to understandable syntax by babel ) of implementing state tied to the component to change the values in the DOM. 
*/

class Button extends React.Component {
 state = { name : "stateName-2"}
	render() {
  	return (
    	<button>{this.state.name}</button>
    );
  }
}

ReactDOM.render(<Button/>, mountNode);

/*
Example: 6
Description: Syntax to update the state upon user action using react's built setState. setState is the only function should change the state value.
*/

class Button extends React.Component {
//initial state
state = { value : "old"};

//is called from onClick
handleClick = () => {
  this.setState ({
      value:"new"
  });
};

  render(){
    return (
      <button onClick={this.handleClick}> {this.state.value} </button>
    );
  }
}

ReactDOM.render(<Button/>,mountNode)

/*
Example: 7
Description: Syntax to update the state upon user action using react's built setState. setState is the only function should change the state value.
a. initial state is defined ( state )
b. click handler is defined ( onClick )
c. arrow function ( () => )
d. setState is asynchronus and multiple asynchronus might cause problem, so function can be used to change the value instead of object itself.
d. previous state of state ( prevState )

*/

class Button extends React.Component {
//initial state
state = { counter : 0};

//is called from onClick and defined as component instance property ( accesed visa this )
handleClick= () => {
  this.setState((prevState) =>{
    return {
      counter: prevState.counter + 1
    }
  });
};
  render(){
    return (
      <button onClick={this.handleClick}> Count : {this.state.counter} </button>
    );
  }
}

ReactDOM.render(<Button/>,mountNode)



