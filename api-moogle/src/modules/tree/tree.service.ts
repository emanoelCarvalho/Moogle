import { Injectable, OnModuleInit } from '@nestjs/common';
import { TreeNode } from './tree-node';
import { DataLoaderService } from 'src/data-loader/data-loader.service';
@Injectable()
export class TreeService implements OnModuleInit {
  private root: TreeNode | null = null;

  constructor(private readonly dataLoader: DataLoaderService) {}

  onModuleInit() {
    this.loadData();
  }

  private loadData() {
    const data = this.dataLoader.loadData();
    data.pages.forEach((page: { url: string; title: string; links: string[] }) => {
      this.insert(page.url, page.title, page.links);
    });
  }

  insert(url: string, title: string, links: string[]) {
    const newNode = new TreeNode(url, title, links);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.title < node.title) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(title: string): TreeNode | null {
    return this.searchNode(this.root, title);
  }

  private searchNode(node: TreeNode | null, title: string): TreeNode | null {
    if (!node) return null;
    if (title === node.title) return node;

    return title < node.title
      ? this.searchNode(node.left, title)
      : this.searchNode(node.right, title);
  }

  getAll(): TreeNode[] {
    const result: TreeNode[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  private inOrderTraversal(node: TreeNode | null, result: TreeNode[]) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node);
      this.inOrderTraversal(node.right, result);
    }
  }

  getByTitle(title: string): TreeNode | null {
    return this.searchByTitle(title);
  }

  private searchByTitle(title: string): TreeNode | null {
    return this.searchNode(this.root, title);
  }
}
