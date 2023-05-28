// require modules
import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"

// asynchronous function for updating  multiple or single data to database 
export async function updateMultipleData(bodyArray: any[]): Promise<controllerResponse> {
    try {
        const updatedSuccessfully: any[] = []
        const failedToUpdate: any[] = []

        for (let body of bodyArray) {
            // get schema for database data updating
            const schema: controllerResponse = getSchema(body.schema)

            // confirm schema existance
            if (schema.success) {

                // update data according to the condition provided
                const dataUpdated: any = await schema.message.findOneAndUpdate(body.condition, { $set: body.newData }, { upsert: false, new: true })

                // confirm data have been updated
                if (dataUpdated)
                    updatedSuccessfully.push(dataUpdated)
                else
                    failedToUpdate.push(body)
            }
            else
                failedToUpdate.push({ ...body, reason: schema.message })
        }

        if (failedToUpdate.length === 0)
            return { success: true, message: updatedSuccessfully }
        else
            return { success: false, message: { updatedSuccessfully, failedToUpdate } }

    } catch (error) {
        // return false for any error occurance
        if (error instanceof Error)
            return { success: false, message: error.message }
        else
            return { success: false, message: error }
    }
}