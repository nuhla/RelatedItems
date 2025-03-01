const express = require('express');
const path = require('path');
const request = require('request');
const app = express();

//-----------------------------------------------------------------//
//---- requiring and using body parser to parse our req body ------//
//-----------------------------------------------------------------//
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//--------------------------------------------------------------------------------------------------//
// ----------if the app is depoyed then the port is ganna be taken from the env ,else its 3003 -----//
//--------------------------------------------------------------------------------------------------//
const port = process.env.PORT || 3005;

//----------------------------------------------------//
//------------- solving cors proplem -----------------//
//------------- allow Origin for All -----------------//
//----------------------------------------------------//

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
//------------------------------------------------------//
//-------------access the review API  ------------------//
//------------- and get the needed data from it---------//
//------------------------------------------------------//
app.get('/getRate', (req, res) => {
  console.log(req.query);
  res.header('Access-Control-Allow-Origin', '*');
  request(
    'https://protected-plains-93575.herokuapp.com/reviewsApi/getRate/' +
      req.body.id,

    function(error, response, body) {
      //--------------------------------------------------------------//
      //------------- if the data sccesed sucssrfully ----------------//
      //------------- we need to send it back to the component -------//
      //--------------------------------------------------------------//
      if (!error && response.statusCode === 200) {
        res.json(body);
      } else {
        res.end('err:' + error);
      }
    }
  );
});

//------------------------------------------------------------------------------//
//---------------- define and use our static directores in the app--------------//
//------------------------------------------------------------------------------//
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_nmodules')));

app.get('/', (req, res) => {});

app.listen(port, () => console.log(`Listening on ${port}`));
