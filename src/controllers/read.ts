// require modules
import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"

// asynchronous function for reading single data from the database 
export async function read(query: object): Promise<controllerResponse> {
    try {
        let { condition, schema }: any = query
        // parse the condition from string to object
        condition = JSON.parse(condition)

        // get schema for database data insertion
        const tableSchema: controllerResponse = getSchema(schema)

        // confirm schema existance
        if (tableSchema.success) {
            // read data from the database by the condition given
            const dataExist: any = await tableSchema.message.findOne(condition).exec()

            // confirm data existance 
            if (dataExist)
                return { success: true, message: dataExist }
            else
                return { success: false, message: `No ${schema} has been found` }
        }
        else
            return tableSchema

    } catch (error) {
        // return false for any error occurance
        if (error instanceof Error)
            return { success: false, message: error.message }
        else
            return { success: false, message: error }
    }
}