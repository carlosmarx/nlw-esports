import express, { response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHoursStringToMinutes } from './utils/convert-hours-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/games', async (req, res) => {

  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {ads: true}
      }
    }
  });

  return res.json(games);
});


app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHoursStringToMinutes(body.hourStart),
      hourEnd: convertHoursStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return res.status(201).json(ad);
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      yearsPlaying: true,
      useVoiceChannel: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId
    },
    orderBy: { createdAt: 'desc' }
  });
  return response.json(ads.map(ad => {

    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  }))
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: { id: adId}
  })

  return response.json({
    discord: ad.discord
  });
})

app.listen(3333)