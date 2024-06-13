## Page navigation in React

For navigation between pages use " import { useNavigate } from "react-router-dom"; "
Add to your React component - " const navigate = useNavigate(); "
Then in needed places use " navigate("/path") "

## POST request

Use async function outside component with fetch.

```javascript
const response = await fetch("/api/blogpost", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    param1,
    param2,
  }),
});
return await response.json();
```

Use without await in react component

## IF NEXT VALUE DEPENDS ON A PREVIOUS VALUE IN SET STATE

INSTEAD SetValue(value);
DO THIS:

```javascript
setInputFields((inputFields) => {
  return { ...inputFields, content: content };
});
```
