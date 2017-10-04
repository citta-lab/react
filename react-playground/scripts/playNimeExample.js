const Starts = (props) => {
  /*
  const stars= [];
  for ( var i =0; i< Numbers; i++){
  	 stars.push(<i className="fa fa-star"></i>)
  }
  */

	return (
  	<div className="col-sm-4"> 
    {_.range(props.randomNumberOfStars).map((number,i) => 
    	<i className="fa fa-star" key={i}></i>
    )}
    </div>
  )
}

const Answer = (props) => {
	
	return (
  	<div className="col-sm-4"> 
    	{props.selectedNumber.map( (number,i) => 
    		<span key={i} onClick={() => props.unselectNumbers(number)}> 
    			{number}
    		 </span>
    	)} 
    </div>
  )
}

const Button = (props) => {

  let button;
  switch(props.answerCorrect){
  	case true:
    	button =
      	<button className="btn btn-success"> 
      		<i className="fa fa-check"></i> 
      	</button>;
    case false:
    	button =
      	<button className="btn btn-danger"> 
      		<i className="fa fa-times"></i> 
      	</button>;
    default:
    	button = 
      	<button className="btn" 
      			onClick={props.checkAnswer} 
      			disabled={props.selectedNumbers === 0}> 
      			= 
      	</button>;
    break;
  }
  
	return(
  	<div className="col-sm-4"> 
    	{button}
    </div>
  )
}

const Number = (props) => {

/*
const aNumbers= _.range(0,10);
<div> {aNumbers.map(number => <span> {number} </span>)} </div>
*/

	const numberClassName = (sNumber) => {
    if (props.selectedNumber.indexOf(sNumber) >= 0 ){
    	return "selected"
    }
  }
	return(
  	<div className="card text=center">
  		<div>
        	{Number.list.map(number => 
        		<span className={numberClassName(number)} 
        				onClick={()=>props.selectNumber(number)}> 
        		{number} 
        		</span>
        	)}
      </div>
  	</div>
  )
}

Number.list = _.range(0,10);

class Game extends React.Component {

	state = {
  	selectedNumber : [],
    randomNumberOfStars : 1 + Math.floor(Math.random()*9),
    answerCorrect: null,
  };
  
  selectNumber =(clickedNumber)=> {
  	if ( this.state.selectedNumber.indexOf(clickedNumber) >= 0){return ;}
  	this.setState(prevState => ({
    	answerCorrect:null,
    	selectedNumber: prevState.selectedNumber.concat(clickedNumber)
    }));
    console.log(" selectedNumber : "+this.state.selectedNumber)
  }
  
  unselectNumbers =(clickedNumber)=>{
  	this.setState(prevState => ({
      answerCorrect:null,
    	selectedNumber: prevState.selectedNumber.filter(number => number !== clickedNumber)
    }))
  }
   
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerCorrect: prevState.randomNumberOfStars ===
      	prevState.selectedNumber.reduce((acc, n) => acc + n, 0)
    }));
    console.log(this.state.answerCorrect);
  };

	render(){
  	
    const { randomNumberOfStars, selectedNumber,answerCorrect } = this.state;
  
  	return (
      <div className="container">
      	<h3>Play Nine</h3>
        <hr/>
        <div className="row">
          <Starts randomNumberOfStars={randomNumberOfStars}/>
          <Button selectedNumber={selectedNumber} 
          				checkAnswer={this.checkAnswer} 
                  answerCorrect={answerCorrect}/>
          <Answer selectedNumber={selectedNumber} 
          				unselectNumbers={this.unselectNumbers}/>
        </div>
        	<br/>
          <Number selectedNumber={selectedNumber} 
          				selectNumber={this.selectNumber}/>
      </div>
    )
  }
}

const App = (props) => {
	return(
  	<Game/>
  )
}

ReactDOM.render(<App/>,mountNode)