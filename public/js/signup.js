const form = document.querySelector("form");

form.addEventListener("input", function () {
    document.querySelector("#success-message").textContent = "";
})

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = form.elements.firstName.value;
    const lastName = form.elements["lastName"].value;
    const email = form.elements.email.value;

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    fetch("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

        .then(function (response) {
            if(!response.ok) {
                throw new Error("Request failed");
            }
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            form.reset();

            document.querySelector("#success-message").textContent =
                "Account created successfully!";
        })
        
        .catch (function (error) {
                console.log(error);

                document.querySelector("#success-message").textContent =
                    "Could not create account. Please try again";
            });

    console.log(user);

    console.log("Formulário enviado!");
});