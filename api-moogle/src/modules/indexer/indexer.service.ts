import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from 'src/entities/keyword.entity';
import { Page } from 'src/entities/page.entity';
@Injectable()
export class IndexerService {
  constructor(
    @InjectRepository(Keyword)
    private keywordRepository: Repository<Keyword>,

    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
  ) {}

  async insert(term: string, url: string) {
    term = term.toLowerCase(); // Normalizar a chave

    let keyword = await this.keywordRepository.findOne({
      where: { term },
      relations: ['pages'],
    });

    if (!keyword) {
      keyword = this.keywordRepository.create({ term, pages: [] });
    }

    let page = await this.pageRepository.findOne({ where: { url } });

    if (!page) {
      page = this.pageRepository.create({ url });
      await this.pageRepository.save(page);
    }

    if (!keyword.pages.some(p => p.id === page.id)) {
      keyword.pages.push(page);
      await this.keywordRepository.save(keyword);
    }
  }

  async search(term: string): Promise<string[]> {
    term = term.toLowerCase();

    const keyword = await this.keywordRepository.findOne({
      where: { term },
      relations: ['pages'],
    });

    return keyword ? keyword.pages.map(page => page.url) : [];
  }

  async getAll(): Promise<{ term: string; urls: string[] }[]> {
    const keywords = await this.keywordRepository.find({ relations: ['pages'] });

    return keywords.map(keyword => ({
      term: keyword.term,
      urls: keyword.pages.map(page => page.url),
    }));
  }
}
