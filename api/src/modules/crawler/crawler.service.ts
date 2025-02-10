import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { TreeService } from '../tree/tree.service';

@Injectable()
export class CrawlerService {
  constructor(private readonly treeService: TreeService) {}

  async crawl(url: string) {
    try {
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });

      const $ = cheerio.load(data);

      const title = $('title').text();

      let links: string[] = [];

      $('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href && href.startsWith('http')) {
          links = [...links, href];
        }
      });

      this.treeService.insert(url, title, links);

      return { url, title, links };
    } catch (error) {
      console.error('Erro ao fazer crawling:', error.message);
      return { error: 'Erro ao processar a URL. Verifique se está acessível.' };
    }
  }

  getAllIndexedPages() {
    return this.treeService.getAll();
  }

  searchByTitle(title: string) {
    return this.treeService.search(title);
  }
}
