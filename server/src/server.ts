import express, { response } from 'express';

const app = express();

app.get('/games', (req, res) => {
  return res.json([]);
});


app.post('/ads', (req, res) => {
  return res.status(201).json([]);
});

app.get('/games/:id/ads', (request, response) => {
  // const gameId = request.params.id;
  // return response.json(gameId);
  return response.json([
    {id: 1, name: "Anúncio 1"},
    {id: 2, name: "Anúncio 2"},
    {id: 3, name: "Anúncio 3"},
    {id: 4, name: "Anúncio 4"},
  ])
})

app.get('/ads/:id/discord', (request, response) => {
  const adId = request.params.id;
  return response.json([adId]);
})

app.listen(3333)