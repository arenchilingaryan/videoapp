import { elasticsearch } from '../db';

export const handleIndex = async () => {
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
    await elasticsearch.indices.delete({ index: 'movies' });

    const resp = await elasticsearch.indices.create(indexDefinition);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};
