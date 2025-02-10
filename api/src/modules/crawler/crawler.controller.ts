import { Controller, Get, Query } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get()
  async crawl(@Query('url') url: string) {
    if (!url) {
      return { error: 'Por favor, forneça uma URL válida' };
    }
    return this.crawlerService.crawl(url);
  }

  @Get('index')
  getAllIndexedPages() {
    return this.crawlerService.getAllIndexedPages();
  }

  @Get('search')
  searchByTitle(@Query('title') title: string) {
    if (!title) {
      return { error: 'Por favor, forneça um título para busca' };
    }
    return this.crawlerService.searchByTitle(title);
  }
}
