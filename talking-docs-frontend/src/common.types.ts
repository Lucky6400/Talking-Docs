export type PdfList = {
    userId: string;
    sourceId: string;
    createdAt: string;
    _id: string;
    name: string;
}

export type Message = {
    _id: string,
    from: string,
    to: string,
    content: string,
    references?: {
        pageNumber: number
    }[],
    createdAt: string,
}

export type MsgPayload = {
    role: string;
    content: string;
}

export type UserData = {
    username: string;
    userId: string;
}