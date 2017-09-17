Render Data in Components 
--------------------------

The example is to explain child component rendering inside the parent component to avoid the code duplication by keeping the child component 
independent of data and use react's functions to minimize the code. 

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

2. Now the main parent component will wrap-up the child component with style, add data from child. Notice we have used inline style by two ways, by declaring a variables ( nameStyle, divStyle ) or in div itself as `<div style={{display:'inline-block', marginLeft:10}}>`. 

```javascript
//functional component ( child )
const Card = (props) => {

	var divStyle = {
	    background: "#eee",
	    padding: "20px",
	    margin: "20px"
	};
  
	nameStyle ={
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


