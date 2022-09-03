// requires the express library
const express = require('express');

// sets the port
const app = express();
const PORT = process.env.PORT || 3000;

// instructs the app on which directories to use
app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// requires the app to use the htmlRoutes
require('./routes/htmlRoutes')(app);

// instructs the app to listen to the port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
