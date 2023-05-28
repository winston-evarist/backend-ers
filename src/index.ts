import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
// import fs from 'fs'
// import https from 'https'
import mongoose from 'mongoose'
// import { serverInformation } from './types'
import apiv1 from './routes'
import apiv2 from './routes/other'
import { createAdmin, hasDays } from './helpers'
import { checkProductStatus, checkStoreProductStatus, decrementDays } from "./helpers/watcher"
import { Decrypt } from './helpers/encryption'
const Port = 9000
const username = `winston-evarist`
const password = `Uncoshon0652164556`
const DatabaseName = 'mocos'
const hostname = `127.0.0.1`

// express initialization
const server: Application = express()
const token: string = "IjE4ODIzMTgxJDJhJDEwJFNXY1dOQ0dsN2ttVjhMSGN5L1QwUE9BbFBzRC82MlVnZ3YzTmVpcE1GeDdaeEt2TlBGdkNDZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5MjUyMjY0NyI="

// dependencies middleware
server.use(express.json())
server.use(require('express-fileupload')())
server.use(require('cors')())
server.use(require('helmet')())

// static files
server.use(express.static(path.join(__dirname, '../public')))

// server information
// const serverInformation: serverInformation = {
//     port: 1016,
//     domain: 'ers.er-s.net',
//     environment: path.extname(__filename) === '.ts' ? 'development' : 'production',
//     databaseName: 'electronic_repair_shop'
// }

// database options
const databaseOptions: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

// database connection string
const databaseConnectionString: string = `mongodb+srv://${username}:${password}@winston-evarist.t3fkcgr.mongodb.net/?retryWrites=true&w=majority`

// SSL options
// const SSLOptions: object = {
//     key: serverInformation.environment === 'production' ? fs.readFileSync(`/etc/letsencrypt/live/${serverInformation.domain}/privkey.pem`) : '',
//     cert: serverInformation.environment === 'production' ? fs.readFileSync(`/etc/letsencrypt/live/${serverInformation.domain}/fullchain.pem`) : ''
// }

// database connection
mongoose
    .connect(databaseConnectionString, databaseOptions)
    .then((databaseConnected) => {
        if (databaseConnected) {
            // start local server
            server.listen(Port, function () {
                console.log(`Server is running on http://${hostname}:${Port} and Database is connected sucessfully to the ${DatabaseName}`)
            })
            // require all database models
            require('./config')
            createAdmin()
            decrementDays()
            checkProductStatus()
            checkStoreProductStatus()
        }
        else
            console.log(`Database connection failed`)

    })
    .catch((error: Error) => console.log(error.message))

server.use(async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allowedOrigins: string[] = ['https://mocos.online/', 'https://mocos.online', 'https://www.mocos.online/', 'https://www.mocos.online', 'http://localhost:3000']
        // if (serverInformation.environment === 'development') {
        //     allowedOrigins.push('http://localhost:3000')
        // }
        const allowedPath: string[] = ['/register', '/auth-login', '/auth-logout']
        const { origin, authorization }: any = request.headers
        const path: string = request.path

        if (authorization === token && allowedOrigins.includes(origin)) {
            if (allowedPath.includes(path)) {
                next()
            }
            else {
                const { branch }: any = request.headers
                if (branch === token) {
                    next()
                }
                else {
                    const decodedBranch: any = Decrypt(branch)
                    const canAccess: boolean = await hasDays(decodedBranch)
                    if (canAccess) {
                        next()
                    }
                    else {
                        response.json({ success: false, message: 'Shop subscription is required' })
                    }
                }
            }
        }
        else {
            response.json({ success: false, message: 'You are not authorized' })
        }

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// application programming interface
server.use('/', apiv1)
server.use('/api', apiv2)

