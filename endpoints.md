# API endpoints

BASE_URI อาจมีหน้าตาลักษณะนี้ `http://localhost:PORT` โดยที่ `PORT` นี้อาจจะเป็น `3000`, `5000`, `8000`, หรืออื่น ๆ ขึ้นกับค่าที่ตั้งไว้

หาก `fetch` ที่ frontend ให้ลอง `console.log` data ออกมาก่อนเพื่อดูว่า object มีลักษณะอย่างไร เพราะผลลัพธ์ที่ส่งมาจากหลังบ้านจะกลายเป็น value หนึ่งของ key ตัวหนึ่งใน object ที่ได้จริง เช่น

```javascript
// this is just an example to show that the object sent from backend is inside the object gained from fetch function
{
    ...
    key1: value1,
    key2: [...],
    keySomething: actualData,
    ...
}

// where the actualData's structure can be examined easily with Postman
```

ตัวอย่างการใช้ `fetch()` ของ JavaScript สำหรับโปรเจคเรา

```javascript
...
// in async function
// let's say the port is 5000
// method can be "POST" or "GET" or others
const response = await fetch("localhost:5000/api/v1/...",{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({...}),
});
if (response.ok) {
    // at this step, the fetch was succeeded!
    const data = await response.json();
    ...
} else {
    // else, the fetch was failed
    ...
}
...
```

## GET `/api/v1/users/`, get all users

- request's body can be empty

- get an array of object back

example:

```javascript
...
const data = await fetch("http://localhost:5000/api/v1/users");
// the default method is set to "GET"
...
```

## GET `/api/v1/users/:id`, get specific user with id

- request's body can be empty

- get an object back

example:
```javascript
...
const data = await fetch("http://localhost:5000/api/v1/users/483910293847293718349802");
// the default method is set to "GET"
// the id is corresponded to '_id' field in users collection in MongoDB, so it must be a 24-character string
...
```

## POST `/api/v1/users/register`, register as a user/player

- request's body must provide a field `username` like

```javascript
...
body: JSON.stringnify({
    username: "Vincent",
}),
...
```

## GET `/api/v1/game/parties`, get all parties

- request's body can be empty

- get an array of object back

## GET `/api/v1/game/parties/:id`, get a specific party with id (party's id, not user's id)

- request's body can be empty

- again, the id must be a 24-character string

- get an object back

## POST `/api/v1/game/create`, create a party

- request's body must provide a field `userId` like

```javascript
...
body: JSON.stringnify({
    userId: "...",
}),
...
```

- again, the id must be a 24-character string

- get a party object back

## POST `/api/v1/game/join/:partyId`, join a specific party

- request's body must provide a field `userId` like

```javascript
...
body: JSON.stringnify({
    userId: "...",
}),
...
```

- again, the id must be a 24-character string

- got the party's id back

## POST `/api/v1/game/draw/:partyId`, draw a card

- request's body can be empty

- get a card's number back (like 1, 2, 3, ..., 9, 10)