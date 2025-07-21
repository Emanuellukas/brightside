import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';

import { createCompletion } from './plugins/openai.js';

const app = express();

app.use(cors())
app.use(express.json());

app.post('/api/filter-good-news', async (req, res) => {
    const payload = req.body;
    let completion = await createCompletion(payload.content)

    try {
        const filePath = path.join('api', 'good_news.json');
        
        // Salva o resultado da requisição no arquivo .json
        // Verifica se 'completion' está definido antes de salvar
        if (completion !== undefined && completion !== null) {
            fs.writeFileSync(filePath, JSON.stringify(completion, null, 2), 'utf8');
        } else {
            console.error('completion está indefinido ou nulo, não foi possível salvar no arquivo.');
        }
        console.log('Resultado salvo em', filePath);
    } catch (err) {
        console.error('Erro ao salvar o resultado:', err);
    }
    res.json({completion})
})

app.listen('4567')