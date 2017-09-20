Render Data in Components 
--------------------------

The example is to explain child component rendering inside the parent component to avoid the code duplication by keeping the child component 
independent of data and use react's functions to minimize the code. The example has been referenced from Samer Buna's plurasite coourse but have altered and 
modified based on my learning expericence. 

playground: https://jscomplete.com/repl/


#### Part I:

1. Defining child functional component to display the generic card details. We have also defined divStyle to define react's inline style property.

```javascript
//functional component ( child )
const Card = (props) => {

	var divStyle = {
	  background: "#eee",
	  padding: "20px",
	  margin: "20px"
	  };

	return (
  	<div style={divStyle}>card here (child component) </div>
  );
};
```

2. Defining parent functional component to display it's own details and render child component details.

```javascript
//functional component 
const CardList = (props) => {
	return (
  	<div>
    	<div> Parent Component </div>
    	<Card/>
    </div>
  );
};
```

3. Finally, we need to render the parent ( which inturn render child component )

```javascript
ReactDOM.render(<CardList/>,mountNode)
```

#### Part II:

In this section we will clean-up the code and re-use the child component to display more than one card details by keeping it generic and re-usable. 

1. CardList component ( parent ) is passing values to child ( i.e name, company ) which can be retrived through props in child to display the data. As a reminder props are immutable and can only be used to read the values. 

```javascript
<div >
    <div> Parent Component </div>
    <Card name="Mahesh" company="Facebook"/>
</div>
```
name can be accessed via props as `{props.name}` in functional child component and as `{this.props.name}` in child class component. 

2. Now the child component will wrap-up the data from parent component with style. Notice we have used inline style by two ways, by declaring a variables ( nameStyle, divStyle ) or in div itself as `<div style={{display:'inline-block', marginLeft:10}}>`. 

```javascript
//functional component ( child )
const Card = (props) => {

	var divStyle = {
		background: "#eee",
		padding: "20px",
		margin: "20px"
	};
	  
	var nameStyle ={
		fontSize:'1.25em',
		fontWeight:'bold'
	};
	  
	return (
	<div style={divStyle}>
		<div style={{display:'inline-block', marginLeft:10}}>
		<div style={nameStyle}> Name: {props.name} </div>
		<div> Company: {props.company}</div>
		</div>
	</div>
	  );
};

```

#### Part III:

At this statge, we are ready to use probably local json data which we can pass it to child component from the parent instead of passing one pair of value. Also we will look into different ways to retrive data in the child component.

1. Defining local data ( we have defined it outside child, parent component ).

```javascript
let data =[
  {
    name:'Mahesh',
    avatar:'https://avatars0.githubusercontent.com/u/16902666?v=4',
    company:'Facebook'
  },
  {
    name:'Nimesh',
    avatar:'https://avatars2.githubusercontent.com/u/4977276?v=4',
    company:'Seamantic'
  }
]
```

2. Passing global data to parent component so we can access through props.

```javascript
ReactDOM.render(<CardList cards={data}/>,mountNode)
```

3. Retriving the data in carent and passing it to the child component 

```javascript
<div>
<Card name={props.cards[0].name} 
	  company={props.cards[0].company} 
	  avatar={props.cards[0].avatar}
/>
</div>
```

4. Re-writing the tag to send array object instead of one using javascript map function.


```javascript
{props.cards.map(function(card){return <div>{card.name}</div>})} 
```
Applying map function on array of data. Example: `arrayData.map( function (data) { return data.key_name })`. Above example will result in printing both names 
from the data object. We can rewrite again using arrow function as below,

```javascript
{props.cards.map(card => <div>{card.name}</div>)}
```
Finally, all the key values can be retrived using react's spread operator `{...card}` and can be sent to child component as mentioned below.

```javascript
{props.cards.map(card => <Card {...card}/>)}
```

5. Final child component 

```javascript
//functional component ( child )
const Card = (props) => {

var divStyle = {
  background: "#eee",
  padding: "20px",
  margin: "20px"
};

return (
	<div style={divStyle}> 
		<img width ="75" src={props.avatar} />
		<div style={{display:'inline-block', marginLeft:10}}>
		<div style={{fontSize:'1.25em', fontWeight:'bold'}}> Name: {props.name} </div>
		<div> Company: {props.company}</div>
		</div>
	</div>
  );
};
```

6. Final parent component 

```javascript
//functional component 
const CardList = (props) => {  
	return (
  	<div>
    	{props.cards.map(card => <Card {...card}/>)}
    </div>
  );
};

ReactDOM.render(<CardList cards={data}/>,mountNode)
```

#### Part IV:

In this section we will add above learnt components to the app and add funtion to add user to card component, learn state and props to exchange data between parent to child, child to parent. 

> Writing independent and modular component is very important by focusing one job per component. In our example, we have card (child) component to display the data in card format and cardList (parent) component to hold list of cards. If we were to add any other functionality to it, for instance adding search feature or adding card details panel or having different view then we should be creating new component to keep the job per component unique.

1. New form child component 

New class child component to add the user details to the data object, hence we are dealing with state of the data we need to define class component instead of functional. 

```javascript
//class (child3) component 
class Form extends React.Component {

  handleFormSubmit = () => {
      console.log(" submit");
  }

  render(){

     var formStyle = {
        float: "right",
        padding: "20px",
        margin: "0px",
     };

    return (
      <form id="addForm" style={formStyle} >
        <input type="text" placeHolder="github username"/>
        <button class="btn btn-primary" type="submit" onClick={this.handleFormSubmit}>Add</button>
      </form>
    );
}};
```
we have added the style variable to the form tag, and onClick on Add button to trigger handleFormSubmit function associated with the Form component and hence `{this.handleFormSubmit}`. Upon clicking the add we expect console to print "submit" and not refresh the page however the default submit does exactly that. So we need to prevent the 
deafult submit action by leveraging react's event by `event.preventDefault()`. 

```javascript
 handleFormSubmit = () => {
      console.log(" submit");
  }
```

2. New parent (GitApp) component 

Now we will be creating the parent class component to hold ChildList (functional child) component and Form (class child) component and also manage the state for entire app hence the class component. 

> Hence we would be moving the global data variable to state inside the component as defined, and change the data access in the props from `{data}` to `{this.state.data}`. The important thing to keep an eye while moving the data to state is replacing `=` with `:`. For example: `var data = [ { name: "Bob"}]` should be replaced as `state = { data: [ { name: "Bob"} ]}`

```javascript
class GitApp extends React.Component {

  //moving global data to state
  state = {
    data : [
      {
        name:'Mahesh',
        avatar:'https://avatars0.githubusercontent.com/u/16902666?v=4',
        company:'Facebook'
      },
      {
        name:'Nimesh',
        avatar:'https://avatars2.githubusercontent.com/u/4977276?v=4',
        company:'Seamantic'
      }
    ]
  }

  render(){
    return (
      <div>
        <Form/>
        <br/><br/>
        <div>
          <CardList cards={this.state.data}/>
        </div>
      </div>
    );
  }};

ReactDOM.render(<GitApp />,mountNode)
```
Also notice the render method has been changed to call parent component `<GitApp>` instead of `<ChildList>`. 



