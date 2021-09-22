
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








