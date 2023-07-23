const { Nodes } = require("./Nodes");


const testNode = Nodes('test')

describe('Test the value of the node', () => {
    test('Expect testNode value to be an object with a data value of test', () => {
        const expectedNode = {
            'data': 'test',
            'left': null,
            'right': null
        }
        expect(testNode).toStrictEqual(expectedNode)
    })

    test('Expect testRight to be on the right and testLeft on the left on the test node', () => {
        const expectedNode = {
            'data': 'test',
            'left': 'testLeft',
            'right': 'testRight'
        }
        const testNode1 = Nodes('test','testLeft','testRight')
        expect(testNode1).toStrictEqual(expectedNode)
    })
})