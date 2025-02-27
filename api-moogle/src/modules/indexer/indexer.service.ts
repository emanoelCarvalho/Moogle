import { Injectable, OnModuleInit } from '@nestjs/common';
import { IndexNode } from './index-node';
import { DataLoaderService } from 'src/data-loader/data-loader.service';

@Injectable()
export class IndexerService implements OnModuleInit {
  private root: IndexNode | null = null;

  constructor(private readonly dataLoader: DataLoaderService) {}

  onModuleInit() {
    this.loadData();
  }

  private loadData() {
    const data = this.dataLoader.loadData();

    if (data.pages) {
      for (const page of data.pages) {
        for (const word of page.words) {
          this.insert(word, page.url);
        }
      }
    }
  }

  insert(term: string, url: string) {
    const lowerTerm = term.toLowerCase(); 
    this.root = this.insertNode(this.root, lowerTerm, url);
  }

  private insertNode(
    node: IndexNode | null,
    term: string,
    url: string,
  ): IndexNode {
    if (!node) return new IndexNode(term, url);

    if (term < node.term) {
      node.left = this.insertNode(node.left, term, url);
    } else if (term > node.term) {
      node.right = this.insertNode(node.right, term, url);
    } else {
      node.urls.add(url);
    }

    return node;
  }

  search(term: string): string[] {
    const lowerTerm = term.toLowerCase(); 
    const node = this.searchNode(this.root, lowerTerm);
    return node ? Array.from(node.urls) : [];
  }

  private searchNode(node: IndexNode | null, term: string): IndexNode | null {
    if (!node) return null;
    if (term === node.term) return node;

    return term < node.term
      ? this.searchNode(node.left, term)
      : this.searchNode(node.right, term);
  }

  getAll(): { term: string; urls: string[] }[] {
    const result: { term: string; urls: string[] }[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  private inOrderTraversal(
    node: IndexNode | null,
    result: { term: string; urls: string[] }[],
  ) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push({ term: node.term, urls: Array.from(node.urls) });
      this.inOrderTraversal(node.right, result);
    }
  }
}