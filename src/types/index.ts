// server information type
export type serverInformation = {
    port: number
    domain: 'ers.er-s.net'
    environment: 'development' | 'production'
    databaseName: 'electronic_repair_shop'
}

// controller response interface
export type controllerResponse = {
    success: boolean
    message: any
}

// listing type
export type list = {
    previous: number
    next: number
    list: any[]
    pages: number
}

// controller type
export type controller = {
    changeAuthenticated(body: object): Promise<controllerResponse>
    insertSingleData(body: object): Promise<controllerResponse>
    createAuthenticated(body: object): Promise<controllerResponse>
    deleteSingleData(query: object): Promise<controllerResponse>
    list(query: object): Promise<controllerResponse>
    listAll(query: object): Promise<controllerResponse>
    loginAuthenticated(body: object): Promise<controllerResponse>
    read(query: object): Promise<controllerResponse>
    updateSingleData(body: object): Promise<controllerResponse>
    validate(query: object): Promise<controllerResponse>
    validateAuthenticated(query: object): Promise<controllerResponse>
    uploadSingleFile(file: object, body: object): Promise<controllerResponse>
    deleteSingleFile(query: object): Promise<controllerResponse>
    insertMultipleData(bodyArray: object[]): Promise<controllerResponse>
    updateMultipleData(bodyArray: object[]): Promise<controllerResponse>
    deleteMultipleData(queries: object[]): Promise<controllerResponse>
}