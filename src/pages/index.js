import { Tree } from "@/Tree"

export default function Home() {
const arr = [10,2,80,1,6,8,9,20,24,27,1]

let newTree = Tree()
newTree.buildTree(arr)
newTree.deleteNode(20)
newTree.insert(70)
newTree.insert(90)
newTree.insert(95)
newTree.insert(93)
newTree.insert(78)
newTree.insert(65)
newTree.insert(85)
newTree.insert(83)
newTree.insert(86)
newTree.insert(84)
newTree.insert(81)
newTree.prettyPrint()
newTree.find(99)
newTree.find(70)
newTree.find(83)
newTree.find(1)
newTree.find(76)


  return (
    <>
    <button onClick={e => newTree.prettyPrint()}>Click me</button>
    <button onClick={e => newTree.deleteNode(1)}>Click</button>
    </>
  )
}
