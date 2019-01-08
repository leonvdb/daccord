export class ApiError extends Error {
    message: string
    statusCode: number

    constructor(message: string, status: number = 500) {
        super(message)
        this.statusCode = status
    }
}


