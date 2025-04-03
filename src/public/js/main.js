


async function loadPage(page) {
    const pageUrl = `components/${page}.html`;
    const response = await fetch(pageUrl);

    if (response.ok) {
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
    }
    else {
        document.getElementById('app').innerHTML = '<h1>Page not found</h1>';
    }


    const script = document.createElement('script');
    script.src = `js/${page}.js`;
    script.async = false;
    document.body.appendChild(script);
}

loadPage('/dashboard');