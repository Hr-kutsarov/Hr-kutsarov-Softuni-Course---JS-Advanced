
const HOST = 'http://localhost:3030';
async function request(method, url, data) {
    let options = {
        method, 
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const token = sessionStorage.getItem('token');
    
    if (token) {
        options.headers['X-Authorization'] = token;
    }

    try {
        const res = await fetch(HOST + url, options);

        // if no data
        if (res.status === 204) {
            return res
        }

        if (!res.ok) {
            return res.message
        }

        if (res.status === 200) {
            return res
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
    
}

export const get = request.bind(null, 'get');
export const put = request.bind(null, 'put');
export const post = request.bind(null, 'post');
export const del = request.bind(null, 'delete');