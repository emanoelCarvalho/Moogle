import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { TreeService } from '../tree/tree.service';
import { IndexerService } from '../indexer/indexer.service';

@Injectable()
export class CrawlerService {
  constructor(
    private readonly treeService: TreeService,
    private readonly indexerService: IndexerService,
  ) {}

  async crawl(url: string) {
    try {
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });

      const $ = cheerio.load(data);
      const title = $('title').text();
      const links: string[] = [];

      $('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href && href.startsWith('http')) {
          links.push(href);
        }
      });

      const textContent = $('body').text();
      const words = this.extractKeywords(textContent);

      this.treeService.insert(url, title, links);

      words.forEach((word) => this.indexerService.insert(word, url));

      return { url, title, links, words };
    } catch (error) {
      console.error('Erro no crawler:', error.message);
      return { error: 'Erro ao processar a URL' };
    }
  }

  private extractKeywords(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(/\s+/) 
      .filter((word) => word.length > 3); 
  }

  getAllIndexedPages() {
    return this.treeService.getAll();
  }

  searchByTitle(title: string) {
    return this.treeService.search(title);
  }

  searchByKeyword(term: string) {
    return this.indexerService.search(term);
  }

  getAllIndexedTerms() {
    return this.indexerService.getAll();
  }
}
