## What is reconciliation?

The algorithm react uses to compare between previously built tree vs newly created tree to determine which parts needs to be updated/changed. 

### How does this work ? 
Whenever we render React Application, a tree of nodes are built and saved in memory before pushing this newly built tree to rendering platform. 
Example: In case of Browsers, set of DOM operations. This way REACT re-uses the same RECONCILIATION algorithm between ReactDOM and/or React Native. 
Now, if the app gets an data update via `setState`, a new tree nodes are generated with the change and then it is compared with the previous tree nodes
saved in the memory to figureout which are all the nodes are changed and then just update them. 

react team is working on (React Fiber)[https://github.com/acdlite/react-fiber-architecture] to re-write the reconciliation from ground up by keeping the same basci idealogy.


