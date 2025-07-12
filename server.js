const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.static('views')); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


//-------------------------lanches-----------------------// Rota para retornar a lista de lanches
// Usamos fs para ler o arquivo JSON e enviar os dados como resposta
app.get('/api/lanches', (req, res) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const caminho = path.join(__dirname, 'public', 'data', 'lanches.json');
        const dados = fs.readFileSync(caminho, 'utf8');
        const lanches = JSON.parse(dados);
        
        res.status(200).json(lanches);
    } catch (error) {
        console.error('Erro ao ler arquivo:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});
//-------------------------index-----------------------
// Rota para servir a página inicial

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//-----------------------contato-----------------------
// Rota para receber o formulário de contato

app.get('/contato', (req, res) => {
    res.sendFile(__dirname + '/views/contato.html');
});

app.post('/contato', (req, res) => {
    console.log('📝 Formulário de contato recebido!');
    console.log('Corpo da requisição (payload):', req.body);

    
    const { nome, email, assunto, mensagem } = req.body;

    const paginaConfirmacao = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <title>Mensagem Recebida!</title>
        </head>
        <body>
            <h1>Obrigado por seu contato, ${nome}!</h1>
            <p>Sua mensagem sobre "<strong>${assunto}</strong>" foi recebida com sucesso.</p>
            <p>Responderemos em breve no e-mail: ${email}.</p>
            <hr>
            <p><em>Sua mensagem: ${mensagem}</em></p>
            <br>
            <a href="/">Voltar ao Cardápio</a>
        </body>
        </html>
    `;

    res.status(200).send(paginaConfirmacao);
});

//-----------------------sugestao-----------------------
// Rota para receber sugestões de lanches

app.get('/sugestao', (req, res) => {
    console.log('🎯 Rota /sugestao foi chamada!');
    console.log('Query params:', req.query);
   
    const nomeLanche = req.query.nome;
    const ingredientesLanche = req.query.ingredientes;

    const paginaAgradecimento =
     `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Obrigado pela Sugestão!</title>
        </head>
        <body>
            <h1>Sugestão Recebida!</h1>
            <p>Muito obrigado por sugerir o lanche "<strong>${nomeLanche}</strong>"!</p>
            <p>Analisaremos sua sugestão de ingredientes: <em>${ingredientesLanche}</em>.</p>
            <br>
            <a href="/">Voltar para o Cardápio</a>
        </body>
        </html>
    `;

    
    res.status(200).send(paginaAgradecimento);
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});