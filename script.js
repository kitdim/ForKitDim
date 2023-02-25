const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0)
    return randomNum
}

const getTask = () => {

    const symbol = (Math.random() > 0.5) ? "+" : "-"
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
    gameState.rightAnswer = eval(task)

    return task
}

const toggleGameState = () => {
    gameState.taskInProcess = !gameState.taskInProcess
}

const gameElements = document.getElementById("my_game").children

const title = gameElements[0]
const userTask = gameElements[1]
const userAnswer = gameElements[2]
const btnGame = gameElements[3]

const gameState = {
    taskInProcess: false,
    rightAnswer: null,
}

const startGameFunc = () => {
    if (!gameState.taskInProcess) {

        title.innerText = "Game starting"
        userAnswer.value = null
        userTask.innerText = getTask()
        userAnswer.hidden = false
    }
    else {
        const isRight = gameState.rightAnswer == userAnswer.value

        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
        title.innerText = "You " + ((isRight) ? "win" : "lose")
    }
    toggleGameState()
    btnGame.innerText = (gameState.taskInProcess) ? "Checking!" : "Play again?"
}
btnGame.addEventListener("click", startGameFunc)

userAnswer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        startGameFunc()
    }
    else if (e.key === "Escape") {
        userAnswer.blur()
    }
})

const choosedEl = document.querySelectorAll(".choosed_block-container>div")
const counterEl = document.querySelector(".choosed_block span")

const choosedState = {
    counterElements: 0,
    setCountValue(value) {
        this.counterElements += value
        counterEl.innerText = this.counterElements
    }
}

const eventFunc = (e) => {
    if (e.target.className === "") {
        e.target.className = "choosed_element"
        choosedState.setCountValue(1)
    } else {
        e.target.className = ""
        choosedState.setCountValue(-1)
    }

}

for (let i = 0; i < choosedEl.length; i++) {
    choosedEl[i].addEventListener("click", eventFunc)
}

// const alarm = setInterval(() => {
//     let wantToSleep = confirm("Do you want to sleep?")
//     if (wantToSleep) {
//         console.log("tic")
//     } else {
//         clearInterval(alarm)
//     }
// }, 3000)

const postsBlock = document.querySelector(".posts_block-container")
const showPostsBTN = document.querySelector(".posts_block button")

function addPost(title, body) {

    const postsTitle = document.createElement("h3")
    const postsBody = document.createElement("span")
    const postsItem = document.createElement("p")

    postsTitle.innerText = title
    postsBody.innerText = body

    postsItem.append(postsTitle, postsBody)
    postsBlock.append(postsItem)
}

function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            for (item of data) {
                addPost(item.title, item.body)
            }
        })
        .catch(err => console.log(err.message))
}

// showPostsBTN.onclick = () => { getPosts() }
getPosts()

// function createPost(title, body, userId) {
//     fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             body,
//             userId,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     })
//         .then(res => {
//             console.log(res)
//         })
//         .catch(err => console.log(err.message))
// }

// createPost("title", "body", 15)
