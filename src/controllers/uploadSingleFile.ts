// require modules
import { controllerResponse } from "../types"
import path from 'path'
import fs from 'fs'

export async function uploadSingleFile(file: any, body: any): Promise<controllerResponse> {
    try {
        const uploadDirectory: string = path.join(__dirname, '../../../../public/uploads/')
        const directoryExist: boolean = fs.existsSync(uploadDirectory)
        const uploadFolder: string = `${uploadDirectory}${body.folder}`

        if (directoryExist) {
            if (file) {
                let uploaded: boolean = false

                fs.existsSync(uploadFolder) ? null : fs.mkdirSync(uploadFolder)
                file.mv(`${uploadFolder}/${file.name}`, (error: Error) => {
                    if (error)
                        uploaded = false
                    else {
                        uploaded = true
                    }
                })

                if (uploaded)
                    return { success: uploaded, message: 'File has been uploaded' }
                else
                    return { success: uploaded, message: 'Failed to upload file' }
            }
            else
                return { success: false, message: `No file has been provided` }
        }
        else
            return { success: false, message: `Upload directory: ${uploadDirectory} does not exist` }

    } catch (error) {
        // return false for any error occurance
        if (error instanceof Error)
            return { success: false, message: error.message }
        else
            return { success: false, message: error }
    }
}