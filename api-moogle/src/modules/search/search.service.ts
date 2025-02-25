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
    const resultado = this.indexerService.search(term);
    return resultado;
  }

  async getAllIndexedPages() {
    const resultado = this.treeService.getAll();
    return resultado;
  }

  async getAllIndexedTerms(url: string) {
    const resultado = this.indexerService.getAll();
    return resultado;
  }

  async searchByTitle(title: string) {
    const resultado = this.treeService.getByTitle(title);
    return resultado || { error: "Nenhum resultado encontrado" };
  }
}