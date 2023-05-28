// require modules
import { controllerResponse } from "../types"
import { getSchema, getAllSchema } from "../config/getModel"

// asynchronous function to delete multiple or single data in the database 
export async function deleteSingleData(query: object): Promise<controllerResponse> {
    try {
        let { schema, condition }: any = query
        const tableSchema: controllerResponse = getSchema(schema)

        if (tableSchema.success) {
            condition = JSON.parse(condition)

            // delete data from database 
            const dataDeleted: any = await tableSchema.message.findOneAndDelete(condition).exec()

            if (dataDeleted) {

                // load all table schema
                const schemas: controllerResponse = getAllSchema()

                // confirm table schema existance
                if (schemas.success) {
                    // delete related data 
                    for (let tableSchema of schemas.message) {
                        await tableSchema.deleteMany({
                            [schema]: dataDeleted._id
                        }).exec()
                    }
                }

                return { success: true, message: dataDeleted }
            }
            else
                return { success: false, message: `Failed to delete ${schema}` }

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