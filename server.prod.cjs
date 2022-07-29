// @ts-check
const fs = require('fs')
const path = require('path')
const express = require('express')
const httpStatus = require("http-status");
const resolve = (p) => path.resolve(__dirname, p)

const manifest = require('./dist/client/ssr-manifest.json')

const app = express()

const router = express.Router();

router.get('/currentUserNav', (req, res) => {
  res.status(httpStatus.OK).json([
    {
      name: 'Home',
      parentId: 0,
      id: 7,
      meta: {
        icon: 'HistoryOutlined',
        title: 'pages.dashboard.workplace.title',
        show: true,
      },
      component: 'HomeView',
      path: '/home',
    },
    {
      name: 'About',
      parentId: 0,
      id: 2,
      meta: {
        icon: 'HeartOutlined',
        title: 'pages.dashboard.analysis.title',
        show: true,
      },
      component: 'AboutView',
      path: '/about',
    },
  ]);
});

app.use('/api', router);

/**
 * @type {import('vite').ViteDevServer}
 */
app.use(require('compression')())
app.use(
  "/mobile-assets",
  express.static(path.join(__dirname, "./dist/client", "mobile-assets"))
);


app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace('/mobile/', '/');

    const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    const render = require('./dist/node/entry-server.js').render

    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--ssr-outlet-->`, appHtml)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
