const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connect_DB = require('./DB/connection_db');
const sendEmail = require('./nodemailer');
const Quote = require('./models/Quote');
require('dotenv').config({ path: './config/config.env' });
connect_DB();
const app = express();

//middlewares

app.use(cors({ origin: 'https://edekmoving.com' }));
app.use(helmet());
app.use(express.json());

function check(params) {
  return params === 'on' ? 'Yes' : '-';
}

function listofItems(list) {
  const items = list.split(',');
  const lists = items
    .map((item) => {
      return `<ul>
         <li>${item}</li>
         </ul>
          `;
    })
    .join(' ');
  return lists;
}

//routes
app.post('/edekmoving', async (req, res, next) => {
  try {
    const quote = await Quote.create(req.body);

    console.log(quote);
    const options = {
      to: quote.email,
      from: quote.user,
      html: `<div style="width: 100%; padding: 3px;">

<h1 style="font-weight: bolder;margin-bottom: 15px; font-size: 16px;">Client current location :</h1>
<hr>
<div style="font-weight: bolder; font-size: 19px">Contact: <span style=" font-size: 17px font-weight: normal">${
        quote.contact
      }</span> </div>
<div  style="font-weight: bolder; font-size: 19px">Address From: <span style="font-weight: normal; font-size: 17px">${
        quote.addressFrom
      }</span> zip code: <span style=" font-size: 17px font-weight: normal">${
        quote.zipCodeFrom
      }</span></div>
<div style="font-weight: bolder; font-size: 19px">House: <span  style="font-weight: normal; font-size: 17px">${check(
        quote.houseFrom
      )}</span> </div>
<div style="font-weight: bolder; font-size: 19px">Appartement: <span style="font-weight: normal; font-size: 17px">${check(
        quote.appartementFrom
      )}</span> Elevator <span style="font-weight: normal; font-size: 17px">${check(
        quote.elevatorFromYes
      )}</span> <span style="font-weight: normal; font-size: 17px">${check(
        quote.elevatorFromNo
      )}</span>  Floor: <span style="font-weight: normal; font-size: 17px">${
        quote.fromFloor
      }</span>   </div>
<div style="font-weight: bolder; font-size: 19px">Date: <span style="font-weight: normal; font-size: 17px">${
        quote.calender
      }</span> </div>
      
<h1 style="font-weight: bold;margin-bottom: 15px; font-size: 16px;">Destination location :</h1>
<hr>
<div style="font-weight: bolder; font-size: 19px">Address From: <span style="font-weight: normal; font-size: 17px;">${
        quote.addressTo
      }</span> zip code: <span style="font-weight: normal; font-size: 17px">${
        quote.zipCodeTo
      }</span></div>
<div style="font-weight: bolder; font-size: 19px">House: <span style="font-weight: normal; font-size: 17px">${check(
        quote.houseTo
      )}</span> </div>
<div style="font-weight: bolder; font-size: 19px">Appartement: <span style="font-weight: normal; font-size: 17px">${check(
        quote.appartementTo
      )}</span>

      Elevator: <span style="font-weight: normal; font-size: 17px">${check(
        quote.elevatorToYes
      )}</span> <span style="font-weight: normal; font-size: 17px">${check(
        quote.elevatorToNo
      )}</span>  Floor: <span style="font-weight: normal; font-size: 17px">${
        quote.toFloor
      }</span>
      </div>


<div style="font-weight: bolder; font-size: 19px">List of items: <span style="font-weight: normal; font-size: 17px">${listofItems(
        quote.listItems
      )}</span> </div>
`,
    };

    await sendEmail(options);
    res.status(201).send({ success: true });
  } catch (error) {

  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on localhost`));
