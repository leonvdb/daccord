export class ApiError extends Error {
    statusCode: number

    constructor(message: string, status: number = 500) {
        super(message)
        this.statusCode = status
    }
}


