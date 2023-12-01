export interface ApiResponce<Data = any> {
    responseData: Data,
    responseMessage: string,
    responseCode: number,
    responseSuccess?: any,
    responseStatus?: number
}
