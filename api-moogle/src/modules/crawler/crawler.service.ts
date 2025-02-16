import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { TreeService } from '../tree/tree.service';
import { IndexerService } from '../indexer/indexer.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CrawlerService {
  private readonly jsonServerUrl = 'http://localhost:3001';

  constructor(
    private readonly treeService: TreeService,
    private readonly indexerService: IndexerService,
    private readonly httpService: HttpService,
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

      const pageData = { url, title, links, words };

      await this.saveToJsonServer(pageData);
      return pageData;
    } catch (error) {
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

  async saveToJsonServer(pageData: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${this.jsonServerUrl}/pages`, pageData),
      );
      return response.data;
    } catch (error) {
      throw new Error('Erro ao salvar no JSON Server');
    }
  }
}