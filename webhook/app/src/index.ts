import express from 'express';

const app = express();
const port = 9000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
