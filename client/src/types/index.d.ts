export interface UserInfo {
    email : string,
    id : string,
    name : string,
    createDate: string
}

export interface DictionaryMapping {
    orgText : string,
    cleanText: string,
    startTime: number,
    endTime: number,
    url: string,
}

export interface Course {
    name: string,
    iconURI: string,
    difficulty: string,
}

export interface Word {
    word: string,
    path: string,
    course: string,
}