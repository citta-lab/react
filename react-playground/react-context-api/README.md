### CONTEXT API

The below example shows the detail implementations of ContextAPI in application to provide
the most flexible pattern.

### Build Context API:
Instead of taking/using contextAPI directly we will leverage the API to customize to our needs
by creating custom Provider and higher order component to use as consumer.

#### Step 1 [ Create Context ]:
```javascript
//Context.js

/**
 * Using createContext to have the context ready to be used
 * which provides PROVIDER and CONSUMER to pass down the props
 * from parent to any of it's children.
 */
import React from 'react';
const Context = React.createContext(null);
export default Context;
```

#### Step 2 [ Custom Provider ]:
We can use this custom provider in our App's as Provider instead of directly using Context.Provider
from Step 1.
```javascript
//ExampleProvider.js

/**
 * ExampleProvider is more of Abstraction Component:
 *
 * Instead of using Context.Provider directly in App we can have Example.Provider
 * to pass down the props. Intern Example.Provider gives access to helper object
 * and or any other services we need. This way we can hide the implementation details
 * from user.
 */
import React, { Component } from 'react';
import Context from './Context';
import ExampleJavascriptClass from './ExampleJavascriptClass';

class ExampleProvider extends React.Component {
    constructor(props){
        super(props);
        /**
         * Calling ExampleJavascriptClass class before ExampleProvider
         * is mounted so we can use ExampleJavascriptClass object if
         * needed and/or pass down to children component using Context.Provider.
         */
        this.helper = new ExampleJavascriptClass();
    }

    componentDidMount(){
        console.log("1. ExampleProvider mounted");
    }

    render(){
        return(
            /**
             * this.props.url is passed whenever the <ExamplePRovider url={'www.google.com`}>
             * is wraps the root App component. this.helper is instance/object has helper method
             * which we call in ExampleProvider constructor.
             */
            <Context.Provider value={{url :this.props.url, helper: this.helper}}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default ExampleProvider;
```

#### Step 3 [ Helper Class ]:
As you saw in ExampleProvider we are calling ExampleJavascriptClass in the constructor and
then passing the instance/object reference of this class to Context.Provider `value` prop.
This is extra layer which helps to send more functionality to child components. However if
this is just an option and not a must. So lets define this javascript class.

```javascript
//ExampleJavascriptClass.js

/**
 * This can be helper class which we can use it with in
 * ExampleProvider. This way we could have some default
 * props or functions down to children once the root
 * component of the App is wrapped with <ExampleProvider>
 */
class ExampleJavascriptClass {
    constructor(){
        this.name = 'nothing',
        this.value ='0'
    }

    setConfig(value){
        this.value = value;
    }

    updateName(name){
        this.name = name;
        console.log(' Name updated to : '+this.name)
    }
}

export default ExampleJavascriptClass;
```

#### Step 4: [ Higher Order Component for Consumer ]
Last and final step where we will create higher order component which user can wrap any of
child components if they want to use `context` provide by the ExampleProvider. Ahh, remember
ExampleProvider has `Context.Provider` so all we need to do here is use the `Context.Consumer`
and wrap the passed child component (WrappedComponent).

```javascript
// withExampleHOC.js

import React from 'react';
import Context from './Context';

/**
 * Higher Order Component which wraps the consumer context on the Wrapped component.
 * @param {*} WrappedComponent - whatever the component we wrap with withExampleHOC.
 */
const withExampleHOC = (WrappedComponent) => {
    const WithHOC = (props) => {
        return (
            /**
             * The way we extract values from Consumer.Provider is using Context.Consumer
             * and which returns the function with props value ( in this case we named it
             * as context). So the context has both the url and helper object.
             */
            <Context.Consumer>
                {context => <WrappedComponent {...props} context={context} />}
            </Context.Consumer>
        )
    }
    WithHOC.WrappedComponent = WrappedComponent;

    return WithHOC;
}

export default withExampleHOC;
```
Now we have custom contextAPI specific to our application needs :) lets see how we can leverage.

### Usage:
All we need to do is follow two basic steps
1. Wrap the root component of the App with provider i.e ExampleProvider.
2. Wrap the child component with higher order component to consume it i.e withExampleHOC.

#### Step 1: Wrap with Provider
```javascript
//App.js

import React, { Component } from 'react';
import './App.css';

import ExampleProvider from './ExampleProvider';
import FirstChild from './FirstChild';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Welcome </h1>
        <ExampleProvider url={'www.fifa.com'}>
          <FirstChild />
        </ExampleProvider>
      </div>
    );
  }
}

export default App;
```

#### Step 2: Consume using HOC
May it be FirstChild or child component of the FirstChild all we need to do is wrap it with `withExampleHOC`.
```javascript
//FirstChild.js

import React, { Component } from 'react';
import FirstGrandChild from './FirstGrandChild';
import withExampleHOC from './withExampleHOC';

class FirstChild extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
       this.props.context.helper.updateName("Neymar Jr");
        return(
            <div>
                <h2> First Child </h2>
                <FirstGrandChild />
            </div>
        )
    }
}

export default withExampleHOC(FirstChild);
```
