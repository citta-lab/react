Render Data in Components 
--------------------------

The example is to explain child component rendering inside the parent component to avoid the code duplication by keeping the child component 
independent of data and use react's functions to minimize the code. 

1. Defining child functional component to display the generic card details.

```javascript
//functional component ( child )
const Card = (props) => {
	return (
  	<div>card here (child component) </div>
  );
};
```

2. Defining parent functional component to display it's own details and render child component details. We have also defined divStyle to define react's inline style property.


```javascript
//functional component 
const CardList = (props) => {
	
  var divStyle = {
  background: "#eee",
  padding: "20px",
  margin: "20px"
	};

	return (
  	<div style={divStyle}>
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


