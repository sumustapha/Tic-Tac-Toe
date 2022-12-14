const gameBoard = (() => {
    let board = ['1','2','3','4','5','6','7','8','9']
    let next = true
    const player = (name, marker) =>{
        return {name, marker}
    }

    let mode = true
  
    player1 = player('Player 1','x')
    player2 = player('Computer','o')

    const modetoggle = document.getElementById('mode')

    modetoggle.addEventListener('click',editNames)

    function editNames(){
        mode ? player2.name = 'Player 2' : 'Computer'
        mode ? modetoggle.innerText = 'Switch to 1 player' : modetoggle.innerText = 'Switch to 2 players'
        mode = !mode
    }
  
    const swapTurns = () => {
        next = !next
        return next ? player1.marker : player2.marker
    }

    const isAvaible = index => board.includes(index)
    const getFreeSpot = () =>  board[Math.floor(Math.random()*board.length)]
    const getIndex = event => {
        const cellIndex = event.target.dataset.cell
        playRound(cellIndex)
    }

    const addCpuMarker = (marker) => {
        const freeSpot = getFreeSpot()
        if(!isAvaible(freeSpot)) return
        cells[freeSpot-1].classList.add(marker)
        board = board.filter(value => value !== freeSpot)
        checkWinner(marker)
        swapTurns()
    }
  
    const cells = document.querySelectorAll('.cell')
    const modal = document.querySelector('.modal')
    cells.forEach(cell => cell.addEventListener('click', getIndex))
        // if(!isnotAvaible(freeSpot)) return
        // cells[freeSpot-1].classList.add(player2.marker)
        // board = board.filter(value => value !== freeSpot)

    function playRound(index){
        if(!isAvaible(index)) return
        let marker = next ? player1.marker : player2.marker
        cells[index-1].classList.add(marker)
        board = board.filter(value => value !== index)
        checkWinner(marker)
        marker = swapTurns()
        if(mode){
            addCpuMarker(marker)
        }

    }

    function checkWinner(marker){
        const winCombinations = [[1,2,3],[1,5,9],[4,5,6],
        [7,8,9],[3,5,7],[1,4,7],
        [2,5,8],[3,6,9]]
        
        winner = winCombinations.some(combination => {
            return combination.every(index => {
                return cells[index-1].classList.contains(marker)
            })
            
        })

        if(winner){
            gameOver(marker)
        }
        else{
            if (board.length === 0){
                gameOver(null)
            }
        }
    }

    function gameOver(winnerMarker){
        // show winner marker and name
        // highlight winning cells
        // show restart modal after 2secs
        let winnerName = document.querySelector('.winnerName')
        modal.style.display = 'flex'

        if(winnerMarker === null){
            winnerName.innerText = 'Tie'
        }
        else {
           winnerName.innerText = (winnerMarker === player1.marker) ? `${player1.name} wins` : `${player2.name} wins` 
        }

        const reset = document.querySelector('#restart')
        reset.addEventListener('click', ()=>{
            board = ['1','2','3','4','5','6','7','8','9']
            next = true
            modal.style.display = 'none'
            cells.forEach(cell => cell.classList.contains('x') ? cell.classList.remove('x') : 
                                  cell.classList.contains('o') ? cell.classList.remove('o') : console.log("")
                                )           
        })

    }
    
})()

