document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0

    //creating a playing board
    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            square = document.createElement('div') 
            square.setAttribute('data', 0)
            square.innerHTML = ''

            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }

    createBoard()


    // Generating a random number

    function generate() {
        if (checkForBlank()) {
            let randNumber = Math.floor(Math.random() * squares.length)
            checkForGameOver()
            if (squares[randNumber].innerHTML == '') {
                squares[randNumber].setAttribute('data', 2)
                squares[randNumber].innerHTML = 2
                checkForGameOver()
            } else generate()
        }

    }
    

    // Swiping right
    function moveRight() {
        let count = 0
        for (let i = 0; i < width * width; i++) {
            if (i % width === 0) {
                let totalOne = squares[i].getAttribute('data')
                let totalTwo = squares[i+1].getAttribute('data')
                let totalThree = squares[i+2].getAttribute('data')
                let totalFour = squares[i+3].getAttribute('data')
                let  row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredRow = row.filter(num => num)

                let missings = width - filteredRow.length
                let zeros = Array(missings).fill(0)

                let newRow = zeros.concat(filteredRow)
                if (JSON.stringify(row) === JSON.stringify(newRow)){
                    count ++
                }
                for (let j = 0; j < width; j++) {
                    if (newRow[j] != 0){
                        squares[i+j].innerHTML = newRow[j]
                        squares[i+j].setAttribute('data', newRow[j])
                    }
                    else{
                        squares[i+j].innerHTML = ''
                        squares[i+j].setAttribute('data', 0)
                    }   
                }

            }        
        }
        return count
    }
   

    // Swiping left
    function moveLeft() {
        let count = 0
        for (let i = 0; i < width * width; i++) {
            if (i % width === 0) {
                let totalOne = squares[i].getAttribute('data')
                let totalTwo = squares[i+1].getAttribute('data')
                let totalThree = squares[i+2].getAttribute('data')
                let totalFour = squares[i+3].getAttribute('data')
                let  row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                let filteredRow = row.filter(num => num)

                let missings = width - filteredRow.length
                let zeros = Array(missings).fill(0)

                let newRow = filteredRow.concat(zeros)
                if (JSON.stringify(row) === JSON.stringify(newRow)){
                    count ++
                }
                    

                for (let j = 0; j < width; j++) {
                    if (newRow[j] != 0){
                        squares[i+j].innerHTML = newRow[j]
                        squares[i+j].setAttribute('data', newRow[j])
                    }
                    else {   
                        squares[i+j].innerHTML = ''
                        squares[i+j].setAttribute('data', 0)
                    }
                }

            }        
        }
        return count
    }
    
    // Swiping down
    function moveDown() {
        let count = 0
        for (let i = 0; i < width; i++) {
            let totalOne = squares[i].getAttribute('data')
            let totalTwo = squares[i + width].getAttribute('data')
            let totalThree = squares[i + width*2].getAttribute('data')
            let totalFour = squares[i + width * 3].getAttribute('data')
            let  col = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]   
            let filteredCol = col.filter(num => num)       
            
            let missings = width - filteredCol.length
            let zeros = Array(missings).fill(0)

            let newCol = zeros.concat(filteredCol)
            if (JSON.stringify(col) === JSON.stringify(newCol)){
                count++
            }
            for (let j = 0; j < width; j++) {
                if (newCol[j] != 0) {
                    squares[i + j*width].innerHTML = newCol[j]
                    squares[i + j*width].setAttribute('data', newCol[j])
                    
                }
                else {
                    squares[i + j*width].innerHTML = ''
                    squares[i + j*width].setAttribute('data', 0)
                }
            }
        }
        return count
    }

    // Swiping up
    function moveUp() {
        let count = 0
        for (let i = 0; i < width ; i++) {
            let totalOne = squares[i].getAttribute('data')
            let totalTwo = squares[i + width].getAttribute('data')
            let totalThree = squares[i + width*2].getAttribute('data')
            let totalFour = squares[i + width * 3].getAttribute('data')
            let  col = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]   
            let filteredCol = col.filter(num => num)       

            let missings = width - filteredCol.length
            let zeros = Array(missings).fill(0)

            let newCol = filteredCol.concat(zeros)
            if (JSON.stringify(col) === JSON.stringify(newCol)){
                count++
            }
            for (let j = 0; j < width; j++) {
                if (newCol[j] != 0) {
                        squares[i + j*width].innerHTML = newCol[j]
                        squares[i + j*width].setAttribute('data', newCol[j])
                }                    
                else {
                    squares[i + j*width].innerHTML = ''
                    squares[i + j*width].setAttribute('data', 0)
                }
            }
        }
        return count
    }

    function combineRowLeft()  {
        let count = 0
        for (let i = 0; i < width*width-1; i++) {
            let i1 = squares[i].getAttribute('data')
            let i2 = squares[i+1].getAttribute('data')

            if (i % width != width-1 && i1 != 0 && i2 != 0 && i1 == i2) {
                let combinedTotal = parseInt(i1) + parseInt(i2)
                squares[i].innerHTML = combinedTotal
                squares[i].setAttribute('data', combinedTotal)
                squares[i+1].innerHTML = ''
                squares[i+1].setAttribute('data', 0)
                score += combinedTotal
                scoreDisplay.innerHTML = score
                count++
            }       
        }
        checkForWin()
        return count
    }

    function combineRowRight() {
        let count = 0
        for (let i = width*width - 1; i > 0; i--) {
            let i1 = squares[i].getAttribute('data')
            let i2 = squares[i-1].getAttribute('data')

            if (i % width != 0 && i1 != 0 && i2 != 0 && i1 == i2) {
                let combinedTotal = parseInt(i1) + parseInt(i2)
                squares[i].innerHTML = combinedTotal
                squares[i].setAttribute('data', combinedTotal)
                squares[i-1].innerHTML = ''
                squares[i-1].setAttribute('data', 0)
                score += combinedTotal
                scoreDisplay.innerHTML = score
                count++
            }       
        }
        checkForWin()
        return count
    }

    function combineColumnUp() {        
        let count = 0
        for (let i = 0; i < width*width - width; i++) {
            let i1 = squares[i].getAttribute('data')
            let i2 = squares[i+width].getAttribute('data')

            if (i1 != 0 && i2 != 0 && i1 == i2) {
                let combinedTotal = parseInt(i1) + parseInt(i2)
                squares[i].innerHTML = combinedTotal
                squares[i].setAttribute('data', combinedTotal)
                squares[i+width].innerHTML = ''
                squares[i+width].setAttribute('data', 0)
                score += combinedTotal
                scoreDisplay.innerHTML = score
                count++
            }         
        }
        checkForWin()
        return count
        
    }

    function combineColumnDown() {        
        let count = 0
        for (let i = width*width - 1; i >= width; i--) {
            let i1 = squares[i].getAttribute('data')
            let i2 = squares[i-width].getAttribute('data')

            if (i1 != 0 && i2 != 0 && i1 == i2) {
                let combinedTotal = parseInt(i1) + parseInt(i2)
                squares[i].innerHTML = combinedTotal
                squares[i].setAttribute('data', combinedTotal)
                squares[i-width].innerHTML = ''
                squares[i-width].setAttribute('data', 0)
                score += combinedTotal
                scoreDisplay.innerHTML = score
                count++
            }         
        }
        checkForWin()
        return count
        
    }

    // assign keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight()
        } else if(e.keyCode == 37){
            keyLeft()
        } else if( e.keyCode == 38) {
            keyUp()
        } else if (e.keyCode == 40) {
            keyDown()
        }
    }

    document.addEventListener('keydown', control)

    function keyRight() {
        let r = moveRight()
        let c = combineRowRight()
        moveRight()
        if (!(r == 4 && c == 0)) {
            var myTimer2; 
            myTimer2 = setTimeout(generate, 150)
        }
    }

    function keyLeft(){
        let l = moveLeft()
        let c = combineRowLeft()
        moveLeft()
        if (!(l == 4 && c == 0)) {
            var myTimer2; 
            myTimer2 = setTimeout(generate, 150)
        }
    }

    function keyUp() {
        let u = moveUp()
        let c = combineColumnUp()
        moveUp()
        if (!(u == 4 && c == 0)) {
            var myTimer2; 
            myTimer2 = setTimeout(generate, 150)
        }
    }
    
    function keyDown() {
        let d = moveDown()
        let c = combineColumnDown()
        moveDown()
        if (!(d == 4 && c == 0)) {
            var myTimer2; 
            myTimer2 = setTimeout(generate, 150)
        }
    }


    // Check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You Win!'
                document.removeEventListener('keydown', control)
            }
            
        }
    }
    // Check if there're no blank square on the board
    function checkForBlank() {
        let count = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == '') {
                count++
            }
        }
        return count != 0
    }

    function checkForGameOver() {
        let count = 0
        let check = false
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == '') {
                count++
            }
            if ((i < width*width-1 && squares[i].innerHTML == squares[i+1].innerHTML)
                || (i < width*width - width && squares[i].innerHTML === squares[i+width].innerHTML)) {
                    check = true
                }
        }

        if (count === 0 && check == false) {
            resultDisplay.innerHTML = 'You Lose!'
            document.removeEventListener('key', control)
        }
    }

    //add colours
    function addColours() {
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == '') squares[i].style.backgroundColor = '#b3aaa1'
            else if (squares[i].innerHTML == 2)
                squares[i].style.backgroundColor = '#eee4da'   
            else if (squares[i].innerHTML  == 4)
                squares[i].style.backgroundColor = '#ede0c8'
            
            else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f17c59' 
            else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#f56c43' 
            else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e95c43' 
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#f33c1c' 
            else if (squares[i].innerHTML == 128) {
                squares[i].style.backgroundColor = '#f7d066' 
                squares[i].style.fontSize = '47px';
            }
            else if (squares[i].innerHTML == 256) {
                squares[i].style.backgroundColor = '#f0cb65' 
                squares[i].style.fontSize = '47px'; 
            }
            else if (squares[i].innerHTML == 512) {
                squares[i].style.backgroundColor = '#f8cb4e' 
                squares[i].style.fontSize = '47px';
                }
            else if (squares[i].innerHTML == 1024) {
                squares[i].style.backgroundColor = '#f8c12a'
                squares[i].style.fontSize = '42px';
            } 
            else if (squares[i].innerHTML == 2048) {
                squares[i].style.backgroundColor = '#f7b500'
                squares[i].style.fontSize = '42px';
            }
        }    
    }
addColours()

var myTimer;
myTimer = setInterval(addColours, 50)

})
