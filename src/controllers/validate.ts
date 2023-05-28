// require modules
import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"

export async function validate(query: any): Promise<controllerResponse> {
    try {
        let { schema, type, condition, id }: any = query
        condition = JSON.parse(condition)
        const tableSchema: controllerResponse = getSchema(schema)

        if (tableSchema.success) {
            const dataExist: any = await tableSchema.message.findOne(condition).exec()
            let response: any;

            switch (type) {
                case 'create':
                    if (dataExist)
                        response = { success: true, message: dataExist }
                    else
                        response = { success: false, message: `No ${schema} has been found` }
                    break

                case 'update':
                    if (dataExist)
                        if (dataExist._id == id)
                            response = { success: false, message: `No ${schema} has been found` }
                        else
                            response = { success: true, message: dataExist }
                    else
                        response = { success: false, message: `No ${schema} has been found` }
                    break
            }

            return response
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