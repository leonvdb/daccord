import { IApiResponse } from '../routes/api/responseInterfaces';

export class ApiResponse<TPayload> implements IApiResponse<TPayload> {
    message: string = 'SUCCESS'
    payload: TPayload

    /**
     * This class should define the response type with the TPayload generic
     * @param payload Data returned by the API endpoint
     * @param message Message from the API endpoint
     */
    constructor(payload?: TPayload, message?: string) {
        if (payload) this.payload = payload
        if (message) this.message = message
    }

}

