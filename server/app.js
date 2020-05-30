const express = require("express");
const app = express();
const PORT = 5000;

const customMiddleware = (req, res, next) => {
    console.log("Middleware executed!");
    next();
}

app.get('/', (req, res) => {
    console.log("home");
    res.send("Hello world.");
});

app.get('/about', customMiddleware, (req, res) => {
    console.log("about");
    res.send("About page.");
});

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});