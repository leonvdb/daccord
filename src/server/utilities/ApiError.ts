export class ApiError extends Error {
    message: string
    statusCode: number

    constructor(message: string, status: number) {
        super(message)
        this.statusCode = status
    }
}


