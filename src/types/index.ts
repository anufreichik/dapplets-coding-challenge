export interface IDapplet{
    "id": string,
    "icon": string,
    "title": string,
    "author": string,
    "rating": number,
    "address": string,
    "released": string,
    "downloads": number,
    "description":string,
    "text_1": string,
    "text_3": string,
    "text_4": string,
    "text_5": string,
    "text_6": string,
    "text_7": string,
    "text_8": string,
    "text_9": string,
    "tags": string[]
}

export interface ITag{
    "id": string,
    "name": string
}

export interface ITagMap { [key: string]: ITag; }

export interface IDappletInstallation {[key:string]: boolean}



