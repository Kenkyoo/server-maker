// server.js
const express = require('express');
const axios = require('axios').default;
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Middleware para manejar JSON en el body

app.get('/get', async (req, res) => {
    try {
        const response = await axios.get('https://api.imgflip.com/get_memes');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las plantillas de memes');
    }
});

app.post('/caption', async (req, res) => {
    const { id, text0, text1, fontSize, font, username, password } = req.body;
    try {
        const response = await axios.post('https://api.imgflip.com/caption_image', null, {
            params: {
                template_id: id,
                text0: text0,
                text1: text1,
                max_font_size: fontSize,
                font: font,
                username: username, 
                password: password
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el meme');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
