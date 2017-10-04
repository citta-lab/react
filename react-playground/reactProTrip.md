React Tips 
--------------------------

###Things to work on
1. Syntax for functional component 
2. Code outside JSX
3. Range ( _.range ) instead of loop
4. Array vs Object while building data in state
5. Function reference vs Function call.
6. Desctructuring out of the state object.
7. Why return within one container 
8. World of camelCase

###Deep Drive

1. Syntax to declare functional component 

```javascript
const NameComp = () => {
	return (
		<div> Functional Component </div>
	)
}

ReactDOM.render(<NameComp />,mountNode)
```
+ arrow function [ () = > { }].
+ return not render and use "()" not "{ }".
+ components has to return only one div [ use all code within <div>..</div>].

2. Only use JSX code inside return 

javascript calulation and/or building object code should be taken care outside the return and use jsx code inside the return to render in DOM. 
```javascript
const NameComp = (props) => {

/* javascript code */
const number = Math.random()*11;
const players = [];

for ( var i=0; i <= numbers ; i++){
	players.put(<i> Player {i}</i>)
}
	
	//render final array using jsx
	return (
		<div>{players}</div>
	)
}

ReactDOM.render(<NameComp />,mountNode)
```

3. Defining range using new function [ _.range() ]

```javascript
const RangeComponent = () => {

const rangeArray = _.range(0,10);
	return(
		<div>{rangeArray}</div>
	)
}

ReactDOM.render(<NameComp />,mountNode)
```
Instead of creating for or while loop we can use `_.range( first element, last_exlucsive_elelemt)` returns the array. Which we can use in map function. 



References:
1. https://medium.com/react-tutorials/react-components-828c397e3dc8 


