import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('by-title')
  searchByTitle(@Query('title') title: string) {
    if (!title) {
      return { error: 'Por favor, forneça um título para busca' };
    }
    return this.searchService.searchByTitle(title);
  }

  @Get('by-keyword')
  searchByKeyword(@Query('term') term: string) {
    if (!term) {
      return { error: 'Por favor, forneça um termo para busca' };
    }
    return this.searchService.searchByKeyword(term);
  }

  @Get('all-pages')
  getAllIndexedPages() {
    return this.searchService.getAllIndexedPages();
  }

  @Get('indexed-terms')
  getAllIndexedTerms() {
    return this.searchService.getAllIndexedTerms();
  }
}
