const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config({path: path.join(__dirname, '.env')})

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.LISTEN_PORT, ()=>{
    console.log('Frontend server listening on port '+process.env.LISTEN_PORT)
})
