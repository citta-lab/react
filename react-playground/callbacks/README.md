### Callback in React

I was faced with a simple task yet i was so confused and lead me to lot of confusion to accomplish the goal.

#### Abstract:
We have two react apps (i) `BASE` app and (ii) `CONSUMER` app. `BASE` app acts as a framework which provides the required components needed for `CONSUMER` app or any other APP which can be built upon.

#### APP Structure:
```javascript
BASE
- Layout.js
- Helper.js
- Timer.js ( imports Helper )
- Navigation.js

CONSUMER
- People.js
- Page.js ( Timer is rendered with in Page )
  - Timer.js ( imported from BASE)
```

#### Presented Task:
Whenever user clicks the button or the page, the `Timer` in `BASE` app should make XHR request to get data for the given url from the `props` and meanwhile it should also (callback) let `CONSUMER` app know to create one more `XHR` request to get data from `configuration`. Respective responses should be handled by `BASE` and `CONSUMER` app in order.

#### Solution:
Looking into Timer.js react component inside the BASE,
```javascript
// File: Timer.js ( BASE APP )
import Helper from './Helper';
export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.handleListener = this.handleListener.bind(this);
    this.handleCallBack = this.handleCallBack.bind(this); // step 2: Binded the callback handler.
  }

  componentDidMount(){
    this.helper = new Helper (count, this.handleCallBack); // step 1: Added callback Helper class.
    this.setUp(); // method to add click listener.
  }

  setUp(){
    document.addEventListener('click', this.handleListener);
  }

  handleListener(){
    this.helper.Processor(); // this is from Helper.js
  }

  // step 3: defined callback which is passed to Helper when created using `new`
  handleCallBack () {
    this.props.onCheck();
  }

  /* step 4: Not depended but this called when button is called. So i call the callback  
  directly */
  keepIt(){
    const { onCheck } = this.props;
    onCheck();

    /*
      .....
    */
  }
}
```

Helper method has XHR request handling and it is javascript class based.
```javascript
//File: Helper.js ( BASE APP)
export default class Helper{
  constructor(count, callback){
    this.count = count;
    this.callback = callback;
  }

  Processor(){
    //.....does something
    this.callback(); // step 5: Added callback to execute when Processor is called directly.
    //...calls other function to send XHR
  }
}
```
Upto this point whenever the user clicks on the page we call the Helper class Processor directly and execute the `callback` which in turn executes the `onCheck` callback defined on the `props`. Now we need to define a function in `CONSUMER` app to get executed when `onCheck` is called.
```javascript
//File: Page.js
import { Timer} from 'BASE';
export class Page extends React.Component {
  constructor(props){
    super(props);
    this.handleRequest = this.handleRequest.bind(this);
  }

  //Step 7: Defining the local function to send request.
  handleRequest(){
    //....handle XHR request to get data from configuration
    console.log("Request will be sent to Backed ");
  }

  render(){
    return(
      <div>
        <Timer
          ...
          onCheck={this.handleRequest} //Step 6: Binds it to local function
        />
      </div>
    )
  }
}
```
