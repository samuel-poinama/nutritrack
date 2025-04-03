
async function register() {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const data = { name, password };

    const request = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    console.log(request);
    const response = await request.json();

    if (request.status === 201) {
        window.location.href = "/login";
    } else {
        handleError(response.error);
    }
}