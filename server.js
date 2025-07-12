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
            <meta charset="UTF-8">
            <title>Mensagem Recebida!</title>
            <style>
                body {
                    background: #1a0033;
                    color: #00ff00;
                    font-family: 'Courier New', monospace;
                    text-align: center;
                    padding: 50px;
                    min-height: 100vh;
                }
                h1 { 
                    font-size: 2.5em; 
                    text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
                    margin-bottom: 30px;
                }
                p { 
                    font-size: 1.2em; 
                    color: #cccccc; 
                    margin: 20px 0; 
                }
                strong { 
                    color: #00ff00; 
                    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5); 
                }
                em {
                    color: #cccccc;
                    font-style: italic;
                }
                a {
                    color: #00ff00;
                    background: rgba(26, 0, 51, 0.8);
                    padding: 12px 25px;
                    border-radius: 25px;
                    border: 2px solid rgba(0, 255, 0, 0.5);
                    text-decoration: none;
                    display: inline-block;
                    margin-top: 30px;
                    transition: all 0.3s ease;
                    font-family: 'Courier New', monospace;
                    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
                }
                a:hover {
                    background: rgba(153, 0, 255, 0.4);
                    color: #9900ff;
                    border-color: #9900ff;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(153, 0, 255, 0.4);
                }
            </style>
        </head>
        <body>
            <h1>Obrigado por seu contato, ${nome}!</h1>
            <p>Sua mensagem sobre "<strong>${assunto}</strong>" foi recebida com sucesso.</p>
            <p>Responderemos em breve no e-mail: <strong>${email}</strong>.</p>
            <p><em>Sua mensagem: ${mensagem}</em></p>
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

    const paginaAgradecimento = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Obrigado pela Sugestão!</title>
            <style>
                body {
                    background: #1a0033;
                    color: #00ff00;
                    font-family: 'Courier New', monospace;
                    text-align: center;
                    padding: 50px;
                    min-height: 100vh;
                }
                h1 { 
                    font-size: 2.5em; 
                    text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
                    margin-bottom: 30px;
                }
                p { 
                    font-size: 1.2em; 
                    color: #cccccc; 
                    margin: 20px 0; 
                }
                strong { 
                    color: #00ff00; 
                    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5); 
                }
                em {
                    color: #cccccc;
                    font-style: italic;
                }
                a {
                    color: #00ff00;
                    background: rgba(26, 0, 51, 0.8);
                    padding: 12px 25px;
                    border-radius: 25px;
                    border: 2px solid rgba(0, 255, 0, 0.5);
                    text-decoration: none;
                    display: inline-block;
                    margin-top: 30px;
                    transition: all 0.3s ease;
                    font-family: 'Courier New', monospace;
                    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
                }
                a:hover {
                    background: rgba(153, 0, 255, 0.4);
                    color: #9900ff;
                    border-color: #9900ff;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(153, 0, 255, 0.4);
                }
            </style>
        </head>
        <body>
            <h1>Sugestão Recebida!</h1>
            <p>Muito obrigado por sugerir o lanche "<strong>${nomeLanche}</strong>"!</p>
            <p>Analisaremos sua sugestão de ingredientes: <em>${ingredientesLanche}</em>.</p>
            <a href="/">Voltar para o Cardápio</a>
        </body>
        </html>
    `;

    res.status(200).send(paginaAgradecimento);
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});