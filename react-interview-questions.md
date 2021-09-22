
## 1.When should i use `onChange` vs `onBlur`?

if we want UI rendering to happen for every key stroke the user punch in then onChange which will cause redender everytime vs in onBlur foces the update only when the user cursor is out of focus. So minimal number of state update and hence the rerender. The later is more ideal.

2.How can we extract statefull logic between multiple components ?
We can write `higher order component` or use `render props` ( also called `children props` ) to send component as a prop. But now with the help of hooks we can write `custom hooks` to accomplish this.

3.Why do i need to use React.Fragments (i.e short hand `<>`)?
We need to return single element in the react render and often we use `<div>...</div>` to wrap all the children or DOM elements. This div adds extra nodes to the DOM element, by using `<>...</>` or `<Fragment>...</Fragment>` we are grouping all the nodes together and react just ignores the fragment while rendering it to the DOM. 

If we need to add id or key to the grouping then we can use `<Fragment id={pageId}>...</Fragment>` over `<>....</>`.





