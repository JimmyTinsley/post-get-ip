LIST_PASSWD = "default_password"

addEventListener("fetch", event => {  
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {  
    url = new URL(request.url)
    
    if (url.pathname === "/set") {
        for(var key of url.searchParams.keys()) {
            await BUCKET.put(key, url.searchParams.get(key))
        }
        return new Response("ok")
    }

    if (url.pathname === "/get") {
        key = url.searchParams.get("key")
        const value = await BUCKET.get(key)
        return new Response(value)
    }

    if (url.pathname === "/list") {
        const value = await BUCKET.list()
        passwd = url.searchParams.get("passwd")
        if (passwd !== LIST_PASSWD) {
            return new Response("Password not correct", {status: 400})
        }
        let key_list = []
        for(var key of value.keys) {
            key_list.push(key.name)
        }
        return new Response(key_list.join("\r\n"))
    }
}
