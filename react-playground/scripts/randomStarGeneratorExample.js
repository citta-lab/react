//prints random star for loop
const OldStar = () => {
	
  	var oldDiv = {
      color:"green"
    }

  	const randomNumber = 1+Math.random()*8;
    let starts=[];
    for ( var i =0; i<randomNumber; i++ ){
      	starts.push(<i className="fa fa-star"></i>);
    }
    
	return (	
  	<div className="col-5" style={oldDiv}> 
      {starts}
    </div>
  )
}

//prints random star using _.range
const NewStar = ( ) => {

	var newDiv = {
      color:"blue"
  }
  
  const randomNumber = 1+Math.random()*8;

	return (
  	<div className="col-5" style={newDiv}> 
    {_.range(randomNumber).map(i => <i key={i} className="fa fa-star"></i>)}
    </div>
  )
}

//always prints the same 8 star
const FirmStar = () => {

	var firmDiv = {
      color:"orange"
  }

return (
	<div style={firmDiv}>
  	{_.range(1,8).map(i => <i key={i} className="fa fa-star"></i>)}
  </div>
)
}

//main app
const App = () => {
	var divStyle = {
  		padding: "20px",
      margin: "20px",
      fontSize:"24px",
  }

	return (
  	<div style={divStyle}>
    	<OldStar/>
      <hr/>
      <NewStar/>
      <hr/>
      <FirmStar/>
    </div>
  )
}

ReactDOM.render(<App/>,mountNode)
