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
    courseData: never
    name: string,
    iconURI: string,
    difficulty: string,
    cleanName?: string,
}

export interface Word {
    wordText: string,
    imageURI: string,
    course: string,
}

export interface UserScore {
    usersGoogleID: string,
    courseID: string,
    score: number,
    time: string,

}

export interface UserScoreByDifficulty {
    easy: number,
    medium: number,
    hard: number
}
