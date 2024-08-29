const baseURL = "https://api.kickbase.com"


export async function getRequest(url: string, token:string) {
    if(token) {
        const response = await fetch(baseURL + url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        },
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}
}

export async function postRequest(url: string, token:string, body: object) {
    if(token) {
        const response = await fetch(baseURL + url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}
}

export async function getFetcherSWR([url, token]:Array<string>) {
    if(token) {
        const response = await fetch(baseURL + url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        },
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}

}

export async function postFetcherSWR([url, token, body]:Array<any>) {
    if(token) {
        const response = await fetch(baseURL + url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}

}