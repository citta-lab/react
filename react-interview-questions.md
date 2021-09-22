
1. When should i use `onChange` vs `onBlur`?

if we want UI rendering to happen for every key stroke the user punch in then onChange which will cause redender everytime vs in onBlur foces the update only when the user cursor is out of focus. So minimal number of state update and hence the rerender. The later is more ideal.

