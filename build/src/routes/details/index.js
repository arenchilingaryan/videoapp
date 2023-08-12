"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailsRouter = void 0;
const db_1 = require("../../db");
const detailsRouter = async (req, res) => {
    const videoId = req.query.id;
    const cacheKey = `videoDetails:${videoId}`;
    try {
        const cachedData = await db_1.db.redis.get(cacheKey);
        if (cachedData) {
            return res.json(cachedData);
        }
        const searchResult = await db_1.db.elasticsearch.searchByIds([
            videoId,
        ]);
        if (searchResult.length > 0) {
            const videoDetails = searchResult[0];
            await db_1.db.redis.set(cacheKey, videoDetails);
            return res.json(videoDetails);
        }
        else {
            return res.status(404).send('Video not found');
        }
    }
    catch (error) {
        return res.status(500).send('Failed to fetch video details');
    }
};
exports.detailsRouter = detailsRouter;
//# sourceMappingURL=index.js.map