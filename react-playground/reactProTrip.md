React Tips
--------------------------

###Things to work on
1. Syntax for functional component
2. Code outside JSX
3. Range ( _ .range ) instead of loop
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

javascript calculation and/or building object code should be taken care outside the return and use jsx code inside the return to render in DOM.
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
Instead of creating for or while loop we can use `_. range( first element, last_exlucsive_elelemt) returns the array. Which we can use in map function.

4. Reducer

Reducer is pure function ( is one of the Higher-Order Functions, which takes function as an arguments ) applied on arrays to get the total number of count or one count. This is also declarative functions as we are not defining how to instead we are instructing what to.

4.1 Basic structure of reduce
```javascript
arrayData.reduce(function ,startingElement);
```

4.2 First argument as function
```javascript
arrayData.reduce((total, eachArrayElement) ,startingElement);
```
call back function takes two argument, the total value to return at the end ( which will be initiated by setting startingElement value ) and the second argument is each array element.

4.3 Callback function
```javascript
arrayData.reduce((total, eachArrayElement) => { return total+ eachArrayElement.childElement },startingElement);
```
callback function return the sum of everything after it traverse through each element. Here `eachArrayElement.childElement` can be secondArrayElement.sales etc.

4.4 Starting value for total as 0
```javascript
arrayData.reduce((total, eachArrayElement) => { return total+ eachArrayElement.childElement },0);
```

4.5 Example:
```javascript
const musicData = [
    { artist: 'Mark', name: '25', sales: 173000 },
    { artist: 'Jane', name: 'Views', sales: 160000 },
    { artist: 'Buddy', name: 'Lemonade', sales: 155000 },
];

musicData.reduce((totalAlbumSales, current) => { return totalAlbumSales + current.sales},0);
```
References:
1. https://medium.com/react-tutorials/react-components-828c397e3dc8
