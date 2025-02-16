import { Injectable } from '@nestjs/common';
import { TreeService } from '../tree/tree.service';
import { IndexerService } from '../indexer/indexer.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly treeService: TreeService,
    private readonly indexerService: IndexerService,
  ) {}

  async searchByKeyword(term: string) {
    return this.indexerService.search(term);
  }

  async getAllIndexedPages() {
    return this.treeService.getAll();
  }

  async getAllIndexedTerms() {
    return this.indexerService.getAll();
  }

  async searchByTitle(title: string) {
    return this.treeService.getByTitle(title);
  }

}
