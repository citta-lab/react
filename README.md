React [ juggling pebbles ]
--------------------------

React is javascript library not a framework like AngularJS, Angular and most of the React coding can be done by just knowing javascript and JSX. People claim react reinvented the wheel ( facebook seems to have used php with in html ) by letting javascript and html work together instead of being treated independent entity web applications. JSX is fancy way of saying html and javascript together, this requires a transpiler named 'Babel' to convert this JSX to javascript.

1. Components
------------------
Components are the way to dissect the application into smallest possible element which we can manage easily, When components are initialized react initiate the properties and we often call it `props`. Props can be used to communicate between components and meanwhile `state`'s are tied to the component ( local property of that component ) and needs to be defined before using. Components let us encapsulate, reuse and also configure them independently of each other is the main advantage. So in short components are reusable building blocks of React application.

```javascript
class ContactList extends React.Component {
  render(){

  	const people = this.props.contact
      return(
       <ol>
       	 {people.map((person,i) => (
        	<li key={i}>{person.name}</li>
        ))}
       </ol>
      )
  }
}
```
> Component render everything we have in render method to virtual DOM ( a DOM completely different from actual HTML DOM). [The difference between Virtual DOM and DOM](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/) has well explained about virtual DOM, DOM and HTML itself. If we want to dig more then [The Inner Workings Of Virtual DOM](https://medium.com/@rajaraodv/the-inner-workings-of-virtual-dom-666ee7ad47cf) has explained how it all works.

Now you may ask do we have different types of Components ? yes we do. (i) Functional Component and (ii) Controlled Component. The example above has class definition and hence let us use local property `state`. On the other that Functional Component has all the benefits but the `state` cannot be accessed by it's definition. Below is the example of functional component,

```javascript
//functional component
const App = (props) => {
	return (
  	<div>
    	<div> Parent Component </div>
    	<Card/> <!-- calling other component -->
    </div>
  );
};

ReactDOM.render(<App/>,mountNode);
```
we can use stateless components inside stateful components, and vice versa. "Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class."

2. Component ( reuse ):
------------------
ContactList component define the data rendering and presenting it to the virtual dom, we can reuse this component to output different values based on what we configure in our main app component.

```javascript
class App extends React.Component {
  render() {

		const employee = [
    	{name:'Jane'},
      {name:'Brad'}
    ]

    const reader =[
      {name:'Bob'},
      {name:'Rob'}
    ]

    return (
      <div className="App">
        <ContactList contact={employee}/> //component called first time with first set of data
        <ContactList contact={reader}/> //component called second time with different set of data
      </div>
    );
  }
}

ReactDOM.render(<App/>,mountNode);
```
In App component we have reused the `ContactList` twice and configure them independently of each other to set different data values.

3. State:
------------------
As we mentioned earlier `state` is a local property of the component, and every user action trigger a state change and new rendering will begin to display the user with newly changed state. Though `state` is tied to component we need to initialize it explicitly, there are three way.
[a]. Using react class
```javascript
var NameCheck = React.createClass({
    getInitialState: function() {
        return {name: 'Bob'};
    }
});
```
[b].Using ES6 class
```javascript
class NameCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: 'Bob'};
    }
}
```
[c]. Using ES7 class
```javascript
class NameCheck extends React.Component {
    state = {name: 'Bob'}; // no constructor or this key word
}
```
we can declare `state` in ES7 outside of the constructor and without using `this` keyword. Thanks to it's Property initializers. [Use property initializers for cleaner code ](https://www.fullstackreact.com/articles/use-property-initializers-for-cleaner-react-components/) talks about the benefits with more detailed example.

`State` must do:
* Don't keep something in state that we don't use for rendering. Example: API subscriptions are better off as custom private fields or variables in external modules.
* Don't hold state based on props calculation.
* Don't duplicate data from props in state.
* Don't create controlled component if component doesn't have to manage state.

[Rendering Data in Component](https://github.com/citta-lab/react/blob/master/react-playground/renderingDatainParentChild.md)

Above document will take deep dive at state, props, how to leverage them and mutating and immutable concepts of state and props ( properties ) respectively.

4. Render():
------------------
Render method in react should be kept as pure functions and responsible for handling the request to DOM and nothing else. We can always add data call such has API / Ajax request inside the render but it will hinder the performance and divert from the design pattern. So to access / fetch data from the API and then manage these data via component state ( managing component data via state is called controlled component ) can be achieved using react's lifecycle hooks.
* ComponentWillMount ( checks before component's render method mounted to the DOM )
* ComponentDidMount ( checks once the render method mounted to the DOM )

```javascript
import * as UserCall from `./UserAPI`
class App extends React.Component {

  // set to empty state
  state = {
    name:[]
  }

  // mount checks
 ComponentDidMount(){
   UserCall.getData().then((data) => this.setState({
     name: data
   }))
 }

  render() {
    return (
      <div className="App">
        <span> { this.state.name}</span>
      </div>
    );
  }
}

ReactDOM.render(<App/>,mountNode);
```
* render() method will load div with empty state
* Once the DOM render is complete ComponentDidMount() is called
* setState is called and state value has been changed
* setState re-triggers the render method and render() method id called with state.name value

5. setState
-----------



6. setState() [ useful functions ]
------------------
There are few examples i fumbled into which we can refer to alter the data using setState are as mentioned below,

* setState in componentDidMount()
```javascript
componentDidMount(){
    ContactsAPI.getAll().then((data)=> this.setState({
      contacts: data
    }))
  }
```
* setState to filter data
```javascript
removeContact = (contact) => {
    this.setState((prevState) => ({
      contacts:prevState.contacts.filter((c) => c.id !== contact.id )
    }))
  }
```

Above filter will set new state with non matching user inputted contact id.

* setState to trim
```javascript
updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
    }
```
inserted values are trimmed for space and tabs

6. onChange vs onBlur
------------------
The idea behind when to use onChange vs onBlur is upto the developer, if they want UI rendering to happen for every key stroke the user punch in or they are interested only when the user cursor is out of focus. The later is more ideal. Below is the example snippet handling both,
* In first example setState is called for every key stroke, so state change will trigger render and DOM will change with updated data.
* In second example setState is called once the cursor is out of focus, state change happens at the end and render method is called once ( not always, depends on user input )

```javascript
//Component to explain onChange
class Onchange extends React.Component {

	state = {
  	entry: ''
  }

  handleChange = ( event ) => {
  	this.setState({
    	entry:event.target.value
    })
     console.log(" onChange : "+this.state.entry)
  }

	render(){
  	return(
    	<div styles={{float : 'left', paddingRight : '5px',color:'blue'}}>
      	<div> Input : </div>
      	<input placeHolder="Add Entry" onChange={this.handleChange}/>
      <br/>
      You typed: <code>{this.state.entry}</code>
      </div>
    )
  }
}

//Component to explain onBlur
class Onblur extends React.Component {

	state = {
  	query: ''
  }

  handleBlur = ( event ) => {
  	this.setState({
    	query:event.target.value
    })
    console.log(" onBlur : "+this.state.query)
  }

	render(){
  	return(
    	<div>
      	<div onBlur={this.handleBlur}> Input : </div>
      	<input placeHolder="Add Entry" onBlur={this.handleBlur}/>
        <br/>
        You typed: <code>{this.state.query}</code>
      </div>
    )
  }
}

//Component to hold both onChange and onBlur
class App extends React.Component {
	render(){
  	return(
    	<div>
    	  <Onchange/>
        <Onblur/>
    	</div>
    )
  }
}

ReactDOM.render(<App />, mountNode);
```
Reference:
1. [How to "onchange" in ReactJS](https://www.peterbe.com/plog/onchange-in-reactjs)
2. [What is the difference between onBlur and onChange attribute in HTML?](https://stackoverflow.com/questions/785099/what-is-the-difference-between-onblur-and-onchange-attribute-in-html)

> Why does `value` to display state's initial value works fine on onChange but not onBlur ?                 Answer: `value` of the input element is tied to the react's state. If the value is changed, then state and input value element no longer tied to reach other as onBlur will only need to trigger on out of focus. So react prevents this happening by blocking the keyboard strokes. Initial state value however can be displayed using defaultValue

7. onChange in form ( vs onSubmit )
------------------
In React form's we can use `onChange` on every input element which we can leverage to handle the change on each element. If we need to handle once for all form element then we can use `onSubmit` however this might work for most of the scenario but field level immediate validation might be a problem. The workaround was to call same `onChange` method from all form element and can setState.

```javascript
class Hello extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '', lastName: '', email: '', acceptTerms: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
	}
  handleInputChange(e){
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
}
  render() {
  	const { firstName, lastName, email, acceptTerms } = this.state;
    return (
    <div>
        <form>
            <input name="firstName" onChange={this.handleInputChange} value={firstName} />
            <input name="lastName" onChange={this.handleInputChange} value={lastName} />
            <input name="email" onChange={this.handleInputChange} value={email} />
            <input type="checkbox" name="acceptTerms" onChange={this.handleInputChange} checked={acceptTerms} />
        </form>
        <hr/>
        <div>{firstName}</div>
        <div>{lastName}</div>
        <div>{email}</div>
        <div>{acceptTerms ? 'true':'false'}</div>
        </div>
    )
  }
}

ReactDOM.render(
  <Hello initialName="World"/>,
  document.getElementById('container')
);
```
Reference:
1. [React - this.input.value vs handle change](https://stackoverflow.com/questions/46572616/react-this-input-value-vs-handle-change/46572702#comment80106399_46572702)
2. [React Forms](https://www.sitepoint.com/work-with-forms-in-react/)
