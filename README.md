React [ juggling pebbles ]
--------------------------

React is javascript library not a framework like AngularJS, Angular and most of the React coding can be done by just knowing javascript and JSX. People claim react reinvented the wheel ( facebook seems to have used php with in html ) by letting javascript and html work together instead of being treated independent entity web applications. JSX is fancy way of saying html and javascript together, this requires a transpiler named 'Babel' to convert this JSX to javascript.

> if we are creating new app then we need to start by executing `sudo npm install -g create-react-app` where -g is global installation of create-react-app. In out next step we should be creating the app by executing `create-react-app firstreactapp`.

### Pointers

1. Don't use { and " " together when embedding javascript expressions in an attribute. Example: `const element = <img src={"user.avatarUrl"}></img>;` will throw exception instead do `const element = <img src={user.avatarUrl}></img>;`
2. JSX is closer to javascript than HTML. i.e use camelcase property name in place of `class` it will be `className` etc. Example: `<h1 className="greeting">`
3. All JSX should return one element. i.e `const elelemt = <div> WorkBook </div> <h1> Title </h1>;` will throw an exception instead do `const elelemt = <div> <div> WorkBook </div> <h1> Title </h1> </div>;`
4. XSS Prevention: React DOM escapes any values embedded in JSX before rendering.
5. What is React Element ? An element describes what we want to see on the screen ( these are not DOM elements ). Example: `const element = <h1>Hello, Roger</h1>;` What is Component ? Component is made of these react elements.
6. Components are isolated piece of code which accepts `pops` as inputs and returns react elements. So it's fair to say Components are made up of elements.
7. Always start component names with Uppercase. Example: `Welcome instead of welcome`.React treats components starting with lowercase letters as DOM tags.
8. `props` is a single property used in component. This holds everything the component needs to render.
9. All React components must act like pure functions with respect to their props.
10. Two ways we can implement components. Functional components which has just the `props` which is used to render data to the UI. and Class components which has both `props` and `state`.
11. We always need to declare `props` in class component constructor. "Class components should always call the base constructor with props".
12. 'lifecycle hooks' are used to control the particular piece of code to execute in the beginning of DOM loading or cleaning once the DOM is removed. Example: `componentDidMount()` and `componentWillUnmount()`.
13. If you don’t use something in render(), it shouldn’t be in the state.
14. In JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false. Example: ` {10 < 100 && <h1> The number is less than $100 </h1>}`.
15. Inline if-else, `<div> The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in </div>`.
16. Return `null` in the component if we don't want to render the called component. "Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods".
17. In rendering array or list React needs `key` to evaluate if the value is changed to re-render. Always use item `id` as the `key`, if `id` is not present use it's index as last resort. Also `key` act as hint to React and doesn't pass down to react component. i.e we can't access `key` in component like `props.key`.
18. Correct usage of `key`: Rule of thump, elements inside the map() call need keys.
19. `handleChange` runs on every keystroke to update the React state.
20. `Controlled Component`, This is used to avoid usage of default `html` forms. Instead of relying on html form element state we control form element state via React using `handleChange` function. By using this each element in the forms will have it's own handleChange function, so we can control and/or validate user input explicitly.
21. Most popular convention, which is to prefix the event handler with the word `handle` to distinguish it from regular class methods. Example: `handleClick` and/or `handleSubmit` and/or `handleChange`.
22. Always use function definition in React to call the function instead of results. i.e don't use `()` at the end of the function name. Example: `onSubmit={this.handleSubmit}` instead of `onSubmit={this.handleSubmit()}`
23. Callback function such as `handleSubmit` or `handleClick` or `handleChange` or any class methods needs to be bind to `this` in the component `constructor` to work. Example: `this.handleSubmit = this.handleSubmit.bind(this);`
24. React `props` should always treated as read only except in the place it was originally created. `you should consider props read only for the component they belong to, and change them only from the component that created them` by Hack with React.
25. Use composition over inheritance in React. Treat each modules as independent components and use them together when needed instead of inheriting from the parent. i.e Use `class Child extends React.Component` vs `class Child extends Parent`. This will enforce all components are inherited from the `React.Component` but later composition is used to make it work together. (Reference in attached in the Reference section).
26. Why do we use callback function to update the state ? Because state should always update it's own `state` so sending `callback` function from parent to child component and updating the data in the actual parent component.
27. React thinks `<hello />` is an HTML tag because it's not capitalized. So react component needs to starts with capitalized letter like `<Hello />`.
28. `...` spread operator. We can pass `props` object using spread operator instead of passing individually. Example: In `const props = {firstName: 'Ben', lastName: 'Hector'};` we can do `<Greeting {...props} />;`.
29. Each html tags, component tags are converted using `React.createElelement` before rendering it to the UI. Example: `return React.createElelement('div', {className: 'App'}, React.createElelement('h1', null, 'React App Test'));`. Here we must at least pass 3 or more parameters.
30. Accessing text/elements between opening and closing of the component can be done by using `props.children`. i.e `<Person name="Bob"> Watchman </Person>` Watchman can be accessed in `Person` component as `{props.children}`.


### Deep Dive

#### 1. Components
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

#### 2. Component ( reuse ):
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

#### 3. State:
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
[b]. Using ES6 class
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
* Don't mutate state.

[Rendering Data in Component](https://github.com/citta-lab/react/blob/master/react-playground/renderingDatainParentChild.md) document will take deep dive at state, props, how to leverage them and mutating and immutable concepts of state and props ( properties ) respectively.

3.1 State Mantra's :
* Never call `this.state` directly except in the constructor for initial state. Always use `this.setState();` once the state is initialized.
* `setState();` are batched together and updated as single update by React. So we should not rely on their values for calculating the next state. Same goes with the `props`.
* `setState();` merges the object with current state. So if the initial state has multiple attributes we can update any or all of the attributes of the state.
* `state` is local and encapsulated to each component. parent and/or child components doesn't know each others state. Every component owns it's own `state`.

If each component owns it's own date then how can we pass parent component state to it's child component ? Ah, through `props`. Remember `props` aka property is not unique to the component. So we can pass state like `<h1> sending my data {{this.state.name}} </h1>` or `<h1> sending my data name={{this.state.name}} </h1>`.

> imagine a component tree as a waterfall of props, each component’s state is like an additional water source that joins it at an arbitrary point but also flows down.

#### 4. Render():
------------------
Render method in react should be kept as pure functions and responsible for handling the request to DOM and nothing else. We can always add data call such has API / Ajax request inside the render but it will hinder the performance and divert from the design pattern. So to access / fetch data from the API and then manage these data via component state ( managing component data via state is called controlled component ) can be achieved using react's lifecycle hooks.
* ComponentWillMount ( checks before component's render method mounted to the DOM )
* ComponentDidMount ( checks once the render method mounted to the DOM )

```javascript
import * as UserCall from `./UserAPI`
class App extends React.Component {

  // set to empty state ( using property initializers )
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

#### 5. setState ( object style vs function style )
-----------
`setState` should be only place where initial state property should be changed. React process setState change request in batch process and they are asynchronous in nature. setState can be done in tow ways, one by passing an object and one by passing a callback function. It's always good practice to use the later one whenever the state change is depends on previous state.   

[a]. setState() using object:
```javascript
state = {
  company:'Google'
}

//based on user click changeCompany is called to change company name
changeCompany = () => {
  this.setState = {
    company: 'Facebook'
  }
}
```
In above scenario let us say changeCompany is called on user onClick function [ `onClick={this.changeCompany}`] and setState is used to override the initialized state value.

[b]. setState() using function:

```javascript
state = {
  count:0
}

//based on user click changeCount is called
changeCount = () => {
  this.setState(prevState => ({
    count: prevState.count +1
  }));
}
```
There are good discussion around when to use functional vs object setState and particularly [init state without constructor in react](https://stackoverflow.com/questions/42993989/init-state-without-constructor-in-react) talks about asynchronous behavior of the setState using object style and how we can fix it with callback functions. Also Sophia Shoemaker post on [Using a function in `setState` instead of an object](https://medium.com/@shopsifter/using-a-function-in-setstate-instead-of-an-object-1f5cfd6e55d1) explains a lot about functional setState.

#### 6. setState() [ useful functions ]
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

7. onChange vs onBlur
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

8. onChange in form ( vs onSubmit )
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

#### 9. Router ( Single Page Application )
------------------
[Single page apps in depth](http://singlepageappbook.com/goal.html) talks about SPA in details and React doesn't have this in built. So react training team has built a module which helps us achieve SPA in react apps. `React-Router` has been built for DOM and Native react application. Which is nothing but `<BrowserRouter/>` component implementation which leverages `history` library built by React training.         

>The three main building blocks of react router are `<BrowserRouter>` component which will wrap the entire application for routing, `<Link>` component to take user action and load appropriate url and finally `<Route>` component to load appropriate page based on user action done through <Link> component.

* install the module `npm install --save react-router-dom`.
* Implement <BrowserRouter/>, which will listen to url changes and loads the appropriate page. Add details in index.js page.
```javascript
import { BrowserRouter } from 'react-router-dom' // need to import the BroswerRouter

ReactDOM.render(
  <BrowserRouter><App/><BrowserRouter/>, // this will implement BrowserRouter to entire app
  document.getElementById('root')
)
```
* More details about [history library](https://github.com/reacttraining/history) used by <BrowserRouter/>.
* <Link/> component in react browser talks to <BrowserRouter> and changes the url according to user actions.
* <Link/> needs to be imported before using by `import { Link } from 'react-router-dom'` and can be used like any other component <Link to='/create'>Add</Link>.`to` does the same job as `href` in anchor tag <a/>.
* we can pass `pathname`, `state`, `query` etc in <Link/>. for more detail [Link](https://reacttraining.com/react-router/web/api/Link).
* <Route/> component can be used two ways one by using render function whenever we need to pass props to the component which we are intended to load based on the user action, Example: `<Link path="/menu" render={()=>(<Menu list={this.state.menus})} />`. Other way is just calling the component by mentioning component={ComponentName}. Example: `<Link path="/about" component={About}/>`.

#### 10. Redux
---------
The purpose of redux is to eliminate the long process of sharing state between multiple component to reach the intended component ( predictability in state ). What i mean is, By default React has powerful aspect `state` which manages the local state of the component but if the `state` needs to be shared between different (sibling) component then we design an app in such a way we keep the shared `state` in the parent and access the in it's child component. However if the intended component is 4 level down the line ( child of child of child of child ) then the `state` needs to be passed down to all of intended components parent. Also redux helps in caching to have better control on API calls.
The complete [Redux](https://github.com/citta-lab/react/tree/master/react-playground/redux) is discussed here.

#### 11. Convert Functional to Class Component
In the first example we will look into displaying Hello

11.1 Functional:
```javascript
function Employee(props) {
  return (
    //body
  );
}

ReactDOM.render(
    <Employee name="Bob" />,
    document.getElementById('root')
);
```
11.2 Body
```javascript
<div>
    <h1>Hello, {props.name}</h1>
</div>
```
In this scenario we will see "Hello Bob". When we move to class component we expect the same results as well.

11.3 Class:
```javascript
class Employee extends React.Component {
  render() {
    return (
      <div>
          <h1>Hello, {this.props.name}</h1> //this.props is added instead of just props
      </div>
  );
  }
}
// same ReactDOM.render function is used
```
11.4 Moving to State:

```javascript
class Employee extends React.Component {  
  constructor(props){ //first thing called when Employee is called.
  super(props); //should always call the base constructor with props.
  this.state = {"name":"Bob"}; //initial data declaration.
  }

  render() {
      return (
      <div>
        <h1> hello {this.state.name}</h1>
      </div>
    );
  }
}

ReactDOM.render(
<Employee/>,
document.getElementById('root')
);
```

#### 12. React Forms
---------
HTML forms mutate the form elements by itself which will cause problem in React world by having different state between the `view` and the `state`. The while idea of state management is to keep the view and state in synch, and have one directional flow (i.e view will always get updated from the state). In Angular 1, the state management was bidirectional and we could have updated state wither from model to view and/or view to model.

>> Keep React’s render() as close to the real DOM as possible, and that includes the data in the form elements.

The best practice is to implement the following things to sync the internal state,      
* Define elements in `render()` using values from internal state. Not hardcode the value in the form element how we typically do in html forms. Example: ` <input type="text" name="title" value="Bob"/>` is bad vs doing `<input type="text" name="title" value="{this.state.value}" />`.Specifying the value prop on a controlled component prevents the user from changing the input unless you desire so.        
* Capture change using React's `onChange()`. Typically HTML form's `onChange()` is only fired when element is out of focus or pressing tab where React's `onChange()` is triggered for every keystroke.     
* Update internal state in event handler. Example: `handleChange(event){ this.setState({title: event.target.value})}`.      
* React recommends using `onChange` over `onInput` which fires on each change.The reason is that React’s onChange wrapper behavior provides consistency.       
* Use React form's `onSubmit` over HTML for submit. Example: ` <form onSubmit={this.handleSubmit}> ..</form>`.      

Form implementation can also be done using uncontrolled component, further discussion is in this [blog](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/).


#### 13. Single Source of Truth ( keep state in parent )
---------
>> "Understand how to handle state in React way before thinking about Flux, Redux"

Each component has it's own `state`, so if we ever want to calculate something on component one (c1) based on component two (c2) then it would be hard to keep data in synch as they have their own state. So the best and easiest way is to `lift their state` to the parent and this will become the `single source of truth` and both c1 and c2 will refer from here. Sending state value to it's child component c1 and c2 can be done by well known `props`. `setState()` will only be called at the parent.

>> don’t keep state calculated from props, neither state that isn’t used in the render() method

#### 14. Setting up Debugger (Debugging with VSCode)
----------
* Install extensions `Debugger for Chrome` from Microsoft (Extensions in Activity Panel).
* Click on Debug Icon from left panel (Activity Panel).
* Create `launch.json` by clicking Configure icon from top panel (Debug View).
* Edit the generated `launch.json` or replace with below,
```json
{
    "version": "0.2.0",
    "configurations": [{
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceRoot}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }]
}
```
* Run the app by executing `npm run dev` (Terminal).
* Click Start Debugging (Debug View) [ you might have to reopen the chrome browser ].
* Reference [link](https://code.visualstudio.com/docs/editor/debugging) for more details.

#### 15. Styling
------
Need to declare `.css` file and add css file name same as css class name and add this to the div event where we need to add. This will be recognized by the webpack and adds it to the final html in the DOM.
```javascript
// file name of this css is People.css
.People{
  color: yellow,
  font: 12px,
}

//add this in the component file where we need to have this color change
import './People.css'

//declare this `People` as className in the div of the component
<div className="People">
  <button onclick={this.handleClick}> click </button>
</div>
```
OR we can also add inline styling by simply adding `<button style={style}>click</button>`. where style is `const style = { font: 'inherit', color: red}`.

#### 16. Handling Array / List of data in Component
----
If we are coming from Angularjs or Angualr then we used to populate list of data to the DOM using inbuilt directives such as `ng-repeat` or `ngFor` respectively. However in react everything is javascript so we can make use of it to populate the data in component.

Lets extract state from the code snippet to simplify the difference, so the state in class type component constructor looks like below,
```javascript
this.state = {
  persons: [
    {name: "Mahesh", age: 30, show: false},
    {name: "Bob", age: 45, show: false},
    {name: "Jon", age: 21, show: false},
  ]
}
```
Now in `render(){ .... }` method we would have below code,

16.1 Yucky way:
```javascript
render(){
  // ewww, going through each array index and sending as props.
  let personElement = (
    <Person name={this.state.persons[0].name}
    age={this.state.persons[0].age} show={this.state.persons[0].show} />
    <Person name={this.state.persons[1].name}
    age={this.state.persons[1].age} show={this.state.persons[1].show}/>
  )

  return(
    <div>
      {personElement}
    </div>
  );
}
```

16.2 Preferred way:
      
Hence we can write javascript inside render and render is called every time the state is changed we can make use of this to generate a list of components with each array element data as props using javascript map function.
```javascript
render(){

  let personElement = this.state.persons.map((person,index) => {
    return <Person name={person.name} age={person.age} show={person.show}/>
  })

  return (
    <div>
      {personElement}
    </div>
  );
}
```
Oh i added index as second element which i can use if needed but in our example we don't need so it can be simply `person => { return ...... }`.


Reference:
1. [React - this.input.value vs handle change](https://stackoverflow.com/questions/46572616/react-this-input-value-vs-handle-change/46572702#comment80106399_46572702)
2. [React Forms](https://www.sitepoint.com/work-with-forms-in-react/)
3. [React How To](https://github.com/petehunt/react-howto)
4. [Composition vs Inheritance](http://blog.brew.com.hk/react-101-composition-vs-inheritance/)
