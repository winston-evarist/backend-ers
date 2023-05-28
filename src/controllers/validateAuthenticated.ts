// require modules
import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"
import bcrypt from 'bcryptjs'

export async function validateAuthenticated(query: any): Promise<controllerResponse> {
    try {
        const { schema, id, auth, field }: any = query
        const tableSchema: controllerResponse = getSchema(schema)

        if (tableSchema.success) {
            const dataExist: any = await tableSchema.message.findById(id).exec()

            if (dataExist) {
                const authMatch: boolean = bcrypt.compareSync(auth, dataExist[field])

                if (authMatch)
                    return { success: true, message: `${schema} auth matched` }
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