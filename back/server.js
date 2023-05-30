const express = require("express");
const mysql = require("mysql2")
const cors = require('cors')  

const bcrypt = require('bcryptjs')  
const jwt = require('jsonwebtoken')

const { eAdmin } = require('./middlewares/auth')
const User = require('./models/User');
const Peso = require('./models/Peso')
const Pressao = require('./models/Pressao');
const Imc = require("./models/Imc");

const app = express()
app.use(cors())
app.use(express.json())


const db = mysql.createPool({
    host:"localhost",
    user:"jonathan",
    password:"90351222",
    database:"testes"
});


app.get('/', eAdmin, async (req,res) => {
    await User.findAll({
        attributes:['id','name','email',],
        order:[['id','DESC']],
    }).then((users) =>{
        return res.json({
            erro:false,
            users,
            id_usuario_logado:req.userId
        })
    }).catch(() => {
        return res.json({
            erro:true,
            messagem:"Usuario nao encontrado!"
        })
    })

    
});

app.post('/cadastrar', async (req,res) =>{
    let dados = req.body
    // $2a$08$/3UUbh2nUoC/JnTtJy4aBOX5rSenSIQrhy3sGiIXRyvXsWDKDHsQG
    dados.password = await bcrypt.hash(dados.password,8);

    await User.create(dados)
    .then(() => {
        return res.json({
            erro:false,
            messagem:"Usuario cadastrado com sucesso!",
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro:true,
            messagem:"ERROR:Usuario já cadastrado!"
        })
    })
    return
});

app.post('/login', async (req,res) =>{
    const user = await User.findOne({
        attributes:['id','name','email','password','data_age'],
        where:{
            email: req.body.email
        }
    });

    if(user === null){
        return res.status(400).json({
            erro:true,
            messagem:"Error: Usuario ou senha incorreta!"
        })
    }


    if(!(await bcrypt.compare(req.body.password,user.password))){
        return res.status(400).json({
            erro:true,
            messagem:"Error: Usuario ou senha incorreta!"
        })
    }

    const  token = jwt.sign({id:user.id},"T3J8K1C9A5N686DSCTQ97", {
        // expiresIn: 600 // 10 min
        // expiresIn: 60 // 1 min
        expiresIn: '7d' // 7 dias
    })

    const id = user.id

    return res.json({
        erro:false,
        messagem:"Login realizado com sucesso!",
        token,
        id
    })
});

app.get('/search/:id', eAdmin, async (req,res) => {
    const id = req.params
    const user =  await User.findAll({
        attributes:["name","email","id","altura","password","img"],
        where:{
            id:id.id
        }
    }).then((result) =>{
        return res.json({
            erro:false,
            result
        })
    }).catch(() => {
        return res.json({
            erro:true,
            messagem:"Usuario nao encontrado!"
        })
    })
});

app.post('/cadastrarPeso', async (req,res) =>{
    let dados = req.body

    await Peso.create(dados)
    .then(() => {
        return res.json({
            erro:false,
            messagem:"Peso cadastrado com sucesso!",
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro:true,
            messagem:"ERROR:Peso nao cadastrado!"
        })
    })
    return
});

app.post('/cadastrarPressao', async (req,res) => {
    let dados = req.body

    await Pressao.create(dados)
    .then(() => {
        return res.json({
            erro:false,
            messagem:"Peso cadastrado com sucesso!",
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro:true,
            messagem:"ERROR:Peso nao cadastrado!"
        })
    })
    return
})

app.get('/search/weight/:id',async (req,res) => {
    const id = req.params;
    await Peso.findAll({
        attributes:["peso","data_age","id","idUser"],
        where:{
            idUser:id.id
        }
    }).then((result) =>{
        return res.json({
            erro:false,
            result
        })
    }).catch(() => {
        return res.json({
            erro:true,
            messagem:"Peso do usuario nao encontrado!"
        })
    })
});

app.get('/search/pressure/:id',async (req,res) => {
    const id = req.params;
    await Pressao.findAll({
        attributes:["pressao","data_age","id","idUser"],
        where:{
            idUser:id.id
        }
    }).then((result) =>{
        return res.json({
            erro:false,
            result
        })
    }).catch(() => {
        return res.json({
            erro:true,
            messagem:"Peso do usuario nao encontrado!"
        })
    })
});

app.post('/setImgUser/:id',async (req,res) => {
    let id = req.params
    let img = req.body
    await User.update(
        {img:img.img},
        {where:{
            id:id.id
        }}
    ).then(() => {
        return res.json({
            erro:false,
            messagem:"foto cadastrado com sucesso!",
        })
    })
    .catch((e) => {
        return res.status(400).json({
            erro:true,
            messagem:"ERROR:foto nao cadastrada!    ERROR:" + e,
        })
    })
    return
})
app.get('/search/img/:id',async (req,res) => {
    const id = req.params

    await User.findAll({
        attributes:["id","img"],
        where:{
            id:id.id
        }
    }).then((result) =>{
        return res.json({
            erro:false,
            result
        })
    }).catch(() => {
        return res.json({
            erro:true,
            messagem:"foto de usuario nao encontrada!"
        })
    })
})

app.post('/cadastrarImc', async (req,res) => {
 let dados = req.body

 await Imc.create(dados)
    .then(() => {
        return res.json({
            erro:false,
            messagem:" imc cadastrado com sucesso!",
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro:true,
            messagem:"ERROR: imc nao cadastrado!"
        })
    })
    return
})
app.get('/search/imc/:id',async (req,res) => {
    const id = req.params;
    await Imc.findAll({
        attributes:["imc","data_age","id","idUser","categoria"],
        where:{
            idUser:id.id
        }
    }).then((result) =>{
        return res.json({
            erro:false,
            result
        })
    }).catch(() => {
        return res.json({
            erro:true,
            messagem:"imc do usuario nao encontrado!"
        })
    })
});
app.listen(3001,'192.168.0.8', ()=>{console.log("Serve rodando na porta 3001.")})