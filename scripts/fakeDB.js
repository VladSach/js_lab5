const requestURL = 'https://my-json-server.typicode.com/VladSach/GameRshop/db';

export async function getData(){

    let response = await fetch(requestURL);

    if (response.ok) {
        let json = await response.json();
        return json;
    }

    throw new Error(response.status);
}

export function sendRequest(method, url, body=null) {
    return fetch(url, {method: method, body: body}).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
        .catch(error => {
            console.log(error);
        });
}