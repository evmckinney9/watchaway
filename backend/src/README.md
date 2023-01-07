### Setup

| index.ts | router.ts | controller.ts |
| --- | --- | --- |
| Initialzes Express and Firebase, adds middleware, starts listening to endpoints | Router acts like a table of contents of GET and POST commands, attaching endpoints to functions | Services are async functions which recieves requests, and may query the database |

```typescript 
//index.ts
server.use('/api', router);
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

//router.ts
router.get('/', helloWorld);

//controller.ts
export const helloWorld = (req: Request, res: Response) => { \
console.log(req.body);\
res.send('Hello World!');\
};
```

___
Requires `src/firebase_config.json`
```typescript
export const firebaseConfig = {
    apiKey: "<>",
    authDomain: "<>",
    projectId: "<>",
    storageBucket: "<>",
    messagingSenderId: "<>",
    appId: "<>",
    measurementId: "<>"
};
```
