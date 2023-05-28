// require modules
import { controllerResponse } from "../types"
import { getSchema, getAllSchema } from "../config/getModel"

// asynchronous function to delete multiple or single data in the database 
export async function deleteMultipleData(queries: any[]): Promise<controllerResponse> {
    try {
        const deletedSuccessfully: any[] = []
        const failedToDelete: any[] = []

        for (let query of queries) {
            let { schema, condition }: any = query
            const tableSchema: controllerResponse = getSchema(schema)

            if (tableSchema.success) {
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
                    deletedSuccessfully.push(dataDeleted)
                }
                else
                    failedToDelete.push({ schema, condition })

            }
            else
                failedToDelete.push({ schema, condition, reason: tableSchema.message })
        }

        if (failedToDelete.length === 0)
            return { success: true, message: deletedSuccessfully }
        else
            return { success: false, message: { deletedSuccessfully, failedToDelete } }

    } catch (error) {
        // return false for any error occurance
        if (error instanceof Error)
            return { success: false, message: error.message }
        else
            return { success: false, message: error }
    }
}