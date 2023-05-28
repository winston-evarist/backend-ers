// require modules
import { controllerResponse, list } from "../types"
import { getSchema } from "../config/getModel"

// asynchronous function for listing data from database 
export async function list(query: object): Promise<controllerResponse> {
    try {
        let { page, limit, sort, condition, schema }: any = query

        // get schema for database data insertion
        const tableSchema: controllerResponse = getSchema(schema)

        // confirm schema existance
        if (tableSchema.success) {
            condition = JSON.parse(condition)
            sort = JSON.parse(sort)
            page = Number(page)
            limit = Number(limit)
            const start: number = (page - 1) * limit
            const end: number = page * limit
            const total: number = await tableSchema.message.find(condition).countDocuments().exec()
            const data: list = {
                previous: 0,
                next: 0,
                list: [],
                pages: total
            }

            if (end < total)
                data.next = page + 1
            else
                data.next = 0

            if (start > 0)
                data.previous = page - 1
            else
                data.previous = 0

            data.list = await tableSchema.message
                .find(condition)
                .limit(limit)
                .skip(start)
                .sort(sort)
                .exec()

            // confirm data existance
            if (data.list.length > 0)
                return { success: true, message: data }
            else
                return { success: false, message: `No ${schema} has been found` }
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