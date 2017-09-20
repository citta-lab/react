
//functional (child1) component
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



//functional (child2) component 
const CardList = (props) => {  
	return (
  	<div>
    	{props.cards.map(card => <Card {...card}/>)}
    </div>
  );
};

//class (child3) component 
class Form extends React.Component {
	
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
  
  render(){

     var formStyle = {
        float: "right",
        padding: "20px",
        margin: "0px",
     };

    return (
      <form id="addForm" style={formStyle} >
        <input type="text" placeHolder="github username" value={this.state.userName} 
        onChange={this.handleFormValue}/>
        <button class="btn btn-primary" type="submit" 
        onClick={this.handleFormSubmit}>Add</button>
      </form>
    );
}};
 
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
  
  //step 8: called by onSubmit from the Form directive in render
  handleAddCard = (cardInfo) => {
    this.setState(prevState => ({
    	data : prevState.data.concat(cardInfo)
    }));
  }

	/*step 7: trigerred by this.props.onSubmit() from Form component */
  render(){
    return (
      <div>
        <Form onSubmit={this.handleAddCard}/>
        <br/><br/>
        <div>
          <CardList cards={this.state.data}/>
        </div>
      </div>
    );
  }};

ReactDOM.render(<GitApp />,mountNode)
