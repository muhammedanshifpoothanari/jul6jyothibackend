const express = require('express');

const cors = require('cors');
const { MongoClient } = require('mongodb'); 


async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://anshif:nesRoWgW5SqAD0yF@cluster0.8dtglzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('test');
   ;
 }
 

 
const app = express();

app.use(cors())
app.use(express.json())

app.get('/user', async function(req, res) {
    let output = await db.collection('user').find({"userName":req.body.userNam}).toArray();
    res.json(output)
})


app.post('/calculate', function(req, res) {
    console.log(req.body);
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let oparator = req.body.opporator;
    let result = 0;

    if(oparator == 'add') {
        result = num1 + num2
    } else if(oparator == 'sub') {
        result = num1 - num2
    } else if(oparator == 'mul') {
        result = num1 * num2
    } else {
        result = num1/num2
    }

    // user.push(req.body)

    res.json(result)
})


app.listen(2000, function() {
    mongoConnect();
console.log('server listening on port 2000');
})