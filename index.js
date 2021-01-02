const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connect_DB = require('./DB/connection_db');
const router = require('./routes/router');
require('dotenv').config({ path: './config/config.env' });
connect_DB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

//routes
app.use('/', router);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running...`));
