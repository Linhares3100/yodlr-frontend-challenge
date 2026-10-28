
const usersList = document.querySelector("#users-list");

fetch("/users")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.json();
    })

    .then(function (users) {
        users.forEach(function (user) {
            const item = document.createElement("li");

            item.textContent = user.id + " - " + user.firstName + " " + user.lastName + " - " + user.email + " - " + user.state;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            item.appendChild(deleteButton);

            const activateButton = document.createElement("button");
            activateButton.textContent = "Activate";
            activateButton.classList.add("activate-button");
            item.appendChild(activateButton);

            if (user.state === "active") {
                activateButton.disabled = true;
            }

            activateButton.addEventListener("click", function () {

                user.state = "active";
                fetch("/users/" + user.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                    .then(function (response) {
                        if (!response.ok) {
                            throw new Error("Request failed");
                        }
                        console.log("PUT response:", response.status);
                    })

                    .then(function () {
                        item.textContent = user.id + " - " + user.firstName + " " + user.lastName + " - " + user.email + " - " + user.state;
                        item.appendChild(deleteButton);
                        item.appendChild(activateButton);

                        activateButton.disabled = true;
                    })

                    .catch(function (error) {
                        console.log(error);
                    });

            });
            deleteButton.addEventListener("click", function () {
                fetch("/users/" + user.id, {
                    method: "DELETE"
                })
                    .then(function (response) {
                        if (response.ok) {
                            throw new Error('Could not delete user');
                        }
                        item.remove();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });

            usersList.appendChild(item);
        });
    })
    .catch(function (error) {
        console.log(error);
    });


