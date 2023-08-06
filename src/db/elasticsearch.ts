import { Client } from '@elastic/elasticsearch';
import { envConfig } from '../config/envConfig';

const elasticsearch = new Client({
  node: `http://localhost:${envConfig.ES_PORT}`,
});

export { elasticsearch };
