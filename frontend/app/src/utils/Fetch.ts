export const apiFetch = async (
    endpoint: string,
    method: string,
    headers = {},
    body: any = null
) => {
    let response = null;
    if (method in ["GET", "HEAD"]) {
        response = await fetch(endpoint, {
            method: method,
            headers: headers
        });
    } else {
        response = await fetch(endpoint, {
            method: method,
            headers: headers,
            body: body
        })
    }

    if (response.status >= 500) {
        throw new Error("Internal server error")
    }

    const data = await response.json();

    if (response.status >= 400 && response.status < 500) {
        if (data.detail) {
            throw new Error(data.detail)
        }
        throw data
    }

    return data
}