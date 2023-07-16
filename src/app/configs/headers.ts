export function headerWithToken(token: string): {} {
    return {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}


export function headerWithoutToken(): {} {
    return {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    }
}
