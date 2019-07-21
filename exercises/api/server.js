const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const mime = require('mime')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) => {
  const assetPath = path.join(__dirname, 'assets', name)
  // return fs.readFileSync(assetPath, {encoding: 'utf-8'}).toString()
  //TODO=== Make Async
  return new Promise((resolve,reject)=>{
    fs.readFile(assetPath, { encoding: "utf-8" }, (error, result)=>{
      if(error) {
        reject(error)
      }else {
        resolve(result)
      }
    })
  })
}

const hostname = '127.0.0.1'
const port = 3000
//TODO==
const router = {
  '/ GET': { //! ==> route + method
    asset: 'index.html',
    mime: mime.getType('html')
  },
  '/style.css GET': {
    asset: 'style.css',
    mime: mime.getType('css')
  }
}

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer(async (req, res) => { //TODO <== async
  const method = req.method
  const route = url.parse(req.url).pathname

  //TODO==
  const match = router[`${route} ${method}`]
  if (!match) {
    //console.log('debugging')
    //debugger
    res.writeHead(404);
    logRequest(method, route, 404);
    res.end();
    return //! make sure - doesn't continue
  }
  res.writeHead(200, {'Content-Type': match.mime})
  res.write(await findAsset(match.asset))
  logRequest(method, route, 200)
  res.end()

  //? this is sloppy, espcially with more assets, create a "router"
  // if (route === '/') {
  //   res.writeHead(200, {'Content-Type': 'text/html'})
  //   res.write(await findAsset('index.html')) //TODO <== await
  //   logRequest(method, route, 200)
  //   res.end()
  // } else {
    //? missing asset should not cause server crash
    // throw new Error('route not found')
    // res.end()
  //}
  // most important part, send down the asset
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
