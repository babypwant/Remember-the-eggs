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

const fetchLists = async () => {
    const res = await fetch("http://localhost:8080/lists", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(
                "TWITTER_LITE_ACCESS_TOKEN"
            )}`,
        },
    });
    if (res.status === 401) {
        window.location.href = "/log-in";
        return;
    }
    const { lists } = await res.json();
    const listsContainer = document.querySelector(".lists-container");
    const listsHtml = lists.map(
        ({ message, user: { username } }) => `
      <div class="card">
        <div class="card-header">
          ${username}
        </div>
        <div class="card-body">
          <p class="card-text">${message}</p>
        </div>
      </div>
    `
    );
    listsContainer.innerHTML = listsHtml.join("");
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await fetchLists();
    } catch (e) {
        console.error(e);
    }
});

const form = document.querySelector(".edit-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const description = formData.get("description");
    const body = { description };
    try {
        const res = await fetch("http://localhost:8080/lists", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                    "TWITTER_LITE_ACCESS_TOKEN"
                )}`,
            },
        });
        if (res.status === 401) {
            window.location.href = "/log-in";
            return;
        }
        if (!res.ok) {
            throw res;
        }
        form.reset();
        await fetchLists();
    } catch (err) {
        handleErrors(err);
    }
});

window.addEventListener("load", (event) => {
    console.log("hello from javascript!")
})
