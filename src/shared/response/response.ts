export class ResponseResult {
    constructor(isSuccess: boolean, messages: string[] | string, detailMessages?: string[]) {
        this.isSuccess = isSuccess
        this.messages = messages
        this.detailMessages = detailMessages
    }
    isSuccess: boolean
    messages: string[] | string;
    detailMessages: string[]
}