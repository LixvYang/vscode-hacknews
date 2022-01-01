import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { ITopStoriesArticle } from '../target/topStories';
import { BaseAPI, TopStoriesAPI } from '../const/URL';

export class TopStories {
  public static async getTopStories(articleLimit = 30, timeout = 30 * 1000):Promise<ITopStoriesArticle[]> {
    const http = axios.create({
      timeout,
      baseURL: BaseAPI,
    });

    let articles: ITopStoriesArticle[] = [];
    try {
      const topStorisResponse: AxiosResponse = await axios.get(TopStoriesAPI)
      const articleIds: number[] = 
        topStorisResponse.data.length > articleLimit ? topStorisResponse.data.splice(0, articleLimit) : topStorisResponse.data;

      const articleRequests: AxiosPromise[] = articleIds.map(articleId => {
        return http.get(`item/${articleId}.json`);
      });

      const articleResponse = await Promise.all<AxiosResponse>(articleRequests);
      articles = articleResponse.map(article => {
        return article.data
      });

      return Promise.resolve(articles);
    } catch(e) {
      throw new Error('Failed to retrieve Hacker News articles');
    }
  } 
}