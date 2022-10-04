import React, { useEffect, useState } from 'react';

const getSessionOrDefault = (key: string, d: unknown) => {
    const s = sessionStorage.getItem(key);
    if (!s) {
        return d;
    }
    return JSON.parse(s);
}

export function useSessionStorage<T>(key: string, d: unknown) {
    const [value, setValue] = useState<T>(getSessionOrDefault(key, d));

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}