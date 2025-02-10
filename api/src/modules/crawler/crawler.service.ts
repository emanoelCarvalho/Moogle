import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  async crawl(url: string) {
    try {
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' } 
      });

      const $ = cheerio.load(data);

      // Extrai o título da página
      const title = $('title').text();

      // Extrai os links da página
      const links: string[] = [];
      $('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href && href.startsWith('http')) {
          links.push(href);
        }
    });
    
    return { url, title, links };
    } catch (error) {
      console.error('Erro ao fazer crawling:', error.message);
      return { error: 'Erro ao processar a URL. Verifique se está acessível.' };
    }
  }
}
