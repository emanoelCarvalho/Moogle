export class TreeNode {
    url: string; 
    title: string;
    links: string[];
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(url: string, title: string, links: string[]) {
        this.url = url; 
        this.title = title;
        this.links = links;
        this.left = null;
        this.right = null;
    }
}