## Abstract

1. Why Redux Saga ?
library acts as redux middleware to manage side-effects. This leverages ES6 generators features to let us write `asynchronous` code in Redux application. Typically redux application creates `ACTION`, when we use `redux-saga` it acts as middleware which consumes these `ACTIONS` and emits the different `ACTIONS` or `SIDE-EFFECTS`.

> Saga, is series of actions which can be reversed at any given point of time. Example: database rollback. However Redux Saga, is more of long running background process which manages actions.

#### Things to know:
- Can be used independently of Redux, though the name is `Redux-Saga`.
- It would be overkill if the application has only `synchronous` calls.
- Redux Saga runs in the background at the time of launching an app.
- Helps avoid writing side effects in reducer, instead handled by saga's.

#### Things to pay attention:
- Redux Saga Effects ( i.e side-effects ).
- Use of Yield ( i.e from ES6 generators ).
- Channels ( use to communicate between redux sagas )

#### How generators are used:
- Redux saga adds a wrapper around generators which manages promises so we don't have to worry
about handling.

## Installation
1. Install:
```javascript
npm install --save redux-saga
```
2. Import Middleware:
```javascript
// import it in getStore.js or wherever redux createStore/store is used.
import createSagaMiddleware from 'redux-saga';
```
3. Use it by invoking:
```javascript
const sagaMiddleWare = createSagaMiddleware();
```

## Redux Saga Effects
These saga effects are only valid in the context of redux-saga.
1. TAKE :
Pauses particular line of code and resumes it whenever the specified ACTION is dispatched. This make use of generator yield feature and works for single threaded.
```javascript
//1. creating generator function
function* exampleTakeFunction(){
    console.log(" 1. Function is called ");
    const value = yield effects.take('RANDOM_ACTION_NAME'); /* making use of 'take' which will pause the code and listen for ACTION */
    console.log(" 2. Yield is processed ");
}

//2. running saga
run(exampleTakeFunction);

/**
 This will only run the code until yield and pause the execution, now we need to dispatch the
 ACTION which can resume the `take`.
 */
 //3. dispatch
 dispatch({type:'RANDOM_ACTION_NAME', value:100})
```

2. PUT:
This resumes the action if it's paused, this doesn't pause any code execution. to understand better we will pause code execution using `take` and then call `put` on the action to resume it instead of using `dispatch`.
```javascript
//1. creating a scenario to pause
function* exampleTakeFunction(){
    console.log(" 1. Function is called ");
    const value = yield effects.take('RANDOM_ACTION_NAME'); /* making use of 'take' which will pause the code and listen for ACTION */
    console.log(" 2. Yield is processed ");
}

//2. defining put
function* examplePut(){
  yield effects.put({type:'RANDOM_ACTION_NAME', value:200});
}

// 3. running saga
run(exampleTakeFunction); // which will be paused at yield
run(examplePut); // this will resume the `take`
```

3. FORK:
Fork can be used to make asynchronous calls to fetch details. for example: In shopping cart, we can retrieve list of item id's which needs to be displayed and use saga's fork to fetch each item details individually
```javascript
// Filename: fetchAllItems.js
// Step 1: fetch all id's
function* fetchAllItems(){
  const { user } = yield take(SET_CURRENT_USER); // different saga which loads the user.
  const { id } = user;
  const response = yield fetch("http://localhost/items/${id}"); // API call.
  const { items } = yield response.json(); // returns json object, use call if needed to mock in unit test.
  yield put(setCartItems(items));
}
```
Now we have fetched the items id and
