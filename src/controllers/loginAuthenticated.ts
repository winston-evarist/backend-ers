import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"
import bcrypt from 'bcryptjs'

export async function loginAuthenticated(body: any): Promise<controllerResponse> {
    try {
        const { schema, condition, auth, field } = body
        const tableSchema: controllerResponse = getSchema(schema)

        if (tableSchema.success) {
            const dataExist: any = await tableSchema.message.findOne(condition).exec()

            if (dataExist) {
                const match: boolean = bcrypt.compareSync(auth, dataExist[field])

                if (match)
                    return { success: true, message: dataExist }
                else
                    return { success: false, message: `${schema} auth is not correct` }
            }
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