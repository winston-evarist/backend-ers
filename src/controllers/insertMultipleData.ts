// require modules
import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"

// asynchronous function for creating || inserting multiple or single data to database 
export async function insertMultipleData(bodyArray: any[]): Promise<controllerResponse> {
    try {
        const createdSuccessfully: any[] = []
        const failedToCreate: any[] = []

        for (let body of bodyArray) {
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
                    createdSuccessfully.push(dataSaved)
                else
                    failedToCreate.push(body)
            }
            else
                failedToCreate.push({ ...body, reason: schema.message })
        }


        if (failedToCreate.length === 0)
            return { success: true, message: createdSuccessfully }
        else
            return { success: false, message: { createdSuccessfully, failedToCreate } }

    } catch (error) {
        // return false for any error occurance
        if (error instanceof Error)
            return { success: false, message: error.message }
        else
            return { success: false, message: error }
    }
}
