const taskUpdateButton = document.querySelector(".task-update-button");
taskUpdateButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.querySelector('.new-task-name').value
    const due = document.querySelector('.new-task-due').value
    const completionStatus = document.querySelector('.new-task-completionStatus').value
    const description = document.querySelector('.new-task-description').value
    const listId = document.querySelector('.new-task-listId').value
    //const body = { name, due, completionStatus, description, listId };
    try {
        const res = await fetch(`http://localhost:8080/tasks/${e.target.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, due, completionStatus, description, listId }),
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
        window.location.href = "/"; s
    } catch (err) {
        handleErrors(err);
    }
});
const taskDeleteButton = document.querySelector('.task-delete-button');
taskDeleteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        console.log('Hello from the destroy world!');
        const res = await fetch(`http://localhost:8080/tasks/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        });
        window.location.href = "/";
        const data = await res.json();
    } catch (err) {
        console.log(err)
    }
});

const handleErrors = async (err) => {
    if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorsContainer = document.querySelector(".errors-container");
        let errorsHtml = [
            `
          <div class="alert alert-danger">
              Something went wrong. Please try again.
          </div>
        `,
        ];
        const { errors } = errorJSON;
        if (errors && Array.isArray(errors)) {
            errorsHtml = errors.map(
                (message) => `
            <div class="alert alert-danger">
                ${message}
            </div>
          `
            );
        }
        errorsContainer.innerHTML = errorsHtml.join("");
    } else {
        alert(
            "Something went wrong. Please check your internet connection and try again!"
        );
    }
};

window.addEventListener("load", (event) => {
    console.log("hello from javascript!")
})
