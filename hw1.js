const http = require('http');

let viewCounts = {
    '/': 0,
    '/about': 0
};

const requestHandler = (req, res) => {
    if (req.url === '/' || req.url === '/about') {
        viewCounts[req.url]++;

        res.writeHead(200, { 'Content-Type': 'text/html' });

        let content;
        if (req.url === '/') {
            content = `
                <html>
                <head><h2>Home Page</h2></head>
                <body>
                <p>Welcome to the Home Page</p>
                <a href="/about">Go to About Page</a>
                <p>Home page count: ${viewCounts['/']}</p>
                </body>
                </html>
            `;
        } else {
            content = `
                <html>
                <head><h2>About Page</h2></head>
                <body>
                <p>Welcome to the About Page</p>
                <a href="/">Go to Home Page</a>
                <p>About page count: ${viewCounts['/about']}</p>
                </body>
                </html>
            `;
        }
        res.end(content);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
};

const server = http.createServer(requestHandler);

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
