const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')

const User = require('./models/user.model')

app.use(cors())

mongoose.connect('mongodb://localhost:27017/vertexDB')

app.listen(1337,()=>{
    console.log('Server started on 1337')
}
)

app.use(express.json())

app.post('/api/register',async(req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            address: req.body.address,
            contact: req.body.contact,
            role: req.body.role,
        })
        return res.json({status: "ok",user:user})
    } catch (error) {
        res.json({status: "error"})
        
    }

})

app.post('/api/login',async(req, res) => {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        })
        if(user){
            return res.json({status:"ok",user: user})
        }
        else{
            return res.json({status: 'error', user:false})
        }
    })