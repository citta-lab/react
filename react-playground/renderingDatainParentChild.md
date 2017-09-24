Render Data in Components 
--------------------------

The example is to explain child component rendering inside the parent component to avoid the code duplication by keeping the child component 
independent of data and use react's functions to minimize the code. The example has been referenced from Samer Buna's pluralsite coourse but have altered and 
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
    company:'Semantic'
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
 handleFormSubmit = (event) => {
 	  event.preventDefault();
      console.log(" submit"); /*submit will be printed upon click*/
  }
```

2. New parent (GitApp) component 

Now we will be creating the parent class component to hold ChildList (functional child) component and Form (class child) component and also manage the state for entire app hence the class component. 

> Hence we would be moving the global data variable to state inside the component (as mentioned below in the snippet), we need to change the data access in the directive props from `{data}` to `{this.state.data}`. The important thing to keep an eye while moving the data to state is replacing `=` with `:`. For example: `var data = [ { name: "Bob"}]` should be replaced as `state = { data: [ { name: "Bob"} ]}`

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
        company:'Semantic'
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
Also notice the render method has been changed to call parent component `<GitApp>` instead of `<ChildList>`. By this point we should have working app minus the user addition to the state.

3. Enhance the Form Component to handle the user input 

In #1 ( Part IV ) we defined the the Form class component and bare minimum details. Now we need to focus on few things 
+ (i). Declare Form state to hold the user input `state={userName:''}`.
+ (ii). Enhance input directive with react's value attribute to retrive state value `value={this.state.userName}`.
+ (iii). If we change `userName:'Rob'` the app will load textbox with Rob value init.
+ (iv). Add react's onChange attribute to listen to any changes made on input text box `onChange={ .....}`.
+ (v). Add function call and define function to capture the data through `event`. So onChange would be `={this.handleFormValue}`.
+ (vi). In handleFormValue function retrive value from the event and set (state) userName value to corresponding value using setState. i.e `setState = { userName : event.target.value }`. At this point state in Form component has new data added by the user.

In render function
```javascript
<input type="text" placeHolder="github username" value={this.state.userName} onChange={this.handleFormValue}/>
```

Outside render function
```javascript
// step:1 set blank value as username on load
	state = {
  	userName:''
  }
  
  // step:2 use react's onChange to listen to event change and setState value
  handleFormValue = (event) => {
  	this.setState({
    	userName:event.target.value  
    });
  };
  
  // step:3 when button clicked retrive newly added state value
  handleFormSubmit = (event) => {
      event.preventDefault();
      console.log(" username : "+this.state.userName)
  };
  ```
+ (vii). Now upon add button click we need to propagate this new state value to GitApp state using props.
+ (viii). For ease of understanding i have built newData object with user inputted value from state ( userName) and appended with constat avatar, company. `i.e newData `

```javascript
// step:1 set blank value as username on load
	state = {
  	userName:''
  }
  
  // step:2 use react's onChange to listen to event change and setState value
  handleFormValue = (event) => {
  	this.setState({
    	userName:event.target.value  
    });
  };
  
  // step:3 when button clicked retrive newly added state value
  handleFormSubmit = (event) => {
      event.preventDefault();
      
      //step:4 step two has changed the state with new value, now building new object
      var newData = {
      	name:this.state.userName,
        avatar:'https://avatars3.githubusercontent.com/u/503?v=4',
        company:'ABCD'
      }
      
      // step: 5 sending newData object to onSubmit
      this.props.onSubmit(newData);
  };
```

+ (ix). propagating to onSubmit function with the new object. i.e `this.props.onSubmit(newData)`
+ (x). In GitApp's render method, Form component directive defines onSubmit and invovkes component function handleAddCard with data. i.e onSubmit={this.handleAddCard}`.

```javascript
/*step 6: trigerred by this.props.onSubmit() from Form component */
<Form onSubmit={this.handleAddCard}/>
```
+ (xi). Define handleAddCard function to append the newData object to state's data object using setState. 

```javascript
//step 7: called by onSubmit from the Form directive in render
  handleAddCard = (cardInfo) => {
    this.setState(prevState => ({
    	data : prevState.data.concat(cardInfo)
    }));
  }
```

Refer [renderingDatainParentChildPartIVComplete.js](https://github.com/citta-lab/react/blob/master/react-playground/scripts/renderingDatainParentChildPartIVComplete.js) code for Part IV complete code ( accumulated code from part I )

#### Part V:

In this section we will focus on adding new card details by matching the globally declared json and later we will move on to query from the api instead. 

1. Declare new local storeData to hold card details 

```javascript
//global dataRepo for search
var storeData = [
      	{
      	name:"Rob",
        avatar:'https://avatars3.githubusercontent.com/u/503?v=4',
        company:'ABCD'
      	},
        {
      	name:"Bob",
        avatar:'https://avatars3.githubusercontent.com/u/303?v=4',
        company:'Yelp'
       }
  ];
```
I have declared storeData outside of any components here however we can also declare inside the Form component if prefered. Next step we would need to change our logic in Form component to look for match with the storeData before sending it throug the props. 

2. Updating handleFormSubmit() to handle match, build new json and call props

```javascript
// step:3 when button clicked retrive newly added state value
  handleFormSubmit = (event) => {
      event.preventDefault();
      
      //step:4 step two has changed the state with new value, now trying to check if the match has been found with global data repo storeData and propagate it to onSubmit 
      
      if ( this.state.userName != '' && this.state.userName != null ){
      	for (var i=0; i < storeData.length; i++){
       		if ( storeData[i].name == this.state.userName ){
            var matchedData = {
            	name:storeData[i].name,
            	avatar:storeData[i].avatar,
            	company:storeData[i].company 
            }          
            // step: 5 sending newData object to onSubmit
      		this.props.onSubmit(matchedData);
          }
        }
      }
  };
```
At this point if the user search for "Bob" or "Rob" we should be seeing the state in GitApp render with newly added data. We can refer the complete script here [renderingDatainParentChildPartVComplete.js](https://github.com/citta-lab/react/blob/master/react-playground/scripts/renderingDatainParentChildPartVComplete.js) 


#### Part VI:

Instead of having global storeData to have some pre-defined data for add we can use gitHub api to look for user and resolve the response before passing it to onSubmit to the GitApp. The API to look for user `https://api.github.com/users/xxxx`. and using [axios](https://www.npmjs.com/package/axios) to handle the response. axios is heavily inspired by the $http service provided in Angular and providing $http service outside of Angualr app.

1. Adding the API call instead.

```javascript
// step:3 when button clicked retrive newly added state value
  handleFormSubmit = (event) => {
      
      event.preventDefault();
      
      //step:4 calling api 
      axios.get(`https://api.github.com/users/${this.state.userName}`)
        .then(response => {
            // step: 5 sending newData object to onSubmit
            this.props.onSubmit(response.data);
        })
        .catch(function (error) {
          console.log(" Network or User Not Found :"+error);
        });
      
      //step:6 clear the value
      this.setState({
      	userName:''
      });
  };
```

2. Resetting the userName in textbox to blank.

In the above script we are setting userName to blank once the successful call has been made to the api and this will remove entereted value in the inbox. 
```javascript
//step:6 clear the value
    this.setState({
      userName:''
    });
```
Note: axios.get can also be used as axios( method:'get', url:'') and make sure to use https instead of http to prevent Network Error. 

At this point we have complete app to look for github user and add it to the cardList etc. Can refer the complete code at [renderingDatainParentChildPartVIComplete](https://github.com/citta-lab/react/blob/master/react-playground/scripts/renderingDatainParentChildPartVIComplete.js). 


