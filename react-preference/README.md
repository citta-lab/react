## Abstract
Aim of this section is to improve the code readability, styling and enhance the performance keeping the functional aspect intact. Maybe this section is best kept to read once we/you have better understanding of React.


### Render
Instead of having the render display `null` whenever some condition is met, we can be proactive and avoid mutating the data by not using the `let`. To further explain here is the code snippet of render.

1. Before
```javascript
render() {
  let displayComponent = null;

  if(this.state.isValid) {
    display = (
      <SomeChildComponent
        close={this.onClose}
        person={this.state.person}
      />
    );
  }

  return (displayComponent);
}
```
The same snippet has been re-written to make it more readable and effective (one less variable mutation and things to worry)

2. After
```javascript
render(){
  if(!this.state.isValid){
    return null;
  }
  return(
    <SomeChildComponent
      close={this.onClose}
      person={this.state.person}
    />
  )
}
```

### Async State
I often forget to remember `setState` doesn't always guarantee immediate `state` update. Maybe this doesn't make sense then we/you should read more about `setState` and how updates are handled in batch instead of right at that moment.  

1. Before
```javascript
let displayString = '';
if(true){
  if(this.state.isValid){
    this.setState({ count: value })
  }
  if(this.state.count > 10){
    displayString = 'We kinda agree this works';
  }
}
```

2. After
```javascript
et displayString = '';
if(true){
  if(this.state.isValid){
    this.setState({ count: value }, function() {
      this.useNow();
    })
  }


  useNow(){
    if(this.state.count > 10){
      displayString = 'We kinda agree this works';
    }
  }
}
```
















Reference:  
1. [`setState` callback examples](https://stackoverflow.com/questions/42038590/when-to-use-react-setstate-callback)
2. 
