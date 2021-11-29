## What is reconciliation?

The algorithm react uses to compare between previously built tree vs newly created tree to determine which parts needs to be updated/changed. 

### How does this work ? 
Whenever we render React Application, a tree of nodes are built and saved in memory before pushing this newly built tree to rendering platform. 
Example: In case of Browsers, set of DOM operations. This way REACT re-uses the same RECONCILIATION algorithm between ReactDOM and/or React Native. 
Now, if the app gets an data update via `setState`, a new tree nodes are generated with the change and then it is compared with the previous tree nodes
saved in the memory to figureout which are all the nodes are changed and then just update them. 

react team is working on [React Fiber](https://github.com/acdlite/react-fiber-architecture) to re-write the reconciliation from ground up by keeping the same basci idealogy.

`Virtual DOM` is this process of building the tree. Constructing this Virtual DOM is inexpensive compare to updating the real DOM. It is said that 200,000 virtual nodes can be constructed in a second without hindeing any app performance. Hence React constructs the NEW VIRTUAL DOM everytime any/small data changes in the application.  

### Algorithm 
React implements a heuristic algorithm for diffing beetween tree during reconciliation. This will result in O(n) time. But it depends on two main assumptions,
1. Two elements of DIFFERENT TYPES will produce different trees.
```jsx
const DiffTypes = ({name}) => {
  const greeting = `Hey there, ${name}!`;
  return ( 
     <div title='greeting' className='greet'>
        <h1> {greeting} <h1>
        <p> Example of reconciliation </p>
     </div>
  )
}
```
If we change `<div>` element to `<span>` then it will destroy all of div and it's children, then rebuild wuth span.
```jsx
const DiffTypes = ({name}) => {
  const greeting = `Hey there, ${name}!`;
  return ( 
     <span title='greeting' className='greet'>
        <h1> {greeting} <h1>
        <p> Example of reconciliation </p>
     </span>
  )
}
```
Example of how entire subtree is removed or replaced if the elements types and/or components are different. 
<img width="1416" alt="Screen Shot 2021-11-29 at 12 26 10 AM" src="https://user-images.githubusercontent.com/16902666/143813706-cf792b48-f7dc-4490-892e-2dc6659d8e12.png">



If the DOM Elements are of SAME TYPE then it would be more like just updating the attribute ( example : `className='bink'` )
```jsx

const DiffTypes = ({name}) => {
  const greeting = `Hey there, ${name}!`;
  return ( 
     <div title='greeting' className='bink'>
        <h1> {greeting} <h1>
        <p> Example of reconciliation </p>
     </div>
  )
}
```

2. The developer can hint at which child elements may be stable across different renders with a key prop.

```jsx
const DiffTypes = ({names}) => {
const greeting = (name) => `Hey there, ${name}!`;
  return names.map((name) => {
     <div key={name.empId} >
        <h1> {greeting(name)} <h1>
     </div>
  })
}
```

