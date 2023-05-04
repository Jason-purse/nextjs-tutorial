export const config = {
    runtime: 'experimental-edge',
}

export default async function Handler(req, res) {
    // let data = await fetch("http://localhost:3000/api/ApiRoute", {
    //     redirect: "manual"
    // })
    //
    // console.log(JSON.stringify(data))
    //
    // return new Response(JSON.stringify({message: "ok"}))

    return fetch("http://localhost:3000/api/ApiRoute", {
        redirect: "manual"
    })
        .then(response => {
            console.log(... response.headers)
            return response
        })
}