

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

const updateButton = document.querySelector(".update-button");

updateButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const description = document.querySelector('.description-input').value

    console.log(e.target)
    try {
        const res = await fetch(`http://localhost:8080/lists/${e.target.id}`, {
            method: "PUT",
            body: JSON.stringify({ description }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data)
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
        //const data = await res.json();

    } catch (err) {
        console.log(err)
    }
});

window.addEventListener("load", (event) => {
    console.log("hello from javascript!")
})