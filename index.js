const express = require('express');
const bcrypt = require('bcrypt');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));



app.get('/',(req,res)=>{
   res.send('hello');
})

app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    console.log('line 17: ',username,password);
})

app.listen(3000,()=>{
    console.log('server is running in port 3000');
})