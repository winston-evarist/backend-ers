// require modules
import fs from 'fs'
import path from 'path'
import { controllerResponse } from '../types'

// function to get single table schema 
export function getSchema(fileName: string): controllerResponse {
    try {
        // get file extension
        const fileExtension: string = path.extname(__filename)

        // predicted schema path || directory 
        const schemaDirectory: string = path.join(__dirname, `../models/${fileName}${fileExtension}`)

        // check schema directory existance 
        const schemaDirectoryExist: boolean = fs.existsSync(schemaDirectory)

        // confirm schema directory existance 
        if (schemaDirectoryExist) {
            const message = require(schemaDirectory)
            return { success: true, message: message.default }
        }
        // return the actual schema
        else
            // schema directory does not exist 
            return { success: false, message: `${fileName} table schema in ${schemaDirectory} does not exist` }

    } catch (error) {
        // return false for any error occurance 
        if (error instanceof Error)
            return { success: false, message: error.message }
        else
            return { success: false, message: error }
    }
}

// function to get table schema 
export function getAllSchema(): controllerResponse {
    try {
        // holding all table schema
        const schemas: any[] = []

        // predicted schema path || directory 
        const schemaDirectory: string = path.join(__dirname, `../models`)

        // check schema directory existance 
        const schemaDirectoryExist: boolean = fs.existsSync(schemaDirectory)

        // confirm schema directory existance 
        if (schemaDirectoryExist) {

            // get all files in model folder
            const files: string[] = fs.readdirSync(schemaDirectory)

            // confirm the folder has files
            if (files.length > 0) {

                // loop over the files and load file schema
                for (let file of files) {
                    const schema = require(`${schemaDirectory}/${file}`)
                    schemas.push(schema.default)
                }
            }
        }

        // confirm if there is table schema
        if (schemas.length > 0)
            return { success: true, message: schemas }
        else
            return { success: false, message: 'no schema has been found' }

    } catch (error) {
        // return false for any error occurance 
        if (error instanceof Error)
            return { success: false, message: error.message }
        else
            return { success: false, message: error }
    }
}
