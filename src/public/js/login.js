
async function login() {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const data = { name, password };

    const request = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const response = await request.json();

    if (request.status === 200) {
        localStorage.setItem("token", response.token);
        window.location.href = "/";
    } else {
        handleError(response.error);
    }
}