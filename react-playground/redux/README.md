Redux [ Time Travel ]
----------
1. Mantra's:
* Redux define the `store` and consolidates the application data at one place.
* Data in `store`s flow in one direction ( top down ).
* Components have to request access to data in `store`.
* Strict rules on how `store` can be updated.

> Story: Imagine you have time travel machine and you are in your early 40's. You really miss being in your 20 and the way you dressed, school life, concerts and just the young you. Unfortunately we can't travel back in time to be in your 20 but what if we could ? What if we had choice as we grow older to traverse back in time. Redux does something similar ( time travel ), it doesn't change the original state but takes a copy of the state and modify as per your need so we could always go back to original state or whatever state we wish in future.

2. What Redux is Made of:

Store [ state ] ---> (DOM) ---> Actions ---> Reducer ---> Store [ back to store ]

* Actions are similar to DOM events ( example click events )
* Actions are nothing but pure javascript object, and must have "type".
* "Type" defines the purpose, and `Actions` can have data.
* Always try to create constant to hold type property (i.e string) in Actions.
* We make `Actions` portable by wrapping in pure functions called `Action Creator`.
* Each app will have only one Store, but can have many actions and reducers.
* Reducers takes 2 arguments.
* Store is immutable, so state cannot be changed directly and hence we use pure functions.

Actions: they are javascript object's to handle the user actions in the DOM to update / retrieve data from the store. However actions doesn't directly interact with the store but the `reducers`.

Actions:
```javascript
const USER_PROFILE = 'USER_PROFILE'; //creating string const to hold the value
const myAction = {
  type: USER_PROFILE, // must have `type` property
  name,               // data
};
```
Actions are wrapped with in pure functions, So below example will have actions in action creator.
Action Creator:
```javascript
const USER_PROFILE = 'USER_PROFILE';
const submitUser = (name) => ({
  type: USER_PROFILE,
  name: name, //or name,
})
```
Reducers: Reducers are pure functions ( the data never changes, no side effects etc ) created based on javascript `reducer` array function. It takes two arguments, action just dispatched from the action creator and state from the store. This state eventually becomes previous state however we don't actually modify the state itself but copy the original state (example: lets call state#1 state).

> Object.assign plays a vital role in copying original state to stage#1 state and merging the object to final stage#1 state. [Object Assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

```javascript
function reducer (state = initialState , action) {
  switch (action.type) {
    case 'USER_PROFILE' :
      return Object.assign({}, state, {
        user: action.name
      })
    default:
      return state;
  }
}
```
Above reducer function returns new object with updated user name.
