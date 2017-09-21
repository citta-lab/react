
const Button = () => {
	return (
  	<div className="col-2"> 
    	<button>=</button>
    </div>
  )
}


//step6: Answers to hold the number 
const Answers = () => {
	return (
  	<div className="col-5">Answer</div>
  )
}



//step5: Define numbers to choose 
const Numbers = () => {
	return (
  	<div className="card text-center"> 
  		<div>
        <span >1</span>
        <span className="selected">2</span>
        <span className="used	">3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  )
}

Numbers.list = _.range(1,10);


//step4: Define Star component and render in Game
const Star = () => {
	
  	const randomNumber = 1+Math.random()*9;
    let starts=[];
    for ( var i =0; i<randomNumber; i++ ){
      	starts.push(<i className="fa fa-star"></i>);
    }
    
	return (	
  	<div className="col-5"> 
      {starts}
    </div>
  )
}

//step3: Define Game component and test the app
class Game extends React.Component {
	render(){
  	return (
    	<div className="container">
      	<h3> Play Nine </h3>
        <hr/>
      	<div className="row">
        	<Star/>
          <Button/>
        	<Answers/>
        </div>
        <br/>
        	<Numbers/>
      </div>
    )
  }
}


//step2: define the App component 
class App extends React.Component {
	render(){
  	return(
    	<Game/>
    )
  }
}

//step1: always render the App.
ReactDOM.render(<App/>,mountNode)
