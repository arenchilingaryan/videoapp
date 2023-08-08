"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIndex = void 0;
const db_1 = require("../db");
const handleIndex = async () => {
    const indexDefinition = {
        index: 'movies',
        body: {
            mappings: {
                properties: {
                    vote_average: {
                        type: 'double',
                    },
                },
            },
        },
    };
    try {
        await db_1.elasticsearch.indices.delete({ index: 'movies' });
        const resp = await db_1.elasticsearch.indices.create(indexDefinition);
        console.log(resp);
    }
    catch (err) {
        console.log(err);
    }
};
exports.handleIndex = handleIndex;
//# sourceMappingURL=reCreateIndex.js.map