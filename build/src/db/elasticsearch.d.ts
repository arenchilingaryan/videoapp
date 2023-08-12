import { Client } from '@elastic/elasticsearch';
export declare class ElasticSearch {
    elasticsearch: Client;
    constructor();
    indexSearchQuery(query: string): Promise<void>;
    indexMovies(movies: any[]): Promise<void>;
    search(query: string, index?: string, fields?: string[]): Promise<import("@elastic/elasticsearch/lib/api/types").SearchHit<import("node-themoviedb").Objects.Movie>[]>;
    searchByIds(videoIds: string[], index?: string): Promise<import("@elastic/elasticsearch/lib/api/types").SearchHit<import("node-themoviedb").Objects.Movie>[]>;
}
