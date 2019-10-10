export class TreeNode {
    title: string;
    value: string;
    key: string;
    children: TreeNode;

    constructor(title, value, key, children = null) {
        this.title = title;
        this.value = value;
        this.key = key;
        this.children = children;
    }
}
