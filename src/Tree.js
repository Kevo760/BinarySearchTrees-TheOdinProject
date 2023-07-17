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
        rootNode= Nodes(data)
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
    let currentNode = root

    while(currentNode !== null) {
      if(currentNode.data > value) {
        currentNode = currentNode.left
      } else if(currentNode.data < value) {
        currentNode = currentNode.right
      } else if(currentNode.data === value) {
        return console.log(currentNode)
      }
    }

    if(currentNode === null) {
      return console.log('Node does not exist')
    } 
  }

    const returnLog = () => {
      console.log(root)
    }

    return{
      buildTree,
      prettyPrint,
      insert,
      deleteNode,
      find,
      returnLog
    }
  }