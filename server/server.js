const express = require('express');

const app = express();

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => {
    console.log('listening....');
})

app.use(express.json());


app.get('/', (req,res) => {
    res.json({
        message: "Hello me",
    });
})