export class IndexNode {
    term: string;
    urls: Set<string>;
    left: IndexNode | null;
    right: IndexNode | null;
  
    constructor(term: string, url: string) {
      this.term = term;
      this.urls = new Set([url]);
      this.left = null;
      this.right = null;
    }
  }
  