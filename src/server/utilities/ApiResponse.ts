export class ApiResponse {
    message: string
    data: any

    /**
     * @param messageOrData String for message and object for data. When data is passed the message SUCESS will be send
     * @param data Use only when messageOrData is a string(message)
     */
    constructor(messageOrData: string | object, data?: object) {
        if (typeof messageOrData === 'string') {
            this.message = messageOrData
            if (data) this.data = data
        }
        if (typeof messageOrData === 'object') {
            this.message = 'SUCCESS'
            this.data = messageOrData
        }

    }

}

