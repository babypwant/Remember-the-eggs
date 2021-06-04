window.addEventListener("DOMContentLoaded", () => {
    const getLists = user => {
        const listBoard = document.querySelectorAll('listBoard')
        const lists = document.querySelectorAll('.listContainer');
        console.log(lists)
        listBoard.r = '';
    }
    const fetchList = async () => {
        const res = await fetch(`http://localhost:8080/lists/${e.target.id}`)
    }
    const deleteButtons = document.querySelectorAll(".deleteButton")
    console.log(deleteButtons.length)
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const res = await fetch(`http://localhost:8080/lists/${e.target.id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const listContainer = document.getElementById(e.target.id)
                if (listContainer.id === e.target.id) (
                    listContainer.remove()
                )
            } catch (err) {
                console.log(err)
            }
        })
    }
});