const http = require('http');
const fs = require('fs')

const server = http.createServer(function(request, response){
    
    if (request.url === '/'){
        fs.readFile('../clients/index.html', function(error, content) {
            response.end(content)
        })    
    }
    
    if(request.url ==='/teste'){
        response.end('Tudo dentro os conformes')
    }
})

server.listen(8080) 
console.log('Server is running on port 8080')