const token = localStorage.getItem("token");


if (!token) {
    window.location.href = "/login.html";
}

fetch("/api/logout", {
    method: "POST",
    headers: {
        "Authorization": token,
    },
}).finally(() => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
});
