import { Nodes } from "./Nodes"

export const Tree = () => {
    let root = null

    const removeDupes = (array) => {
        let newArr = []
        let foundDupe = false
        for(let i = 0; i < array.length; i++) {
          foundDupe = false
          for(let j = 0; j < array.length; j++) {
            if(array[i] === newArr[j]) {
              foundDupe = true
            }
          }
          if(!foundDupe) {
            newArr.push(array[i])
          }
        }
        return newArr
    }

    const sortArr = (array) => {
        let arr = array
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < (arr.length - i - 1); j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }
        return arr
    }

    const balanceSearchTree = (array, start, end) => {
      // Once start data is greater than end return last node to null
      if(start > end) return null
      // finds the middle array
      let mid = parseInt((start + end) / 2)
      let newNode = Nodes(array[mid])
      // loops through until start is bigger than end on the left tree
      newNode.left = balanceSearchTree(array, start, mid - 1)
      // loops through until start is bigger than end on the right tree
      newNode.right = balanceSearchTree(array, mid + 1, end)
      return newNode
    }

    const buildTree = (array) => {
        const data = array
        // sorts array data
        const sortData = sortArr(data)
        // removes dupelicates
        const removeDupedata = removeDupes(sortData)
        // set sortData array into a balanced search tree
        root = balanceSearchTree(removeDupedata, 0, removeDupedata.length - 1)
    }

    const prettyPrint = (node = root, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }

    const insert = (data) => {
      root = insertRecursion(root, data)
    }

    const insertRecursion = (rootNode, data) => {
      // If root data is null set root to data
      if(rootNode === null) {
        rootNode = Nodes(data)
        return rootNode
      }
      // If data is less than root data pass insertRecursion on root left
      if(data < rootNode.data) {
        rootNode.left = insertRecursion(rootNode.left, data)
        // If data is greater than root data pass insertRecursion on root right
      } else if(data > rootNode.data) {
        rootNode.right = insertRecursion(rootNode.right, data)
      }

      // Return root data
      return rootNode;
    }

    const deleteNode = (data, rootNode = root) => {
      // if rootNode is null return rootNode
      if(rootNode === null) return rootNode

      // If rootNode is greater than data rerun deleteNode to the left 
      if(data < rootNode.data) {
        rootNode.left = deleteNode(data, rootNode.left)
        return rootNode
        // If rootNode is less than data rerun deleteNode to the right 
      } else if(data > rootNode.data) {
        rootNode.right = deleteNode(data, rootNode.right)
        return rootNode
      }
      // If the current matching node right and left node is null delete current node
      if(rootNode.left === null && rootNode.right === null) {
        rootNode = null
        return rootNode
        // When one child is empty set the other side as the currentNode
      } else if(rootNode.left === null) {
        rootNode = rootNode.right
        return rootNode
      } else if(rootNode.right === null) {
        rootNode = rootNode.left
        return rootNode
        // If both child exist
      } else {
        let parentSucc = rootNode
        // pass current nodes right node to as the successor
        let successor = rootNode.right
        // Go through the left nodes and find the successor of the furthest left node
        while(successor.left !== null) {
          parentSucc = successor
          successor = successor.left
        }
        // Once finding the far left node set that value to the node you are deleting 
        // and set the successor node to null
        rootNode.data = successor.data
        parentSucc.left = null
        return rootNode
      }
    }

    const find = (value) => {
    // Pass root value on currentNode
    let currentNode = root
    // While currentNode is not null
    while(currentNode !== null) {
      // If currentNode data is higher than value, set currentNode to currentNode.left
      if(currentNode.data > value) {
        currentNode = currentNode.left
        // If currentNode data is less than value, set currentNode to currentNode.right
      } else if(currentNode.data < value) {
        currentNode = currentNode.right
        // If currentNode data matches value console.log currentNode
      } else if(currentNode.data === value) {
        return console.log(currentNode)
      }
    }
    // If currentNode is null, Node does not exist
    if(currentNode === null) {
      return console.log('Node does not exist')
    } 
  }

  const minHeight = (node = root) => {
    // If node is null return -1
    if(node === null) return -1
  
    // Go through the left and right side of the node
    let leftSide = minHeight(node.left)
    let rightSide = minHeight(node.right)
    // If rightSide is greater return rightSide value + 1 else return leftSide + 1
    if(leftSide < rightSide) {
      return leftSide + 1
    } else {
      return rightSide + 1
    }
  }

  const maxHeight = (node = root) => {
    // if node is null return -1
    if(node === null) return -1
    // Pass through both right and left maxHeight
    let leftSide = maxHeight(node.left)
    let rightSide = maxHeight(node.right)
    // If leftSide is greater than right return leftSide else return rightSide
    if(leftSide > rightSide) {
      return leftSide + 1
    } else {
      return rightSide + 1
    }
  }

  // return true if minHeight and maxHeight are 1 height difference
  const isBalanced = () => {
    return minHeight >= maxHeight -1
  }

  // Gets the most left most node then right
  const inOrder = () => {
    if(root === null) {
      return null
    } else {
      let newArr = []

      const inOrderNodes = (node) => {
        node.left && inOrderNodes(node.left)
        newArr.push(node.data)
        node.right && inOrderNodes(node.right)
      }

      inOrderNodes(root)
      return newArr
    }

  }

  // Gets the roots nodes first
  const preOrder = () => {
    if(root === null) {
      return null
    } else {
      let newArr = []

      const preOrderNodes = (node) => {
        preOrderNodes.push(node.data)
        node.left && preOrderNodes(node.left)
        node.right && preOrderNodes(node.right)
      }
      preOrderNodes(root)
      return newArr
    }
  }

  // Gets the leaf nodes first to the left side of the tree then left nodes to the right
  const postOrder = () => {
    if(root === null) {
      return null
    } else {
      let newArr = []

      const postOrderNodes = (node) => {
        node.left && postOrderNodes(node.left)
        node.right && postOrderNodes(node.right)
        newArr.push(node.data)
      }
      postOrderNodes(root)
      return newArr
    }
  }
  // Gets the nodes by level 
  const levelOrder = () => {
    let newArr = []
    let queue = []

    if(root != null) {
      queue.push(root)
      while(queue.length > 0) {
        let node = queue.shift()
        newArr.push(node.data)
        if(node.left != null) {
          queue.push(node.left)
        }
        if(node.right != null) {
          queue.push(node.right)
        }
      }
      return newArr
    } else {
      return null
    }
  }

  const findDepth = (node = root, value) => {
      if(root === null) return -1

      let distance = -1

      if((root.data === value) ||

      (distance = findDepth(root.left, value)) >= 0 ||

      (distance = findDepth(root.right, value)) >= 0)
      return distance + 1

    return distance
  }

    return{
      buildTree,
      prettyPrint,
      insert,
      deleteNode,
      find,
      minHeight,
      maxHeight,
      isBalanced,
    }
  }