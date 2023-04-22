import { Injectable } from '@angular/core';

export type CacheKey = string | number | symbol

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private _cache: { [key: CacheKey]: any } = {}

    constructor() { }

    public values(): any[] {
        return Object.values(this._cache)
    }

    public get<T>(key: CacheKey): T {
        console.log(this._cache)
        return this._cache[key] as T
    }

    public set<T>(key: CacheKey, value: T): void {
        this._cache[key] = value
    }
}
