const http = require('http');
const axios = require('axios')
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');



const hostname = '127.0.0.1';
const port = 3000;


const callInstagram = async () => {
    const browser = await puppeteer.launch();

    // Create a page
    const page = await browser.newPage();

    // Go to your site
    await page.goto('https://www.instagram.com/saraborgesch/');
    await page.setViewport({width: 1080, height: 1024});


    // Query for an element handle.
    const element = await page.waitForSelector('span[class=_ac2a]');
    // Do something with element...


    // Dispose of handle
    await element.dispose();

    const data = await page.evaluate(() => {    
        const dados = document.querySelectorAll('span[class=_ac2a]')[1].title

        console.log("teste222", dados)
        return dados
    })

    console.log("teste vai", data)

    // Close browser.
    // await browser.close();
}



const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    axios.get('https://www.instagram.com/spacetoday1/').then(({ data }) => {
        const $ = cheerio.load(data);
        console.log("test",)
        res.end($.root().html());


    })
});

server.listen(port, hostname, () => {
    callInstagram()
    console.log(`Server running at http://${hostname}:${port}/`);
});