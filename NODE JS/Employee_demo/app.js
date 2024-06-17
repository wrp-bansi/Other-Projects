
const express = require('express');

const { handleError, handleNotFound } = require('./middleware/error-middleware');
const signupRoute = require('./routes/signup-route');
const loginRoute = require('./routes/login-route');


const app = express();

const bodyparser=require('body-parser')
app.use(bodyparser.json)

app.use('/signup', signupRoute);
app.use('/login', loginRoute);

app.use(handleError);
app.use(handleNotFound);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
