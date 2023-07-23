const { Tree } = require("./Tree");

const newTree = Tree()

describe('Test functions of the Binary Search Tree', () => {
    test('Tree root should return null when passing levelOrder to check values of the tree', () => {
        expect(newTree.levelOrder()).toBe(null)
    })

    test('BuildTree Function: passes the randomArray which sorts it, remove duplicates, and creates a balancedSearchTree node. levelOrder should return an array of  [2, 4, 6, 8, 10] ' , () =>{
        const randomArray = [6, 6, 4, 8, 2, 2, 10, 10]
        const newTree1 = Tree()
        newTree1.buildTree(randomArray)

        const expectedArr = [6, 2, 8, 4, 10]

        expect(newTree1.levelOrder()).toStrictEqual(expectedArr)
    })

    test('Insert Function: If root is null put the  value pass in insert as the root node', () => {
        const newTree2 = Tree()
        newTree2.insert(1)
        const expectedArr = [1]

        expect(newTree2.levelOrder()).toStrictEqual(expectedArr)
    })

    test('Insert Function: Sets 6 in the top of the tree, inserts 3 to the left of the tree and insierts 9 to the right ', () => {
        const newTree2 = Tree()
        newTree2.insert(6)
        newTree2.insert(3)
        newTree2.insert(9)
        const expectedArr = [6, 3, 9]

        expect(newTree2.levelOrder()).toStrictEqual(expectedArr)
    })

    test('DeleteNode Function: Deletes a node from the tree', () => {
        const newTree2 = Tree()
        newTree2.insert(6)
        newTree2.insert(3)
        newTree2.insert(9)
        newTree2.insert(5)
        newTree2.insert(1)

        newTree2.deleteNode(5)
        const expectedArr = [6, 3, 9, 1]

        expect(newTree2.levelOrder()).toStrictEqual(expectedArr)
    })

    test('Find Function: Finds the node and returns the node', () => {
        const newTree1 = Tree()
        newTree1.insert(6)
        newTree1.insert(3)
        newTree1.insert(9)
        newTree1.insert(5)
        newTree1.insert(1)

        const expectedNode = {
            'data': 3,
            'left': {
                'data': 1,
                'left': null,
                'right': null
            },
            'right': {
                'data': 5,
                'left': null,
                'right': null
            }
        }

        expect(newTree1.find(3)).toStrictEqual(expectedNode)
    })

    test('MinHeight Function: Finds the minimum height of the tree by looking for a node with only 1 child', () => {
        const newTree = Tree()
        newTree.insert(6)
        newTree.insert(3)
        newTree.insert(9)
        newTree.insert(5)
        newTree.insert(1)
        newTree.insert(10)

        // Min height should be 1 due to 9 node only having 1 child
        expect(newTree.minHeight()).toBe(1)
    })

    test('MaxHeight Function: Finds the maximum height of the tree by looking for the farthest leftNode', () => {
        const newTree = Tree()
        newTree.insert(6)
        newTree.insert(3)
        newTree.insert(9)
        newTree.insert(5)
        newTree.insert(1)
        newTree.insert(10)

        // Max height should be 2 due to 5 and 1 node being the deepest leaf node
        expect(newTree.maxHeight()).toBe(2)
    })

    test('isBalanced Function: Returns true since the difference of the min and max height is 1', () => {
        const newTree = Tree()
        newTree.insert(6)
        newTree.insert(3)
        newTree.insert(9)
        newTree.insert(5)
        newTree.insert(1)
        newTree.insert(10)

        expect(newTree.isBalanced()).toBeTruthy()
    })

    test('InOrder Function: Gets the left leaf nodes first then the right side of the tree', () => {
        const newTree = Tree()
        newTree.insert(6)
        newTree.insert(3)
        newTree.insert(9)
        newTree.insert(5)
        newTree.insert(1)
        newTree.insert(10)

        const expectedArr = [1, 3, 5, 6, 9, 10]
        expect(newTree.inOrder()).toStrictEqual(expectedArr)
    })

    test('PreOrder Function: Gets the roots nodes first then to the left node', () => {
        const newTree = Tree()
        newTree.insert(6)
        newTree.insert(3)
        newTree.insert(9)
        newTree.insert(5)
        newTree.insert(1)
        newTree.insert(10)

        const expectedArr = [6, 3, 1, 5, 9, 10]
        expect(newTree.preOrder()).toStrictEqual(expectedArr)
    })

    test('postOrder Function: Gets the left leaf nodes first then the right side of the tree', () => {
        const newTree = Tree()
        newTree.insert(6)
        newTree.insert(3)
        newTree.insert(9)
        newTree.insert(5)
        newTree.insert(1)
        newTree.insert(10)

        const expectedArr = [1, 5, 3, 10, 9, 6]
        expect(newTree.postOrder()).toStrictEqual(expectedArr)
    })

    test('levelOrder Function: Gets the value of the node that is top layer first then bottom into an array', () => {
        const newTree = Tree()
        newTree.insert(6)
        newTree.insert(3)
        newTree.insert(9)
        newTree.insert(5)
        newTree.insert(1)
        newTree.insert(10)

        const expectedArr = [6, 3, 9, 1, 5, 10]
        expect(newTree.levelOrder()).toStrictEqual(expectedArr)
    })

    test('FindDepth Function: Finds the depth of the node based on the value that is passed', () => {
        const newTree = Tree()
        newTree.insert(6)
        newTree.insert(3)
        newTree.insert(9)
        newTree.insert(5)
        newTree.insert(1)
        newTree.insert(10)

        expect(newTree.findDepth(3)).toBe(1)
    })

    test('Rebalance Function: Rebalances a tree if the tree min and max height difference is 2 or more', () => {
        const newTree = Tree()
        newTree.insert(6)
        newTree.insert(3)
        newTree.insert(9)
        newTree.insert(5)
        newTree.insert(1)
        newTree.insert(10)
        newTree.insert(4)
        newTree.rebalance()

        const expectedArr = [5, 3, 9, 1, 4, 6, 10]

        expect(newTree.levelOrder()).toStrictEqual(expectedArr)
    })

})