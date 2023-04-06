const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET = 'VYyvuC%$esF';
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
const users = require('./db.json').users;

app.get('/users', (req, res) => {
  res.send(users);
});

app.get('/users/:id', (req, res) => {
  const id =+ req.params.id;
  const user = users.find(u => u.id === id);
  if (user) {
    return res.send(user);
  }
  res.status(404).json({ message: 'Usuário não encontrado.' });
});

// Rota para criar um usuário
app.post('/users', (req, res) => {
  const { nome, email, senha } = req.body;
  const id = users.length + 1;
  const newUser = { id, nome, email, senha };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Rota para atualizar um usuário
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }
  const { nome, email, senha } = req.body;
  users[userIndex] = { id: parseInt(id), nome, email, senha };
  res.json(users[userIndex]);
});

// Rota para remover um usuário
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }
  const user = users[userIndex];
  users.splice(userIndex, 1);
  res.json(user);
});



// Middleware para verificação de token
function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'Token não informado.' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
    }

    // se tudo estiver correto, salva o userId na requisição para uso posterior
    req.userId = decoded.userId;
    next();
  });
}

// Rota para login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = users.find(u => u.email === email);
    if (user && user.senha === senha) {
      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: 300 });
      return res.json({ auth: true, token });
    }
    res.status(401).json({ message: 'Usuário não encontrado ou senha incorreta.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
});

// Rota protegida com autenticação
app.get('/admin', verifyToken, (req, res) => {
  // aqui você pode acessar req.userId e obter informações do usuário
  res.status(200).json({ auth: true, message: 'Usuário autenticado.', users });
});


app.listen(3001, () => console.log('Servidor rodando na porta 3001.'));
