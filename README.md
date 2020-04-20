preciselyReact [ juggling pebbles ]
--------------------------

React is javascript library not a framework like AngularJS, Angular and most of the React coding can be done by just knowing javascript and JSX. People claim react reinvented the wheel ( facebook seems to have used php with in html ) by letting javascript and html work together instead of being treated independent entity web applications. JSX is fancy way of saying html and javascript together, this requires a transpiler named 'Babel' to convert this JSX to javascript.

> if we are creating new app then we need to start by executing `sudo npm install -g create-react-app` where -g is global installation of create-react-app. In out next step we should be creating the app by executing `create-react-app firstreactapp`.

React embraces the concept of `composibality` by letting the developer write small unit of function (called as components) which focuses on doing one thing. These components responsible of returning `UI` element rather than object compared to javascript functions.

### Pointers

1. Don't use { and " " together when embedding javascript expressions in an attribute. Example: `const element = <img src={"user.avatarUrl"}></img>;` will throw exception instead do `const element = <img src={user.avatarUrl}></img>;`
2. JSX is closer to javascript than HTML. i.e use camelcase property name in place of `class` it will be `className` etc. Example: `<h1 className="greeting">`
3. All JSX should return one element. i.e `const element = <div> WorkBook </div> <h1> Title </h1>;` will throw an exception instead do `const element = <div> <div> WorkBook </div> <h1> Title </h1> </div>;`
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
31. Two ways of calling function in list. Example 1: `onClick={this.handleClick.bind(this,index)}` or Example 2: `onClick={()=>{this.handleClick(index)}}`.
32. Slice or Spread Operator: If we want to copy the array before manipulating then we can either `slice` before performing action or copy the objects using `[...array]`. Example: `const newArray = this.state.people.slice();` or `const newArray = [...this.state.people];`.
33. Splice vs Splice : we can copy the object using `slice()` however we can remove element inside an array using `Splice()`. So often we use splice on an array to create new array and splice on the new array to removed the element. This avoids `mutating` the original array.
34. Why do we need `key` property while rendering the DOM ? : If we don't mention the `key` while rendering list of components then react will always re-render the whole list and compare with the virtual dom. However if we use `key` property in the list then react will only render the components associated with the key and hence the computational work is less.
35. Using `index` vs `id` in KEY: Typically index is always part of the list and any alteration to the data-set will result in change in `index` so it is not really unique with respect to React. So having / using `id` of an element helps the React much better. Example: `<BuildingHome key={eachHome.id} name={eachHome.name} price={eachHome.price}/>`is bette than using key like `<BuildingHome key={index} name={eachHome.name} price={eachHome.price}/>`.
36. Make use of `PureComponent` only if the we have very minimal `props` or `state` change in the parent component so we can compare the props o state before rendering otherwise use `Component`.
37. Higher Order Components can be used to wrap the JSX code instead of using / creating `<div>` elements in the return function. But from React 16.2 we can use `Fragments` instead of Higher Order Component which coverts to higher order components once compiled. Example: `return(<div>.....</div>)` can we written using higher order component as `return( <Aux>.....</Aux>)` and the same thing can be written using fragments as `return (<> ....</>)`
38. Dynamic Image Import : we need to use `import logo from '../../images/example.png'` and use the logo as `img={logo}` instead of `<img src="../../images/example.png"`.
39. Remove trailing comma from the object. example: `Example = { data: value, region: "state", job: "sales" }` instead of `Example = { data: value, region: "state", job: "sales", }`.
40. Absolute path means that it's always appended right after your domain. Therefore, both syntaxes (with and without leading slash) lead to `example.com/some-path`. Relative paths are appended to the already existing path not add path right after the domain name, i.e `example.com/some-path/relative-path`.
41. Order is very important while using `<Route>` and `<Link>` from 'react-router-dom'. If we wrap all the `<Route>` defined with `<Switch>..</Switch>` then it will only let load first matched pathname.
42. `<Redirect from="" to="">` component can be used to load the page once user action is completed on different page, However if we don't use <Redirect/> with in `<Switch>..</Switch>` we will not have access to `from` property. In this case we can make use of `state` to conditionally check or use `this.props.history.push("/page")` or `this.props.history.replace("/page")` to achieve the same.
43. Two Way Binding: If we are interested in displaying the state name in the input text box and then updated the state based on user input then we can do two way binding. Example: `<input type='text' onChange={this.handleChange} value={this.state.name}>`. where handleChange would be `handleChange =(event) => { this.setState({ name: event.target.value })}`.
45. React is declarative coding: Example: `<button onClick={handleUser}>Activate User</button>` we are not defining any `addEventListener()` but letting the react worry about that part when the user clicks on the button. Incase of Imperative code we instructs JavaScript on how it should perform each step.
46. React is unidirectional data flow. Data always flow from PARENT to CHILDREN by using props and if we need PARENT to be updated then we use callback. In frameworks like Angular, Ember data flow is bi-directional.
47. React uses javascript object structure to build the UI instead of string template ( diff between other frameworks) which then be used to build the DOM nodes.
48. React's `.createElement()` method takes in a description of an element and returns a plain JavaScript object.
49. In React we have to use `htmlFor` instead of `for` and `className` instead of `class'. As these 'for', `class` are reserved word in JavaScript.
50. `render()` method is the only required method in react class component.
51. If we are interested in passing data in onClick callback then we could do using annonymous function. `<button className='remove-item' onClick={() => props.onDelete(item)}>`. 

### Core

#### 1. Using JavaScript:
Before we jump into building UI elements in React it's important to know how React differs from actual DOM manipulation. Below is example of building `Hello World` in javascript.
```javascript
<!-- Basic JavaScript-rendered Hello World -->
<html>
     /** root element, we would attach everything to */
    <div id='root'>
        <script type='text/javascript'>
        /**
          1. find the root element i.e rootElm
          2. create an element for building context i.e element
        */
        const rootElm = document.getElementById('root');
        /** add content, style etc **/
        const element = document.createElement('div');
        element.textContent = "Hello World";
        element.className ='container';
        element.title = 'using javascript'
        /** append it to root, which will be rendered to UI **/
        rootElm.appendChild(element);
        </script>
    </div>
</html>
```

#### 2. Using React:
Instead of using `document` property of `DOM` we will be using React api's to create an element and then to render the element to the React DOM ( which is different from actual DOM ).
```javascript
import react from 'react';
import ReactDOM from 'react-dom';

<!-- Basic React-rendered Hello World -->
<body>
    <div id="root"></div>
    <script src="../react.development.js"></script>
    <script src="../react-dom.development.js"></script>
    <script type="text/javascript">
        const rootElement = document.getElementById('root');
        // instead of document.createElement
        const reactElement = React.createElement('div', {
            children: 'Hello World, React',
            className: 'container'
        })
        //instead of rootElm.appendChild
        ReactDOM.render(reactElement, rootElement);
    </script>
</body>
```
`children` in the `React.createElement` is content or any child elements present between the `div`. Example: In `<div> HI </div>` HI becomes the children. If we have multiple elements such as `span` or `h1` or `div` then we can pass array of elements like `children: [hiElement, byeElement]` where these elements are created using `React.createElement`.

#### 3. Using React and JSX:
Instead of using `React.createElement` we can use JSX syntax to create elements however we cannot use them directly without converting into `JavaScript`. Hence the transpiler, transpiler looks for code with in `script` tags and converts to javascript before loading.

```javascript
<body>
    <div id="root"></div>
    <script src="../react.development.js"></script>
    <script src="../react-dom.development.js"></script>
    /** load transpiler to convert JSX to javascript */
    <script src="../babel.js"></script>
    /** change type from text/javascript to text/babel */
    <script type="text/babel">
        const rootElement = document.getElementById('root');
        // JSX code below
        const reactElement = (
            <div className='container'>
                <h1> Hello, World </h1>
                <span> Example of Child element </span>
            </div>
        )
        ReactDOM.render(reactElement, rootElement);
    </script>
</body>
```

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

##### 3.1 Optimistic Update: 
Typically we will fetch an API to get, update, delete items from the UI and once the data is fetched we will update the state so react will render the data on the page, this might work great when we do get but often during remove/delete or update we sometimes want to reflect the UI with latest changes and handle API update gracefully, i.e Optimistic Update.
```javascript 
// Appraoch 1: Always relay on database and will be delay in deleting items.
removeMovie = (movie) => {
  return API.delete(movie.id)
  .then((data) => {
    this.setState(() => ({
      movies: data // always updated data from database
    }))
  })
}

// Approach 2: Update the state, then handle the database
removeMovie = (movie) => {

  this.setState((prevState) => ({
    movies: prevState.movies.filter((m) => m.id !== movie.id)
  }))

  return API.delete(movie)
  .catch(() => {
    this.setState((prevState) => ({
      movies: prevState.movies.concat(movie)
    }));
    console.error('Error deleting the movie : '+movie.id)
  })
}
```


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

4.1 LifeCycle Creation

```javascript
constructor(props) ---> ComponentWillMount ---> render() ---> Render Child Component ---> componentDidMount (can cause side effects, call API call but don't setState)
```

4.2 Lifecycle of Update

```javascript
componentWillReceiveProps(nextProps) --> shouldComponentUdate(newProps, nextstate) --> componentWillUpdate(newProps, newState) -->render() ---> Update all child components ---> componentDidUpdate()
```
we can make use of shouldComponentUdate method to compare if the newProps has been changed with respect to old props ( i.e newProps.person != props.person ) then only we can let the react know to execute the render() method. this helps in boosting the performance of the app. However we can implement this without this headache by using `pureComponent` instead of `Component` in the class declaration and this will enforce the react to have the inbuilt check of shouldComponentUdate logic.

```javascript
import React, {Component} from `react`;
class Person extends Component {
  .....
}

// can we written using PureComponent as
import React, {PureComponent} from `react`;
class Person extends PureComponent {
   ...
}
```
When pureComponent is used, it does `shallow` comparison between `old prop` and `old state` with `new props` and `new state`. However the main important thing here is it only compare the equality check between the two. Example: it will check the if object, array has same references as allow instead of comparing it's innermost property value. Doing innermost property check is called `deep` comparison which is is time consuming and hinders the performance. IMPORTANT : we need to make sure we don't mutate the data ( i.e state and props ) in component. Example: if the parent component mutates it's state then those changes will not be picked up in child component as `shallow` comparison is happening between current component props/states. Nice blog on [pureComponent](https://lucybain.com/blog/2018/react-js-pure-component/).

#### 5. setState ( object style vs function style )
-----------
`setState` should be only place where initial state property should be changed. React process setState change request in batch process and they are asynchronous in nature. setState can be done in two ways, one by passing an object and one by passing a callback function. It's always good practice to use the later one whenever the state change is depends on previous state.   

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
> Page are stalked on top of each other when we navigate between different pages, React router make use of this using it's `history` prop to allow us to achieve the same behavior as the native browser.

[Single page apps in depth](http://singlepageappbook.com/goal.html) talks about SPA in details and React doesn't have this in built. So react training team has built a module which helps us achieve SPA in react apps. `React-Router` has been built for DOM and Native react application. Which is nothing but `<BrowserRouter/>` component implementation which leverages `history` library built by React training.         

>The three main building blocks of react router are `<BrowserRouter>` component which will wrap the entire application for routing, `<Link>` component to take user action and load appropriate url and finally `<Route>` component to load appropriate page based on user action done through <Link> component.

* install the module `npm install --save react-router-dom`.
* Implement <BrowserRouter/>, which will listen to url changes and loads the appropriate page. Add details in index.js page.
```javascript
import { BrowserRouter } from 'react-router-dom' // need to import the BrowserRouter

ReactDOM.render(
  <BrowserRouter>
    <App/>
  <BrowserRouter/>, // this will implement BrowserRouter to entire app
  document.getElementById('root')
)
```
Once we have wrapped our root component with the `BrowserRouter` we are all set to explore routing, below are the scenario we will face,

##### 9.0 Preparation
Prep Example:  
Image we have defined navigation in our `App.js` return function as follows,
```html
<header>
  <nav>
    <li><a href="/">Home</a></li>
    <li><a href="new-person">New Person</a></li>
    <li><a href="contact">Contact</a></li>
  </nav>
</header>
```
Lets understand the example of updating anchor tag to Link tag,
Before:
```html
<a href='#create' onClick={() => callback()} className='add-item'> Add Item</a>
```
After:
```html
<Link to='/create' className='add-item'> Add Item </Link>
```

##### 9.1 Path
Now we need to define routes to load the page when the user clicks on these `href`, so we implement route from the library. While using `<Route />` from the react-router-dom we need to pass in the path which will direct the page to be loaded. `<Route />` is self closing component, below is the example of using home page routing.
```javascript
import Route from 'react-router-dom'; // Need to be imported.
<Route path="/" render={() => <h1> Hello, Welcome Home </h1>} />
```
Notice here, whenever the matching path `/` is matched Route will load the page. Example: In browser url if the path is `http://localhost:3000/` it will load the page with `Hello, Welcome Home` however it will load the same page even if the path is `/new-person`. So it acts as `contains` rather than EXACT, if we need to ONLY match the Route to match defined path `/` then we need to use the boolean `exact` in the Route.
```javascript
// example test case just to render simple things
<Route path="/" exact render={() => <h1> Hello, Welcome Home </h1>} />
//Similarly, default case we would use in real projects
<Route path="/" exact component={ComponentName} />
```
So we can define different paths as mentioned below for our example scenario,
```javascript
<Route path="/" exact component={HomeComponent} />
<Route path="/new-person" exact component={NewPerson} />
<Route path="/contact" component ={Contact} />
```

##### 9.2 Link ( aka Prevent Reload )
From the above Route definition if the user clicks on any of the navigation `href` links defined in `9.0 Preparation` step it reloads the whole app which loses the state. Instead we should only re-render the page, not reload the entire React app. So `Link` component from `react-router-dom` comes to rescue. It acts as an anchor tag `href` with more feature, so our anchor tags will become,
```javascript
<header>
  <nav>
    <li><Link to="/">Home</Link></li>
    <li><Link to={{
      pathname: '/new-person',
      hash: '#submit',
      search: '?search=true'
    }}>New Person</Link></li>
    <li><Link="contact">Contact</Link></li>
  </nav>
</header>
```
Now if we click on New Person the browser url will look like `http://localhost:3000/new-person?search=true#submit` and the app re-renders the page instead of 'RELOADING'.

> pathname defined using Link are always absolute path by default. i.e it will replace the current path by declared path. If we need to use the relative path ( append declared path to existing url path ) then we need to make use of router related match props like `pathname: this.props.match.url + '/new-person'`.

More information about router path in below section. If we inspect the navigation element from `anchor` tag and from `Link`
component we see the information as below,
```html
<li><Link to="/">Home</Link></li>
<!-- INSPECTED PROPERTY ( added by Link )-->
<a aria-current="true" href="/">Home</a>
```
If we need to add custom style then we need to import `NavLink` instead of `Link` which comes with more features than `Link`. So if we replace `Link` from the above we can add custom class name for styling,
```javascript
import { NavLink } from 'react-router-dom';
<header>
  <nav>
    <li><NavLink exact
      to="/"
      activeClassName="my-active"  //this will overwrite default active class added by NavLink.
      activeStyle={{  // defining css property.
        color: '#fa923f',
        textDecoration: 'underline'
      }}
    >Home</NavLink></li>
    <li><NavLink to={{
      pathname: '/new-person',
      hash: '#submit',
      search: '?search=true'
    }}>New Person</NavLink></li>
    <li><NavLink="contact">Contact</NavLink></li>
  </nav>
</header>
```

##### 9.3 Route-Props ( passed by Route )
`<Route />` passed down extra props related to routing which we can leverage further, we can add `console.log(this.props)` in any of the components (the one defined using Route ) `ComponentDidMount` lifecycle hook to verify. This gives more information about routing details using `history`, `location` and `match` object details. Keep an eye on `goBack` and `goForward` attributes from `history` which we can leverage for navigating using browser back and forward button :).
> However by default these routing props are not passed down to child component of component defined in in the Route.

##### 9.4 withRouter ( pass props down )
If we need to use the routing related props in child component of the routed path component then we can use the higher order component `withRouter` from the `react-router-dom`.
```javascript
// file: childComponentOfNewPerson.js
import { withRouter } from 'react-router-dom';
...
export default withRouter(childComponentOfNewPerson);
// Here childComponentOfNewPerson is used in NewPerson component.
```
There is also an another way where we just manually pass down the props we are interested to it's respective child component using spread operator like `<childComponentOfNewPerson location={...this.props.location} />` or all the props of NewPerson like `<childComponentOfNewPerson {...this.props} />`.

##### 9.5 Query Param ( using Link/NavLink)

###### Method 1:  

As we know router props comes with additional prop attributes which we can leverage one such thing is `this.props.match.params`. If we decide to pass some person id to `Personal` component to display full details then we need to define the query param in the Route,
```javascript
<Route path="/:id" component ={Personal} />
/* query param will be id, added to Personal component */
```

Now we make use of Link component to pass the id to Personal component from wherever we are calling the Personal component.
```javascript
<Link to={"/" +person.id} key={person.id}> <Personal .../></Link> //passing id value to the url
/* before it was <Personal key={person.id} name={person.name} job={person.job}/>*/
```

We make use of `ComponentDidMount` in Personal component to retrieve the value of router props to validate and build the appropriate jsx.
```javascript
componentDidMount () {
  if ( this.props.match.params.id ) {
    //here we are using the query id to call restApi for the data.
    axios.get('/posts' +this.props.match.params.id)
    .then(res => {
      this.setState({ personalLoadData : true})
    })
  }
}
```
Wrapping all or needed `<Route/>` using `<Switch>` we can prevent router to load more than one matching pages based on pathname match and not use `exact`. So our <Route> might look as below,
```javascript
<Route path="/" exact component={HomeComponent} />
<Switch>
  //only loads one of the below at once, so the ORDER is important.
  <Route path="/new-person" exact component={NewPerson} />
  <Route path="/contact" component ={Contact} />
</Switch>
```

###### Method 2:

Instead of using `<Link/>` we can make use of router props to extract and load the appropriate page on click. We can add logic to extract the clicked id and push the path we want to route to, so example from Method 1 becomes,
```javascript
//<Link to={"/" +person.id} key={person.id}> <Personal .../></Link> //passing id value to the url
<Personal key={person.id} name={person.name} job={person.job} onClick={this.handleRoutePath(person.id)}/>*/

/*handler method, this replaces the need of having <Link to={"/" +person.id} key={person.id}> .. */
handleRoutePath = (id) => {
  this.props.history.push({pathname: '/' +id});
  //or this.props.history.push('/'+id);
}
```
Further we can also make use of `this.props.match.url` to dynamically load the path in Route. So we can re-write `<Route path="/:id" component ={Personal} />` to `<Route path={this.props.match.url + "/:id"} component ={Personal} />`.

##### Notes
* More details about [history library](https://github.com/reacttraining/history) used by <BrowserRouter/>.
* <Link/> component in react browser talks to <BrowserRouter> and changes the url according to user actions.
* <Link/> needs to be imported before using by `import { Link } from 'react-router-dom'` and can be used like any other component <Link to='/create'>Add</Link>.`to` does the same job as `href` in anchor tag <a/>.
* we can pass `pathname`, `state`, `query` etc in <Link/>. for more detail [Link](https://reacttraining.com/react-router/web/api/Link).
* <Route/> component can be used two ways one by using render function whenever we need to pass props to the component which we are intended to load based on the user action, Example: `<Link path="/menu" render={()=>(<Menu list={this.state.menus})} />`. Other way is just calling the component by mentioning component={ComponentName}. Example: `<Link path="/about" component={About}/>`.

#### 10. Redux
---------
The purpose of redux is to eliminate the long process of sharing state between multiple component to reach the intended component ( predictability in state ). What i mean is, By default React has powerful aspect `state` which manages the local state of the component but if the `state` needs to be shared between different (sibling) component then we design an app in such a way we keep the shared `state` in the parent and access the in it's child component. However if the intended component is 4 level down the line ( child of child of child of child ) then the `state` needs to be passed down to all of intended components parent. Also redux helps in caching to have better control on API calls.
The complete [Redux](https://github.com/citta-lab/react/tree/master/react-playground/redux) is discussed here.

Redux is a javascript state container can be used not just in React apps but any javascript apps.Main parts of Redux are ( example from Udacity program ).
* Store
* Actions
* Reducers

Step 1:
##### 10.1 : ACTIONS
`ACTIONS` are set of rules defined to update the store. These are just objects with `type` and some property depending on the type of action. We can only use these ACTIONS to make changes to the state in store. We will look into STORE later. 

Imagine we have a state in store looks like below,
```javascript 
const state = [{ flavor: 'Chocolate', count: 12 }];
```
Then we can create adding and deleting flavor using below actions,
```javascript 
{
  type: 'ADD_FLAVOR'
  todo: {
    flavor: 'Vanilla',
    count: 30
  }
}

// similarly delete can be 
{
  type: 'DELETE_FLAVOR',
  flavor: 'Chocolate'
}
```

STEP 2:
##### 10.2 Reducers:
Is a PURE function which is used to update the `STATE` by taking current state and a `ACTION` to produce new `STATE`. Below is the example of REDUCER function used to delete and add items from/to state.
```javascript 
const state = [{ flavor: 'Chocolate', count: 36 }, { flavor: 'Vanilla', count: 210 }];

// Delete Example
const deleteAction = { type: 'DELETE_FLAVOR', flavor: 'Vanilla' }

function deleteReducer(state, action){
    if(action.type === 'DELETE_FLAVOR'){
        return state.filter((item) => item.flavor !== action.flavor);
    }
    return state;
}

let newState = deleteReducer(state, deleteAction);
console.log(newState); // [{ flavor: 'Chocolate', count: 36 }]

// Add Example
const addAction = { type: 'ADD_FLAVOR', todo: { flavor: 'Peach', count: 1229  }}

function addReducer (state =[], action){
  if( action.type === 'ADD_FLAVOR' ){
    return state.concat([action.todo]);
  }

  return state;
}

newState = addReducer(state, addAction);
console.log(newState); // [{ flavor: 'Chocolate', count: 36 }, { flavor: 'Peach', count: 1229  }]
```

STEP 3:
##### 10.3 Store :

Let us understand by creating store with all these features, and see how ACTIONS and REDUCERS are used in the store to update the state.
- Store 
--  State ( initializing state tree )
--  Getter Method ( getting state )
--  State Listner ( update callbacks keeper )
--  Dispatcher ( running reducer )

The idea of store is wrapping the state management within a function and allowing the state to be accessed via getter method, So if we want to cover the `State Tree` and `Getter Method` then the createStore function would look something like below,

```javascript 
function createStore(){
  let state; // state tree
  const getState = () => state;  // getter method
  return {
    getState 
  }
}
```
We can let the user add callbacks which can be excuted when the state is updated. So previous code will be udpdated to,
```javascript 
function createStore(){
  let state; 
  const listners = [];
  const getState = () => state;  
  const subscribe = (callbackFun) => listners.push(callbackFun); 
  return {
    getState,
    subscribe
  }
}
/** getting update */
const store = createStore(); // returns { getstate, subscribe }
store.subsribe(() => console.log('Current state is : '+store.getState())); // prints the state
```
Next step we can allow users to unsubsribe and use dispatch to UPDATE the state using REDUCER ( with the help of ACTIONS ) and call the callbackFun which are intendend to be excuted when there is a state update.
```javascript 
function createStore(reducer){
  let state; // state tree
  const listners = []; // holds all registered callbacks
  
  const getState = () => state;  // returns current state
  
  // way to register callbacks to run when state is updated (takes in functions that will be called when the state changes)
  const subscribe = (callbackFun) => {
    listners.push(callbackFun); 
    return () => {
      listners = listners.filter((listner) => callbackFun !== listner );
    }
  }

 // way to update the state, then call the registered callbacks
  const dispatch = (action) => {
    state = reducer(state, action);
    listners.forEach((callbackFun) => callbackFun());
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

// Note: 'REDUCER' can be one reducer which handles all the ACTION's instead of having different reducer for different actions
```
Example of [adding](https://gist.github.com/citta-lab/431196ccd77d11a6751372ffab308704) item to store and deleting item from the store. Complete [example](https://github.com/udacity/reactnd-redux-todos-goals/blob/more-actions/index.js) of Adding, deleting, toggling boolean in store using reducer from udacity. However as the app state grows we will have more state to manage, hence the corresponding reducers. To solve this problem `root reducers` are created and Tyler has great explanation code here with one reducer which will return more than one reducers state which can used while creating store. [root](https://github.com/udacity/reactnd-redux-todos-goals/blob/combine-reducers/index.js) reducer example.

##### 10.4 Middlware :

Until now we have been store from the librabry, reducer, actions and dispather to get and update the state in the store. If we want to add a middleware to perform some checks or mutation ( ex: logging, validation ) then it has to be performed between calling `dispatcher` and calling `reducer` which is the implementation details abstracted away from us ( aka is defined in store ). Hence Redux provides a out of the box solution to add these middlewares and will be ran after calling dispatch and before calling reducer. 

```javascript 
const store = Redux.createStore(reducer, Redux.applyMiddleware(middlewareOne, middlewareTwo));

// defining middlewareOne
function middlewareOne(store){
  return function (next){  // calls next middlewareTwo once middlewareOne is called
    return function (action){
      ....
      ....
      return next(action)
    }
  }
}
```




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

>> In Short, Controlled components refer to components that render a form, but the "source of truth" for that form state lives inside of the component state rather than inside of the DOM.

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

#### 15. Styling ( CSS )
------

##### 15.1 Styling with Basic CSS

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

##### 15.2 Advance Styling

We can use `radium` which needs to wrap the `<App/>` component and need to export the main and sub modules of radium before using it. This can be used to add `:hover` and `@media` queries to the CSS. Alternative way to do above is using `CSS Modules` which doesn't use `Radium`.

#### 16. Handling Array / List of data in Component
----
If we are coming from Angularjs or Angualr then we used to populate list of data to the DOM using inbuilt directives such as `ng-repeat` or `ngFor` respectively. However in react everything is javascript so we can make use of it to populate the data in component.

Lets extract state from the code snippet to simplify the difference, so the state in class type component constructor looks like below,
```javascript
this.state = {
  persons: [
    {id: "01", name: "Mahesh", age: 30, show: false},
    {id: "02", name: "Bob", age: 45, show: false},
    {id: "03", name: "Jon", age: 21, show: false},
  ]
}
```
Now in `render(){ .... }` method we would have below code,

##### 16.1 Yucky way:
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

##### 16.2 Preferred way:

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

##### 16.3 Change value in Array of objects.

persons in state has array of person ( i.e array of objects ). If we need to handle changing name of the person based on user input in text box then we need to capture `event` and `id` or `index` value of the element. Later update the `copied` persons object and merge to the actual person in state using `setState`. Lets take a look one by one,

Input Text (in Child Component):     

```javascript
// this is declared in child component, hence value to display is passed as props.
<input value={props.name} onChange={this.callHandleNameChange} />
```
Parent component:    
```javascript
// DOM event is passed from ChildComponent along with the id of the person,
//we could also pass index instead.
<ChildComponent name={this.state.person.name}
callHandleNameChange={(event) => {this.handleNameChange(event, person.id)}} />
```
handleNameChange ( in Parent Component):  
 ```javascript
handleNameChange = (event, personId) => {
  /*
     1. personIndex: this will return matching personIndex from personId
     2. changedPerson : extract just person belongs to personIndex, output would be changed
        person object {"id":   "02", "name": "newChangedName", "show": "false"}.
     3. changeNameValue: extract user typed value from DOM event.
     4. changedPerson.name : change person name as per user typed value.
     5. copyPersons: copy persons ( avoid mutating ) from state using spread operator.
     6. copyPersons[personIndex]: merge altered changedPerson object with copied person using personIndex.
     7. setState: now we have entire persons array of objects with changed value in copyPersons, so copying
        copyPersons to persons.
  */

  const personIndex = this.state.persons.findIndex((p) => return p.id == personId);
  const changedPerson = {...this.state.person[personIndex]};
  const changeNameValue = event.target.value;
  changedPerson.name = changeNameValue;
  const copyPersons = [ ...this.state.persons];
  copyPersons[personIndex] = changedPerson;
  this.setState({ persons: copyPersons});
}
 ```

##### 16.4 Extract Array from Object Key/Value:      
Let say we have an object in state with key and value as `{"Eddy", 2}` where key will be `Eddy` and value will be `2`. Now we need to build some component called `FoodOrder` twice as the value was `2`. Then we need to first convert an list of objects into an array, extract key `Eddy` and retrieve it's value `2` and build array of empty or undefined or some string array to represent `2Times` and call `FoodOrder` component. Simplicity we will assume this is set in state,
```javascript
state = {
  allocation: {
    "Eddy": 2,
    "Danny": 1,
    "John": 3
  }
}
```
Now if we receive this as props in functional component, then we would do above mentioned steps as follows,
```javascript
const buildAllocationDiv = Object.keys(props.allocation)
      /* now we have array of keys, so mapping */
      .map(allocationKey => {
        /* now we have another array build with undefined values as per value length */
        return [...Array(props.allocation[allocationKey])]
        /* looping over undefined values inside array to build components */
        .map((_,i)=>{
          return <FoodOrder key={allocationKey+i} food={allocationKey}/>
          /* this will build FoodOrder component for Eddy twice */
        })
      })
```
This will be extracted in return method as
```javascript
return(
  {buildAllocationDiv}
  /* ------ which is replacement for building -------
    <FoodOrder key="123" food="Eddy"/>
    <FoodOrder key="124" food="Eddy"/>
    <FoodOrder key="125" food="Danny"/>
    <FoodOrder key="126" food="John"/>
    ....
  */
)
```

##### 16.4 Calculate SUM from Object Key/Value:  

Idea of this example is to convert key/value pair object into array and then extract the values of each key to calculate sum of all the values.
```javascript
state = {
  allocation: {
    "Eddy": 2,
    "Danny": 1,
    "John": 3
  },
  moreThanTen: false,
}
```
Now that we have state with object `allocation`. I have also added one more property `moreThanTen` in state to determine if the calculated value is more than `10` then setState to change the value of `moreThanTen` to true.
```javascript
        /*
            1. copy existing state
            2. use Object.keys to create array of keys. i.e ['Eddy','Danny','John']
            3. use map to iterate over the array of keys and extract respective values. i.e ['2','1','3']
            4. use reduce to sum these values. 0 is initial value, sum will be total.
            5. setState to true if sum > 10
        */
const sumCalculator = () => {
  const allocation = {...this.state.allocation};
  const sum = Object.keys(allocation)
              .map(item => {
                return allocation[item];
              })
              .reduce((sum, element) => {
                return sum + element;
              }, 0);

  this.setState({
    moreThanTen: sum > 10,
  })
}
```

##### 16.5 Return list of Data from Object Key/Value:
Let's assume instead of manipulating the initial state we might just want to display the `key` and `value` inside return. So we will take same value from state,
```javascript
state = {
  allocation: {
    "Eddy": 2,
    "Danny": 1,
    "John": 3
  }
}
```
We can write functional component as    
```javascript
const display = (props) => {

  // should display as i.e "Eddy has value 2"
  const allocationList = Object.keys(props.allocation).map(item => ({
    return <li>{item} has value {props.allocation[item]} </li>
  }))

  return(
    <React.Fragment>
      <ul>{allocationList}</ul>
    </React.Fragment>
  )
}
```

#### 17. Higher Order Component
----------------

There are different ways we can leverage higher order components which can simply wraps the child or app components and pass the respective props and/or states depending on the higher order component definition.                                                                                                                       
 Why do we need higher order components ? return method in react needs return jsx wrapped with in one element. Most often we wrap with `<div> ... </div>` or return other component `<ChildComponent />` or use fragments like `<> ... </>` or `<React.Fragment> ... </React.Fragment>`. Alternative way to above all is writing simple higher order components which takes props and return to it's children as declared in 17.1 example.

 17.1 withFormat:

 Most often we don't want to wrap the component with higher order component like `<Aux> <ChildComponent/> <Aux>` and/or maybe we don't want the user to worry about wrapping with higher order component which passes the required props like `<Manager> <Content/> </Manager>` then we write a higher order component which takes `WrapperComponent` as props and return the component. This can be used while exporting the other component with HOC. example: `export default withAuxComponent(<ChildComponent/>)`.

 ```javascript
const withAuxHandler = (WrapperComponent) => {
  return (props) => {
    return (
      <React.Fragment>
        <WrappedComponent {...props} />
      </React.Fragment>
    )
  }
}
 ```

##### 17.1 Custom Simple HOC          
In this higher order component we simply take the passed props and send it to it's children without any alteration. Please do notice it doesn't even require `React` to be imported as it's simple ES6 code.

Definition:
```javascript
// this is SimpleWrapper.js
const simpleWrapper = (props) => props.children;
export default simpleWrapper;
```
Usage:
```javascript
// this is App.js
import SimpleWrapper from './SimpleWrapper'
....
return (
  <SimpleWrapper>
    .....
  </SimpleWrapper>
)
```

##### 17.2 Custom Advance HOC        
Simple HOC is doing nothing but acting as wrapper and hence avoided using extra `<div>` complexity in the jsx. However if we have return function with customized div such as `<div className={styleChildren}> ... </div>` then we might need a extracted higher order component which can be leveraged one or many div's of same scenario.

Definition:
```javascript
//this is WithClass.js
import React from 'react';
const withClass = (props) => {
  return (
    <div className={props.style}>
      {props.children}
    </div>
  )
}

export default withClass;
```

Usage:
```javascript
//this is App.js
import WithClass from './WithClass'
//... code
return (
  <WithClass style={styleChildren}>
    .... //rest of the code.
  </WithClass>
)
```

##### 17.3 Configurable Advance HOC               
Instead of leveraging just the `<div>` we can make higher order function (not a component ) more flexible which in turn returns wrapped component in customized way.

Definition:
```javascript
// this is withClass.js
import React from 'react'

const withClass = (WrappedComponent, className) => {
  //returning wrapped component
  return (props) => (
    <div className={className}>
      <WrappedComponent {...props}/> //sending props using spread operator to WrappedComponent.
    </div>
  )
}

export default withClass;
```

Usage:
```javascript
// this is App.js
// notice withClass instead of WithClass as withClass here is not a component but function
import withClass from './withClass'
return(
    //....no changes to the code
)

export default withClass(App, style);
// here App will be WrappedComponent argument, and style is className in withClass function definition
```

##### 17.4 Configurable Advance HOC with class
This scenario is more of an example than separate type, instead of returning HOC function with just jsx we can return anonymous react class which provides extra life cycle hooks to be
used in HOC for data validation or extraction. One such example is to declare global error handling from `axios`.
  Axios has interceptors which can be leveraged to use it globally, instead of handling error within the component we can make use of `axios.interceptors` to listen ( acts like listeners )
to listen for `request` or `response` and handle the message.

Definition
```javascript
// this is withErrorHandler.js
import React, { Component } from 'react';

/* function takes two arguments */
const withErrorHandler =(WrappedComponent, axios) => {
  {/*anonymous class as it doesn't have name*/}
  return class extends Component {
    render(){

      state={
        error: null
      }

      componentDidMount(){

        /* resetting error if we receive request is successful */
        this.requestInterceptors = axiso.interceptors.request.use(req=> {
          this.setState({error: null});
          /* this is important to let the req flow through otherwise req will not
             be received from other component */
          return req;
        })

        /* resetting error if we receive request is successful */
        this.responseInterceptors = axios.interceptors.response.use(res => res, error => {
          /* res => res is to letting the request flow through */
          this.setState({error: error})
        })
      }

      /* need to remove axios once the component is unmounted to avoid memory leak */
      componentWillUnmount(){
        axios.interceptors.request.eject(this.requestInterceptors);
        axios.interceptors.response.eject(this.responseInterceptors);
      }

      return(
        <React.Fragment>
          <ModalManager show={this.state.error ? this.state.error : null}>
            {this.state.error.message}
            /* .message was appended by axios to error object if found */
          </ModalManager>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      )
    }
  }
}

export default withErrorHandler;
```

Usage:
```javascript
//this is OrderHandler.js
/**
  we import axios here, and make call to API for fetching the data.
  return function has <ModalManager> ... </ModalManager>, hence we have wrapped OrderHandler with withErrorHandler
  it will throw error if ModalManager is triggered with error.
*/

export default withErrorHandler(OrderHandler, axios);
```

#### 18. Server Access:
------------------
Hence react is all about javascript we have two options to access/purge data in via React. [1]. XMLHttpRequest: object used to construct own ajax call. [2]. Axios ( javascript package library for accessing server side ).

##### 18.1 Using Axios:
In React App we should make call to the server using `lifecycle hooks`, precisely in ComponentDidMount as it causes side effects and make the re-rendering. However we should't be using this `ComponentDidMount` to set state ( expect when we retrieve data from the server ).

18.1.1: get all data:          
```javascript
componentDidMount(){
  axios.get("http://xxxx.com/data/")
    .then(resposne => {
      this.setState({
        posts: response.data,
      })
    }).catch(e){
      // handle error
    }
}
```

18.1.2: get a data:            
In some cases we need to update the already rendered element based on probably user click or selection then we can use `componentDidUpdate`, however make sure to check the `NETWORK` tab for infinite calls if we are setting state inside the lifecyclehook.

```javascript

state={
  filteredPerson: null
}

// only be called if the `props` value passed to component changes. i.e <ChildComponent id={this.state.personId}.
componentDidUpdate(){
  if(this.props.id){
    if(!this.state.filteredPerson || (this.state.filteredPerson && (this.state.filteredPerson.id !== this.props.id))){
      axios.get("https://jsonplaceholder.typicode.com/posts/"+this.props.id)
      .then(response => {
        this.setState({
          filteredPerson: response.data
        })
      }).catch(e){
        // handle error
      }
    }
  }
}

/*
1. Assume id is sent as props whenever user select something from the parent. i.e <ChildComponent id={this.state.personId}
2. We need to call the REST point based on the id, store that data in state to render.
3. so we check `if(this.props.id)` if we have id. This evaluation result either TRUE or FALSE.
4. In this step we need to make sure we only call web service once if we have no value in the state ( first time ) and whenever there is change in user selection.
5. concatenate the selected id from the props to the request.
6. do setState to set state. This will trigger re-render of the UI.
*/

```

18.1.3: post data:         
```javascript
// this is called by onClick={this.handlePostData}
handlePostData = () => {

  // Assuming we used onChange method to store value from user filed to state upon changing, hence we are retrieving from state.
  const data: {
    id: this.state.personId,
    name: this.state.personName
  }

  axios.post("http://xxxx.com/post/", data)
  .then(response => {
    //success message
    console.log(JSON.stringyfy(response.data))
  })
}

```

18.1.4: error handling:                  
As it was mentioned in the above steps we can always handle error locally using `catch(e)` but we can also handle globally (i.e at app load ) and still let the local error handling work.

```javascript
//in index.js
axios.interceptors.response.use(response => {
  // we need to explicitly return response otherwise it block it
  return response;
}, error => {
  console.log(error); //handling global error.
  return Promise.reject(error);
})
```
If we are interested in checking if the `INTERNET` connection is working then replace `response` in `axios.interceptors.response` with `request`.

18.1.5: request config:            
Instead of having rest url in all request we can declare in `index.js` using `axios.defaults`. By doing so

```javascript
axios.defaults.baseURL = "http://xxxx.com";
// we can also use for setting AUTH TOKEN, Content-type etc
```

Before
```javascript
axios.get("http://xxxxx.com/get")
.then(response => {
  //....
})
```

After
```javascript
axios.get("/get")
.then(response => {
  //....
})
```

### 19. LifeCycle Events 

Below are the order of execution happens when react app renders on the page. 

#### 19.1 Rendering Order
1. constructor()
2. getDerivedStateFromProps()
3. render()
4. componentDidMount()

#### 19.2 Re-Rendering Order
1. getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()( more details[https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate])
5. componentDidUpdate()


#### 20. REDUCERS with Redux
In this section we will focus on how we can make use of createStore provided by REDUX and also the feature called combinedReducers to pass multiple reducers without needing to create a function handle that. 

##### 20.1 : Using Root Reducer
```javascript 
import { createStore } from 'redux';

// learner reducer
function learner(state=[], action){
  if(action.type === 'ADD_LEARNER'){
    return state.concat([action.learner])
  }
  return state
}

// instructor reducer
function instructor(state=[], action){
  if(action.type === 'ADD_INSTRUCTOR'){
    return state.concat([action.instructor])
  }
  return state
}

// root reducer
function reducer (state = {}, action) {
  return {
    learner: todos(state.learner, action),
    instructor: goals(state.instructor, action),
  }
}

// using it in store while initializing 
const store = createStore(reducer); // <-- using reducer to handle multiple reducers

// dispatching action to add
store.dispatch({
  type: 'ADD_LEARNER',
  learner: {
    id: 123,
    name: 'Bob',
    class: 'Senior'
  }
})
```

##### 20.2 : Using CombinedReducer
Hence root reducers job was to adding multiple reducers together, Redux has provided out of the box solution to handle more than one reducers. So we will still refer reducers from previous example but not write `reducer` function now.

```javascript
import { createStore, combinedReducers } from 'redux' ;

// note: learner and instructor are reducers
const store = createStore(combinedReducers({
  learner,
  instructor
}))

// dispatching action to add
store.dispatch({
  type: 'ADD_INSTRUCTOR',
  learner: {
    id: 099,
    name: 'Adam',
    subject: 'Math'
  }
})
```
Another example of using combinedReducers is below,
```javascript 
import { combineReducers } from 'redux';
import paymentReducer from './payment/paymentReducer';
import studentReducer from './student/studentReducer';

const rootReducer = combineReducers({
    payment: paymentReducer,
    student: studentReducer
});

export default rootReducer;
```
[Example](https://github.com/citta-lab/react/blob/master/react-playground/code-examples/ReduxExample.html) of using `combinedReducers` and `applyMiddleware` from REDUX. 

##### 20.3 : Breaking into Reducers
If the data structure if nested then we need to build a robust reducer to avoid doing spread operation to keep-up with the immutability, below is the exaple from udacity. 
```javascript 
{
  users: {},
  setting: {},
  tweets: {
    btyxlj: {
      id: 'btyxlj',
      text: 'What is a jQuery?',
      author: {
        name: 'Tyler McGinnis',
        id: 'tylermcginnis',
        avatar: 'twt.com/tm.png'
      }   
    }
  }  
}
```
If we jump staright into writing reducers then prematurely we will endup complicating things by adding reducers like below,
```javascript 
const rootReducer = combineReducers({
  users,
  settings,
  tweets
})

function tweets (state = {}, action) {
  switch(action.type){
      case ADD_TWEET :
        ...
      case REMOVE_TWEET :
        ...
      case UPDATE_AVATAR :
        return {
          ...state,
          [action.tweetId]: {
            ...state[action.tweetId],
            author: {
              ...state[action.tweetId].author,
              avatar: action.newAvatar 
            }
          }
        }
  }
}
```
Better way to write reducers by breaking update avatar into smaller reducers  
```javascript 
function author (state, action) {
  switch (action.type) {
      case : UPDATE_AVATAR
        return {
          ...state,
          avatar: action.newAvatar
        }
      default :
        state
  }
}

function tweet (state, action) {
  switch (action.type) {
      case ADD_TWEET :
        ...
      case REMOVE_TWEET :
        ...
      case : UPDATE_AVATAR
        return {
          ...state,
          author: author(state.author, action)
        }
      default :
        state
  }
}

function tweets (state = {}, action) {
  switch(action.type){
      case ADD_TWEET :
        ...
      case REMOVE_TWEET :
        ...
      case UPDATE_AVATAR :
        return {
          ...state,
          [action.tweetId]: tweet(state[action.tweetId], action)
        }
      default :
        state
  }
}
```

### 21: Redux in React

Now we can start using the redux in react, main important thing we should be paying attention is where does `store.dispatch` sits and sending `props` to Redux.

Example of handling intial data load in redux, removing item from redux, updating DOM, also implemting optimistic update from Tyler [gitlink](https://github.com/udacity/reactnd-redux-todos-goals/commit/5186502ac6461c2e88ba1dbf1ec158764c84823c).


### 22. Ref's: 

Ref's are like drilling `hole` between React and DOM so it can bypass virtual DOM. This can be used whenever we need to do below things,
- Managing focus, text input 
- Integrating with thrid party like d3 or dojo
- Imperative Animations

Example:
```jsx
class Assignment extends React.Component {
  addAssignment = e => {
    e.preventDefault();
    console.log(this.input.value); // will be assignment 
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Add Assignment"
          /** we are storing input value in Assignment class instance variable this.input */
          ref={(input) => this.input = input}
        />

        <button onClick={this.addAssignmnet}>Add</button>
      </div>
    );
  }
}
```

### REACT by Examples:


#### 1. Example App with State and handlerMethods
---------------------------------------------------
Example shows how we can display and update the state value using two way data binding also not mutate the state directly. For simplicity person component used in main component is not show ( which will shows card with text area where you can have two way data ).

```jsx
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      persons: [
        { id: 1, name: 'Max', age: 28 },
        { id: 2, name: 'Manu', age: 29 },
        { id: 3, name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false
    }
  }

  /**
   * Updating the existing state property value without
   * mutating the data directly.
   */
  nameChangedHandler = ( event, id ) => {
    // finding the index from an id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // filtering the person for that index
    const person = {
      ...this.state.persons[personIndex]
    };

    // updating the name for that right indexed person
    person.name = event.target.value;

    // getting all persons, updating to right one
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // uodating the state
    this.setState( {persons: persons} );
  }

  /**
   * Delete an element from the state without MUTATING the state like
   * there two diffrent ways.
   */
  deletePersonHandler = (personIndex) => {
    // 1. using ES6 filter
    const persons = this.state.persons.filter((data, index) => {
      return index !== personIndex
    })

    this.setState({persons: persons});

    // 2. using ES5 splice on copied object
    // const persons = [...this.state.persons];
    // persons.splice(personIndex, 1);
    // this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    this.setState(prevState => ({
      showPersons: !prevState.showPersons
    }));
  }

  render () {

    let persons = null;

    // conditional rendering of UI component
    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={()=>this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
```

#### 2. Counter App (increase or decrease)
Description:
Building react app to increase and decrease the count based on use click. Initial count is `10` and upon clicking `+` we should increase the count by 1 and if we click `-` then count should be decreased by 1.

Quick view of the counter app would like this [demo](/utils/CounterApp.gif).

Implementation:
```jsx
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 10
    }

    //Need to bind this to have `this` context so we can reference later
    this.handleIncrementClick = this.handleIncrementClick.bind(this);
    this.handleDecrimentClick = this.handleDecrimentClick.bind(this);
  }

  // handler to operate on previous state than mutating the counter directly
  handleIncrementClick = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1
    }))
  }

  handleDecrimentClick = () => {
    this.setState((prevState) => ({
      counter: prevState.counter - 1
    }))
  }

  render(){
    return (
      <div>
        <h2 className="counter">{this.state.counter}</h2>
        <button className="counter-button" onClick={this.handleIncrementClick}>+</button>
        <button className="counter-button" onClick={this.handleDecrimentClick}>-</button>
      </div>
    )
  }
}

// react DOM related to render
const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
```
Demo:
[Counter App](https://codesandbox.io/s/ryl638z74m)

#### 3:  Like App (like / unlike)

Description:   
Creating an app to increase the like count by one and change the color using css property to blue ( see use of classname dependencies and style.css ) and if we click on the liked button again then we remove the like count by one and change color to normal ( unlike option ). Important: Adding and removing css class property to display the color behavior.

Quick view of the like app would like this [demo](/utils/LikeApp.gif).

Implementation:
```jsx
import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import "./styles.css";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 100,
      liked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    /**
     * If it's not liked, then we will increase by 1 (i.e 101),
     * if it's already liked, then we decrease by 1.
     */
    const calculatedLike = !this.state.liked
      ? this.state.likes + 1
      : this.state.likes - 1;

    this.setState(prevState => ({
      liked: !this.state.liked,
      likes: calculatedLike
    }));
  };

  render() {
    // using classnames dependecies to add/remove css class on click
    const btnClass = cx({
      "like-button": true,
      liked: this.state.liked
    });

    return (
      <div>
        <button className={btnClass} onClick={this.handleClick}>
          <h2>
            Like | <span className="likes-counter">{this.state.likes}</span>
          </h2>
        </button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<LikeButton />, rootElement);
```
Demo:
[Like App](https://codesandbox.io/s/jlqo4q5yn3)


#### 4: Cookie App

Description: Demonstrating how we can benefit from using the browser cookies to store and extracts values from API calls for session related information. Goal of this app is to read and write/update data to browser cookie based on
response data.

Quick view of the like app would like this [demo](/utils/LikeApp.gif).

Implementation:   
4.1 App:
```jsx
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { writeCookie, readCookie } from "../utils/accessUtils";

class LocalStore extends React.Component {
  constructor(props) {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Initial Load: This is to depict calling some API to get
   * data, then based on the response we would set both cookie
   * and state simultaneously.
   */
  componentDidMount() {
    // pretend we got this data from API call, now setting it to cookie
    writeCookie({ name: "Tony", age: 12, time: Date.now() });
    this.setState({
      name: "Tony",
      age: 12,
      time: Date.now()
    });
  }

  /**
   * Why: Trying to depict updating cookie data based on some
   * API response, but i also wanted to prove we can set & get
   * data from the cookie. Hence reading data from cookie to set
   * data in the state.
   */
  handleClick = () => {
    // pretending these values are recived from API call
    writeCookie({
      name: "Bob",
      age: this.state.age,
      time: new Date(Date.now())
    });

    // extracting and setting value to display
    let { name, time } = readCookie();
    this.setState(prevState => ({
      age: prevState.age + 5,
      name,
      time
    }));
  };

  render() {
    /**
     * Why: Instead of initializing `this.state = {}` to an empty object
     * for initial load we can do something like below to avoid stale code.
     * This way we can grab values from state if present otherwise it will
     * be empty.
     */
    let { name, age, time } = this.state || {};

    return (
      <div className="LocalStore">
        <h2>Cookie Example </h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Time Now</th>
          </tr>
          <tr>
            <td>{name}</td>
            <td>{age}</td>
            <td>{time}</td>
          </tr>
        </table>
        <br />
        <button class="button" onClick={this.handleClick}>
          {" "}
          LOAD{" "}
        </button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<LocalStore />, rootElement);
```
4.2 Model
```javascript
import storageUtil from "./storageUtil";

const KEY = "COOKIE_TEST";

/**
 * Focus is to update the cookie, hence merging the data.
 * Important: Object needs to be converted to string before
 * saving in the cookie hence `JSON.stringify(newValue)`.
 * @param {object} value - values to set in the cookie
 */
export function writeCookie(value) {
  const currentValue = readCookie();
  const newValue = { ...currentValue, ...value };
  storageUtil.setItem(KEY, JSON.stringify(newValue));
}

/**
 * Convert it to an object before returning, so we can
 * operate merge easily.
 */
export function readCookie() {
  return JSON.parse(storageUtil.getItem(KEY));
}

export default { readCookie, writeCookie };
```

4.3 Accessor
```javascript
export default {
  /**
   * Cookie values are seperated by `;` hence the split, which
   * results in an array so we can filter it to find the key &
   * return first value after `=`.
   * @param {string} key - Key needs to be extracted
   */
  getItem(key) {
    const cookieHash = document.cookie
      .split(";")
      .filter(item => item.includes(`${key}=`));

    console.log(" ****: " + JSON.stringify(cookieHash));
    return cookieHash[0] ? cookieHash[0].split("=")[1] : null;
  },

  /**
   * set values with respect to the key.
   * @param {string} key -
   * @param {object} value
   */
  setItem(key, value) {
    document.cookie = `${key}=${value}`;
  }
};
```

Demo:
[Cookie App](https://codesandbox.io/s/14540z2jxj)


Reference:
1. [React - this.input.value vs handle change](https://stackoverflow.com/questions/46572616/react-this-input-value-vs-handle-change/46572702#comment80106399_46572702)
2. [React Forms](https://www.sitepoint.com/work-with-forms-in-react/)
3. [React How To](https://github.com/petehunt/react-howto)
4. [Composition vs Inheritance](http://blog.brew.com.hk/react-101-composition-vs-inheritance/)
5. [React Fragments](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html#support-for-fragment-syntax)
6. [composibality](https://www.linkedin.com/pulse/compose-me-function-composition-javascript-kevin-greene)
7. [Imperative Declarative](https://stackoverflow.com/questions/33655534/difference-between-declarative-and-imperative-in-react-js)
8. [Blog on Imperative vs Delcarative](https://tylermcginnis.com/imperative-vs-declarative-programming/)
