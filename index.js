const express = require("express")
const { engine } = require("express-handlebars");
const path = require('path')
const app = express()
const db = require('./db/connection')
const bodyParser = require('body-parser')
const Job = require('./models/Job')

// porta padrao
const PORT = 4000

//static folder
app.use(express.static(path.join(__dirname,'public')))



//body parser (pelo que entendi, serve para conseguir pegar os dados do corpo da requisição (req.body))
app.use(bodyParser.urlencoded({extended: false}))

//handle bars
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// conexao db
db.authenticate().then(() =>{
    console.log("Conectou ao BD")
}).catch(err =>{
    console.log("Ocorreu um erro ao se conectar",err)
})



// rodando o servidor na roda padrao
app.listen(PORT, function(){
    console.log(`Servidor rodando na porta ${PORT}`)
})

// rota inicial
app.get('/', (req,res)=>{

    Job.findAll({order:[  //ordena em ordem decrescente
        ['createdAt', 'desc']
    ]}).then(jobs =>{          //retorna uma promessa, dentro se a promessa for true ele renderiza a tela
        res.render("index", {
            jobs
        })
    })
   
})

//jobs routes

app.use('/jobs', require('./routes/jobs'))