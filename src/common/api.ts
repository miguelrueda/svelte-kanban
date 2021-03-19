export const serviceUrl = "http://localhost:3000";

export function httpGet(path: string) {
    return req(path, "GET");
}

export function httpPost(path: string, data: object) {
    return req(path, "POST", data);
}

export function httpPut(path: string, data: object) {
    return req(path, "PUT", data);
}

export function httpDelete(path: string) {}

async function req(path: string, method: string, data?: object) {
    const res = await fetch(`${serviceUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: data && JSON.stringify(data)
    });
    const json = await res.json();
    return { ok: res.ok, data:json };
}
