import { Request, Response } from 'express';
import * as TorrentSearchApi from 'torrent-search-api';
import { db } from '../../db';

TorrentSearchApi.enableProvider('ThePirateBay');

export const watchRouter = async (req: Request, res: Response) => {
  const { title, videoId } = req.body;

  if (!title || !videoId) {
    return res.status(400).send('Title or videoId missing');
  }
  const userId = req.context.userData.userId;

  const cacheKey = `torrents:${title}`;

  await db.neo4j.createWatchedRelation(userId as string, videoId);

  let magnetUri: string;

  const cachedResult = await db.redis.get(cacheKey);

  if (cachedResult) {
    magnetUri = JSON.parse(cachedResult).magnet;
  } else {
    const searchResult = await TorrentSearchApi.search(title, 'Video', 1);

    if (searchResult && searchResult.length > 0) {
      magnetUri = searchResult[0].magnet;
      await db.redis.set(cacheKey, JSON.stringify(searchResult[0]), 3600);
    } else {
      return res.status(404).send('Torrent not found');
    }
  }

  return res.send(`
  <!DOCTYPE html>
  <html>
  <script src="https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js"></script>
  <script>
  var client = new WebTorrent()
  
  var magnetURI = '${magnetUri}'
  
  client.add(magnetURI, function (torrent) {
    torrent.on('ready', function () {
      var file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4')
      })
      
      file.appendTo('body')
    })
  })
  </script>
  </body>
  </html>
  `);
};
