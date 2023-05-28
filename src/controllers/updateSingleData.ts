// require modules
import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"

// asynchronous function for updating  multiple or single data to database 
export async function updateSingleData(body: any): Promise<controllerResponse> {
    try {

        // get schema for database data updating
        const schema: controllerResponse = getSchema(body.schema)

        // confirm schema existance
        if (schema.success) {

            // update data according to the condition provided
            const dataUpdated: any = await schema.message.findOneAndUpdate(body.condition, { $set: body.newData }, { upsert: false, new: true })

            // confirm data have been updated
            if (dataUpdated)
                return { success: true, message: dataUpdated }
            else
                return { success: false, message: `Failed to update ${body.schema}` }
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