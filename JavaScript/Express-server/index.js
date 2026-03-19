const express = require('express')
const path = require('path')
const fs = require('fs')


const app = express()

app.set('view engine', 'ejs')


// Configuração do express para arqiivos publicos
app.use(express.static(path.join(__dirname, 'public')))


//habilitar o sever receber dados via post
app.use(express.urlencoded({ extended: true }))

// rotas
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Digital Tech - Home'
  })
})

app.get('/posts', (rer, res) => {
  res.render('Posts', {
    title: 'Digital Tech - Posts',
    posts: [
      {
        title: 'Novidades no CSS',
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, at corporis repellendus officiis architecto laborum quam ad possimus veritatis minima, temporibus eaque aut provident, ex neque dolor! Ipsum, dolorem aliquam.',
        star: 3
      },
      {
        title: 'Nodejs',
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, at corporis repellendus officiis architecto laborum quam ad possimus veritatis minima, temporibus eaque aut provident, ex neque dolor! Ipsum, dolorem aliquam.',
      },
      {
        title: 'Javascript',
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, at corporis repellendus officiis architecto laborum quam ad possimus veritatis minima, temporibus eaque aut provident, ex neque dolor! Ipsum, dolorem aliquam.',
        star: 5
      }
    ]
  })
})


// cadastro de posts
app.get('/cadastros-posts', (req, res) => {
  const { c } = req.query
  res.render('cadastros-posts', {
    title: 'Cadastro de Posts',
    success: c
  })
})


// salado posts
app.post('/salvar-posts', (req, res) => {
  const {titulo, texto} = req.body

  const data = fs.readFileSync('./store/posts.json')
  const posts = JSON.parse(data)

  posts.push({
    titulo,
    texto,
  })

  const postsString = JSON.stringify(posts)
  fs.writeFileSync('./store/posts.json', postsString)

  res.redirect('/cadastros-posts?c=1')

})


// Erro 404 (not found)
app.use((req, res) => { // middleware
  res.send('404')
})



// execução do servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is running on port ${port}`))