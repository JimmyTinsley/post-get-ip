addEventListener("fetch", event => {  
    event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {  
    if (request.method === "GET") {
        const value = await BUCKET.get("ip")  
        if (value === null) {    
            return new Response("Value not found", {status: 404})  
        }
        return new Response(value)
    }
    if (request.method === "POST") {
        const ip = request.headers.get("cf-connecting-ip") 
        await BUCKET.put("ip", ip)
        return new Response("ok",{status: 200})
    } 
    else {
        return new Response("Method Not Allowed",{status: 405})
    }
}
