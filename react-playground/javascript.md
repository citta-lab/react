javascript Tips
--------------------------

1. Adding value to an Object

```javascript
var initialStage = {}; // empty object
check = () => {
  initialStage["name"] =  "Bob";
}

check();
console.log(JSON.stringify(initialStage));
```

2. Assigning object value to const

```javascript
const action = {
	day:"sat",
  meal:"chicken",
  name:"bob"
}
const { day, meal, name } = action;
const checkDay = action.day;

//checking
console.log(day);
console.log(meal);
console.log(name);
console.log(checkDay);
```
