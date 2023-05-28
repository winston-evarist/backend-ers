// require modules
import { controllerResponse } from "../types"
import path from 'path'
import fs from 'fs'


export async function deleteSingleFile(query: object): Promise<controllerResponse> {
    try {
        const { folder, fileName }: any = query

        if (folder?.trim() !== '') {
            if (fileName?.trim() !== '') {
                const uploadDirectory: string = path.join(__dirname, `../../../../public/uploads/${folder}/${fileName}`)
                const fileExist: boolean = fs.existsSync(uploadDirectory)

                if (fileExist) {
                    fs.unlinkSync(uploadDirectory)
                    return { success: true, message: 'File has been deleted' }
                }
                else {
                    return { success: false, message: `${fileName} does not exist` }
                }
            }
            else {
                return { success: false, message: 'No file name has been provided' }
            }
        }
        else {
            return { success: false, message: 'No folder has been provided' }
        }

    } catch (error) {
        // return false for any error occurance
        if (error instanceof Error)
            return { success: false, message: error.message }
        else
            return { success: false, message: error }
    }
}