
### 1.When should i use `onChange` vs `onBlur`?

if we want UI rendering to happen for every key stroke the user punch in then onChange which will cause redender everytime vs in onBlur foces the update only when the user cursor is out of focus. So minimal number of state update and hence the rerender. The later is more ideal.

### 2.How can we extract statefull logic between multiple components ?

We can write `higher order component` or use `render props` ( also called `children props` ) to send component as a prop. But now with the help of hooks we can write `custom hooks` to accomplish this.

### 3.Why do i need to use React.Fragments (i.e short hand `<>`)? 

We need to return single element in the react render and often we use `<div>...</div>` to wrap all the children or DOM elements. This div adds extra nodes to the DOM element, by using `<>...</>` or `<Fragment>...</Fragment>` we are grouping all the nodes together and react just ignores the fragment while rendering it to the DOM. 

If we need to add id or key to the grouping then we can use `<Fragment id={pageId}>...</Fragment>` over `<>....</>`.

### 4. What does useEffect do? 
By using Hook, we tell React that our component needs to do something after render. React will remember the function you passed (refer to it as “effect”), and call it later after performing the DOM updates. In this effect, we can manipulate the DOM with user data or data fetched from API's etc.

### 5. Why is useEffect called inside a component? 
Placing useEffect inside the component lets us access the state variable (or any props) right from the effect. We don’t need a special API to read it — it’s already in the function scope. Hooks embrace JavaScript closures and avoid introducing React-specific APIs where JavaScript already provides a solution.

### 6. Does useEffect run after every render? 
Yes! By default, it runs both after the first render and after every update. React guarantees the DOM has been updated by the time it runs the effects.


### 7. When would i add dependecny in `useEffect` array ?
```js
useEffect(() => {
   const [ courseId, studentId, submissionId ] = someFunction();
   return () => {
      someRemoveFunction(courseId, studentId, submissionId)
    };
},[studentId]);
```
Answer: 

For every re-render useEffect will run cleanup process, not just UNMOUNTING which might cause performance issues. By adding interested props in useEffect array we can force useEffect to run only on `studentId` change.

### 8. What is the use case of using `dangerouslySetInnerHTML` ? What should we be cautious about ?
`dangerouslySetInnerHTML` allows react to pass the contenent directly to HTML DOM without any intervention which open ups `XXS` ( cross site scripting attack. We could be little cautious and use DomPurify library to eliminate some of the risks.
```jsx
function createMarkup(htmlData) {
  return {__html: DOMPurify.sanitize(htmlData)};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup(htmlData)} />;
}
```

### 9 Why and When should i use ContextAPI ( useContext ) ?
Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language. However this shouldn't be used to eliminate the prop drilling by setting state values so we can use it in the child componment. The reason is that this will pushes the changing data to all the children componenet whoever is using `useContext` whether they are in need of changed data from context or not. 

### 10. What are Ref's and when should we use it ?
In the typical React dataflow, props are the only way that parent components interact with their children. To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively ( cannot be done declaratively ) modify a child outside of the typical dataflow.
Examples:
 - Integrating with third-party DOM libraries. ( Dojo, jsp )
 - Managing focus, text selection, or media playback.
 - Triggering imperative animations.

### 11. Can we point out which one is better ( performance ) and how can we fix it ?
In this first example we will be adding a new element at the end of the existing list.
```jsx
<ul>
  <li>first</li>
  <li>second</li>
</ul>
```
becomes,
```jsx
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>  // <- added here
</ul>
```
In this second example we will be adding a new element in the begining of the existing list.
```jsx
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```
to 
```jsx
<ul>
  <li>Connecticut</li> // <-- added here
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

Answer:
using keys we can eliminate the performance problem due to entire page destruction and re-painting by letting the React look into the keys to make the changes needed.  
```jsx
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```
In order to solve this issue, React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. For example, adding a key to our inefficient example can make the tree conversion efficient, and React knows that the element with key '2014' is the new one, and the elements with the keys '2015' and '2016' have just moved.

### 12. How can we update `moreThanTen` state value ?
```js
const state  = {
    allocation: {
      "Eddy": 2,
      "Danny": 1,
      "John": 13
    },
    moreThanTen: false,
  };
```
Answer:
```js
/** calculate the sum */
 const sum = Object.keys(state.allocation)
  .map((item) => state.allocation[item])
  .reduce((sum, ele) => sum + ele, 0);

console.log(sum)

/** update the state */
setState({...allocation, moreThanTen: sum > 10 })

/** without setState hook */
const newState = {
    ...state.allocation,
    moreThanTen: sum > 10
}
```






