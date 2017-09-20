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


/*
Example: 8
Description: Creating multiple conponents to handle each scenario and passing the values between them. Here MyApp will be parent and Result, Button are child component of MyApp.
Notes: State is bind to component and having state in the parent react allow us to share the value of state with their child using props. For example: we are passing counter value
to Result component using incrementCount, and can be accessced via props in Result component.
*/


//Parent
class MyApp extends React.Component {
  state = { counter : 0 }
  
  incrementHandle = () => {
    this.setState((prevState)=>({
      counter:prevState.counter +1
    }));
  };

  render(){
    return (
      <div>
        <Button incrementFunction={this.incrementHandle} />
        <br/>
        <div>Counter in Parent (MyApp Component): {this.state.counter} </div>
        <Result incrementCount={this.state.counter}/>
      </div>
    )
  }
}

//Child1
class Button extends React.Component {
  render(){
    return(
      <div>
      <button onClick={this.props.incrementFunction}> Add One [+1]</button>
      <div> </div>
      </div>
    )
  }
}

//Child2
class Result extends React.Component {
  render(){
    return (
      <div> Counter in Child (Result Component) : {this.props.incrementCount}</div>
    )
  }
}

ReactDOM.render(<MyApp/>,mountNode)


/*
Example: 8
*/

//Parent
class MyApp extends React.Component {
  state = { counter : 0 }
  
  incrementHandle = (incrementValue) => {
    this.setState((prevState)=>({
      counter:prevState.counter + incrementValue
    }));
  };
  
  restHandle = () => {
    this.setState((prevState)=>({
      counter:0
    }));
  };

  render(){
    return (
      <div>
        <div> 
          <Button incrementValue={1} incrementFunction={this.incrementHandle} />
          <br/>
          <Button incrementValue={5} incrementFunction={this.incrementHandle} />
        </div>
        <br/>
        <div>Counter in Parent (MyApp Component): {this.state.counter} </div>
        <Result incrementCount={this.state.counter}/>
        <br/>
        <Reset resetFunction={this.restHandle}/>
      </div>
    )
  }
}

//Child1
class Button extends React.Component {

  valueHandle=()=> {
    return(
      this.props.incrementFunction(this.props.incrementValue)
    )
  }
  render(){
    return(
      <div>
      <button onClick={this.valueHandle}> Add [+{this.props.incrementValue}]</button>
      <div> </div>
      </div>
    )
  }
}

//Child2
class Result extends React.Component {
  render(){
    return (
      <div> Counter in Child (Result Component) : {this.props.incrementCount}</div>
    )
  }
}

//Child3
class Reset extends React.Component{
  render(){
    return(
      <button onClick={this.props.resetFunction}>Reset </button>
    )
  }
}

ReactDOM.render(<MyApp/>,mountNode)








