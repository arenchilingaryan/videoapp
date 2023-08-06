import { Request, Response } from 'express';
import * as TorrentSearchApi from 'torrent-search-api';

TorrentSearchApi.enableProvider('ThePirateBay');

export const watchRouter = async (req: Request, res: Response) => {
  const { title, videoId } = req.body;

  if (!title || !videoId) {
    return res.status(400).send('Title or videoId missing');
  }
  const redis = req.context.redis;
  const neo4jService = req.context.neo4j;
  const userId = req.context.userData.userId;

  const cacheKey = `torrents:${title}`;

  await neo4jService.createWatchedRelation(userId as string, videoId);

  let magnetUri: string;

  const cachedResult = await redis.get(cacheKey);

  if (cachedResult) {
    magnetUri = JSON.parse(cachedResult).magnet;
  } else {
    const searchResult = await TorrentSearchApi.search(title, 'Video', 1);

    if (searchResult && searchResult.length > 0) {
      magnetUri = searchResult[0].magnet;
      await redis.set(cacheKey, JSON.stringify(searchResult[0]), 'EX', 3600);
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
