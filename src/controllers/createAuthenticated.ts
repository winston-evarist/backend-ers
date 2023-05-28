// require modules
import { controllerResponse } from "../types"
import {getSchema} from "../config/getModel"
import bcrypt from 'bcryptjs'

export async function createAuthenticated(body: any): Promise<controllerResponse> {
    try {
        const schema: controllerResponse = getSchema(body.schema)

        if (schema.success) {
            const newData = new schema.message(body)
            const salt: string | null = bcrypt.genSaltSync(10)
            const hash: string | null = bcrypt.hashSync(newData[body.field], salt)

            if (hash) {
                newData[body.field] = hash
                const dataSaved: any = await newData.save()

                if (dataSaved)
                    return { success: true, message: dataSaved }
                else
                    return { success: false, message: `Failed to create ${body.schema}` }
            }
            else {
                return { success: false, message: `Failed to create ${body.schema}` }
            }
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