const DEBUG: boolean = false;

export const apiHost = DEBUG ? 'http://127.0.0.1:8000' : 'https://petronas-vms.onrender.com';

export function headerWithToken(token: string): {} {
    return {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`
    }
}


export function headerWithoutToken(): {} {
    return {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    }
}
