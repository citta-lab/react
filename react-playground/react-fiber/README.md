ReactFiber [ juggling pebbles ]
--------------------------

#### Reconciler vs Renderer
Currently reconciliation and rendering is synchronous process, from React 16 the whole react is re-written to adopt
task scheduling using fiber.

| Reconciler        | Renderer           |
| ------------- |:-------------:|
| Virtual DOM     | Updates the app UI |
| Compares Diff trees      | Different Render can share same Reconciler for different devices |
| Compute Changes to Render s |       |

#### What is Fiber ?

Adaptation of task scheduling by pausing the work based on priority. 
