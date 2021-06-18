const draggables = document.querySelectorAll('.bli')
const column = document.querySelectorAll('.column')



draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')

        const pcard = draggable.parentElement
        console.log (draggable.textContent, draggable.id, pcard.id, pcard.textContent)
        var xhr = new XMLHttpRequest();
        yourUrl = '/tasksprintupdate'
        xhr.open("POST", yourUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            id: draggable.id,
            status: pcard.id
        }));


    })
})

column.forEach(card => {
    card.addEventListener('dragover', e => {
        e.preventDefault()
        const draggable = document.querySelector('.dragging')
        card.appendChild(draggable)
    })
})



