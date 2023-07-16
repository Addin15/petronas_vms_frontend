export const apiHost = 'https://petronas-vms.onrender.com';

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
