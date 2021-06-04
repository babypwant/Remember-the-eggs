
const updateButton = document.querySelector(".update-button");

updateButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const description = document.querySelector('.description-input').value
    try {
        const res = await fetch(`http://localhost:8080/lists/${e.target.id}`, {
            method: "PUT",
            body: JSON.stringify({ description }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (res.status === 401) {
            window.location.href = "/log-in";
            return;
        }
        if (!res.ok) {
            throw res;
        }
        window.location.href = "/";
    } catch (err) {
        handleErrors(err);
    }
});

const deleteButton = document.querySelector('.delete-button')
console.log(deleteButton)
deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('Hello everyone')
    try {
        const res = await fetch(`http://localhost:8080/lists/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        });
        window.location.href = "/";
    } catch (err) {
        console.log(err)
    }
});


window.addEventListener("load", (event) => {
    console.log("hello from javascript!")
})
