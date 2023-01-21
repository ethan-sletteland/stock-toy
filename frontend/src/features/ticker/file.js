// Given an unsorted array A that contains only non-negative integers, find a continuous sub-array which adds to a given number S.

// Example 1:

// Input: S = 12   A[] = {1,2,3,7,5}
// Output: 2 4
// Explanation: The sum of elements from 2nd position to 4th position is 12.

// Example 2:

// Input: S = 15   A[] = {1,2,3,4,5,6,7,8,9,10}
// Output: 1 5
// Explanation: The sum of elements from 1st position to 5th position is 15.

// let arrIn = [1, 2, 3, 7, 5]
// let sIn = 12


// function finder(s, arr){ 
//     arr.forEach((e, i) => { 
//         let runSum = e
//         for (let i2 = i + 1; i2 <= arr.length; i2 += 1){ 
//             runSum += arr[i2]
//             if (runSum === s) { 
//                 console.log([i, i2])
//                 return [i, i2]
//             }
//         }
//     })
// }

// let result = finder(sIn, arrIn)

// console.log(result)

// #2

// Given an expression string x. Examine whether the pairs and the orders of “{“,”}”,”(“,”)”,”[“,”]” are correct in exp.For example, the function should return 'true' for exp = “[()]{}{()()}” and 'false' for exp = “[(])”.

// Example 1:

// Input:()
// Output:true
// Explanation:(). Same bracket can form balanced pairs,and here only 1 type of bracket ispresent and in balanced way.

// Example 2:

// Input:{([])}
// Output:true
// Explanation:{ ( [ ] ) }. Same colored brackets can formbalaced pairs, with 0 number ofunbalanced bracket.

// Example 3:

// Input:([]
// Output:false
// Explanation:([]. Here square bracket is balanced butthe small bracket is not balanced andHence , the output will be unbalanced.

let inputArr = [
    "[()]{ } { ()() }",
    "{([])}",
    "([]"]
function compare(input){
    let inArr = input.split('')

    let stack = []

    let pairs = [
        "()", "[]", "{}"
    ]

    inArr.forEach((e, i) => { 
        if(e !== ' ')stack.push(e)
        let copStr = stack[stack.length - 2] + stack[stack.length - 1]
        if (pairs.indexOf(copStr) !== -1) {
            stack.pop()
            stack.pop()
        }
    })

    return stack.length === 0
}

inputArr.forEach((e, i) => { 
    console.log(`${i}: ${compare(e)}`)
})

