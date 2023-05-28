// require modules
import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"

// asynchronous function for creating || inserting multiple or single data to database 
export async function insertSingleData(body: any): Promise<controllerResponse> {
    try {

        // get schema for database data insertion
        const schema: controllerResponse = getSchema(body.schema)

        // confirm schema existance
        if (schema.success) {

            // create new data according to the schema provided
            const newData: any = new schema.message(body)

            // save the data
            const dataSaved: any = await newData.save()

            // confirm database data insertion
            if (dataSaved)
                return { success: true, message: dataSaved }
            else
                return { success: false, message: `Failed to create ${body.schema}` }
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
