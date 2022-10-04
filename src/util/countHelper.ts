import { BetterCommit, BetterEvent, BetterIssue, FreeDictionary, KeyCount } from "./types";

export function countAmountPerDate (list: BetterEvent[] | BetterIssue[] | BetterCommit[]): KeyCount[] {
    const r: FreeDictionary<number> = {};
    const uniqueDates = new Set<string>();
    list.map(d => (d.created_at_date.toISOString())).forEach(a => uniqueDates.add(a));
    uniqueDates.forEach(date => r[date] = 0);
    list.forEach(d => r[d.created_at_date.toISOString()]++);
    return Object.keys(r).map(k => ({index: new Date(k).toLocaleDateString('en-us'), count: r[k]}));
}

export function countAmoutPerType(list: BetterEvent[]): KeyCount[] {
    const r: FreeDictionary<number> = {};
    const uniqueTypes = new Set<string>();
    list.forEach(a => uniqueTypes.add(a.action_name));
    uniqueTypes.forEach(a => r[a] = 0);
    list.forEach(a => r[a.action_name]++);
    return Object.keys(r).map(k => ({index: k, count: r[k]}));
}

export function countAmoutPerAuthor(list: BetterEvent[]): KeyCount[] {
    const r: FreeDictionary<number> = {};
    const uniqueAuthors = new Set<string>();
    list.forEach(a => uniqueAuthors.add(a.author.username));
    uniqueAuthors.forEach(a => r[a] = 0);
    list.forEach(a => r[a.author.username]++);
    return Object.keys(r).map(k => ({index: k, count: r[k]}));
}