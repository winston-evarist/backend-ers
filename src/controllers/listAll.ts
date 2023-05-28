// require modules
import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"

// asynchronous function for listing data from database 
export async function listAll(query: object): Promise<controllerResponse> {
    try {
        let { sort, condition, schema }: any = query

        // get schema for database data insertion
        const tableSchema: controllerResponse = getSchema(schema)

        // confirm schema existance
        if (tableSchema.success) {
            condition = JSON.parse(condition)
            sort = JSON.parse(sort)
            const data: any[] = await tableSchema.message
                .find(condition)
                .sort(sort)
                .exec()

            // confirm data existance
            if (data.length > 0)
                return { success: true, message: data }
            else
                return { success: false, message: `No ${schema} has been found` }
        }
        else
            return schema

    } catch (error) {
        // return false for any error occurance
        if (error instanceof Error)
            return { success: false, message: error.message }
        else
            return { success: false, message: error }
    }
}