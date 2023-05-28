// require modules
import { controllerResponse } from "../types"
import { getSchema } from "../config/getModel"
import bcrypt from 'bcryptjs'

export async function changeAuthenticated(body: any): Promise<controllerResponse> {
    try {
        const { schema, field, id, auth }: any = body
        const tableSchema: controllerResponse = getSchema(schema)

        if (tableSchema.success) {
            const salt: string | null = bcrypt.genSaltSync(10)
            const hash: string | null = bcrypt.hashSync(auth, salt)

            if (hash) {
                const dataUpdated: any = await tableSchema.message.findOneAndUpdate({ _id: id }, { [field]: hash }, { upsert: false, new: true })

                if (dataUpdated)
                    return { success: true, message: `${schema} auth has been changed` }
                else
                    return { success: false, message: `Failed to change ${schema} auth` }
            }
            else
                return { success: false, message: `Failed to change ${schema} auth` }
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