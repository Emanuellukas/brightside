import cors from 'cors';
import express from 'express';
import axios from 'axios';
import compendium from 'compendium-js'
import moment from 'moment';
import { config } from 'dotenv';

// import firebase, { collections } from './plugins/firebase.js';

const app = express();

const gnKey = process.env.GN_KEY
const gnUrl = process.env.GN_URL

// const gnKey = '864aff51218349fc8cd1841a15c4d1ec'
// const gnUrl = 'https://newsapi.org/v2/'

const today = moment().format('yyy-mm-dd');
const yesterday = moment().subtract(1, 'days').format('yyy-mm-dd');

const defaultParamsEverything = `apiKey=${gnKey}&language=en&from=${yesterday}&to=${today}`

app.use(cors())

app.get('/home', async (req, res) => {
    try {
        let { data } = await axios.get(gnUrl + 'top-headlines?sources=google-news-br&sortBy=relevancy&language=pt&apiKey=' + gnKey)
        res.json(data)
    } catch (error) { console.error(error) }
})

app.get('/brasil', async (req, res) => {
    try {
        let { data } = await axios.get(gnUrl + 'top-headlines?sources=google-news-br&sortBy=relevancy&language=pt&apiKey=' + gnKey)
        res.json(data)
    } catch (error) { console.error(error) }
})

app.get('/category', async (req, res) => {
    try {
        let { data } = await axios.get(gnUrl + `top-headlines?category=${req.query.category}&country=us&apiKey=` + gnKey)
        console.log(data)
        res.json(data)
    } catch (error) { console.error(error) }
})

app.get('/everything', async (req, res) => {
    try {
        let { data } = await axios.get(gnUrl + `everything?${defaultParamsEverything}&q=${req.query.q}`)
        res.json(data)
    } catch (error) { console.error(error) }
})

app.get('/analyse', (req, res) => {
    let analysed = compendium.analyse(req.query.content)
    console.log(analysed)
    res.json({analysed})
})

// app.post('/store-articles', async (req, res) => {
//     try {
//         let { data } = await collections.LatestArticles.add(req.body)
//         res.json({ msg: 'Funfou', ...data })
//     } catch (error) { console.error(error) }
// })

app.listen('4567')