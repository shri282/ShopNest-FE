export const readSession = (key: string) => {
    const value = sessionStorage.getItem(key);

    if (!value) {
        return null;
    }

    return JSON.parse(value);
}

export const writeSession = (key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data));
}