import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import AfricasTalking from 'africastalking'
import { code, webpush, session, notification } from '../interface'
import Code from '../models/code'
import User from '../models/user'
import Session from '../models/session'
import WebPush from '../models/webpush'
import { pushNotification, reFormatText } from '../helpers'
import branch from '../models/branch'
import { controllerResponse } from '../types'
import { getAllSchema, getSchema } from '../config/getModel'

const key: string = 'd075ffe6c54f704b663e9253b20827a21eb3b3dd782a95d381510c853b9cd478'
const username: string = 'taprotec'
const application: string = 'ers'
const smsInstance: any = new AfricasTalking({
    username,
    apiKey: key
})
const router: Router = Router()

// CREATE ROUTE 
router.post("/create", async (request: Request, response: Response) => {
    try {
        let { model }: any = request.body
        model = model?.toLowerCase()
        const schema: controllerResponse = getSchema(model)
        if (schema.success) {
            const newData: any = new schema.message(request.body)
            const dataSaved: any = await newData.save()
            if (dataSaved)
                response.json({ success: true, message: dataSaved })
            else
                response.json({ success: false, message: "Failed to create " + model })
        }
        else
            response.json({ success: false, message: 'Invalid model name' })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// READ ROUTE
router.use("/read", async (request: Request, response: Response) => {
    try {
        let { model, id }: any = request.query
        model = model?.toLowerCase()
        const schema: controllerResponse = getSchema(model)
        if (schema.success) {
            const data: any = await schema.message.findById(id).exec()
            if (data)
                response.json({ success: true, message: data })
            else
                response.json({ success: false, message: model + " does not exist" })
        }
        else {
            response.json({ success: false, message: "Invalid model name" })
        }
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// UPDATING ROUTE
router.put("/update", async (request: Request, response: Response) => {
    try {
        let { condition, body, model }: any = request.body
        model = model?.toLowerCase()
        const schema: controllerResponse = getSchema(model)
        if (schema.success) {
            const dataUpdated: any = await schema.message.findOneAndUpdate(condition, { $set: body }, { new: true, upsert: false })
            if (dataUpdated) {
                response.json({ success: true, message: dataUpdated })
                const notification: notification = {
                    user: dataUpdated.created_by,
                    branch: dataUpdated.branch,
                    message: ''
                }
                if (model === 'product') {
                    if ((dataUpdated.stock <= dataUpdated.reorder_stock_level) && (dataUpdated.stock > 0)) {
                        pushNotification({ ...notification, message: `${reFormatText(dataUpdated.name).toUpperCase()} stock will finish soon, available stock is ${dataUpdated.stock}.` })
                    }
                    else if (dataUpdated.stock <= 0) {
                        pushNotification({ ...notification, message: `${reFormatText(dataUpdated.name).toUpperCase()} stock has finished.` })
                    }
                }
                else if (model === 'store_product') {
                    if (dataUpdated.stock <= 0) {
                        pushNotification({ ...notification, message: `${reFormatText(dataUpdated.name).toUpperCase()} store stock has finished.` })
                    }
                }
            }
            else
                response.json({ success: false, message: "Failed to update " + model })
        }
        else
            response.json({ success: false, message: "Invalid model name" })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// LISTING (PAGINATION) 
router.use("/list", async (request: Request, response: Response) => {
    try {
        let { page, limit, order, condition, model }: any = request.query
        model = model?.toLowerCase()
        const schema: controllerResponse = getSchema(model)

        if (schema.success) {
            condition = JSON.parse(condition)
            condition = model !== 'payment' ? { ...condition, visible: true } : { ...condition }
            order = JSON.parse(order)
            page = Number(page)
            limit = Number(limit)
            const start: number = (page - 1) * limit
            const end: number = page * limit
            const total: number = await schema.message.find(condition).countDocuments().exec()
            const data: any = {
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

            data.list = await schema.message
                .find(condition)
                .limit(limit)
                .skip(start)
                .sort(order)
                .exec()

            if (data.list.length > 0)
                response.json({ success: true, message: data })
            else
                response.json({ success: false, message: "No " + model + " has been found" })
        }
        else
            response.json({ success: false, message: 'Invalid model name' })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// LISTING ALL 
router.use("/list-all", async (request: Request, response: Response) => {
    try {
        let { order, condition, model }: any = request.query
        model = model?.toLowerCase()
        const schema: controllerResponse = getSchema(model)
        if (schema.success) {
            condition = JSON.parse(condition)
            condition = model !== 'payment' ? { ...condition, visible: true } : { ...condition }
            order = JSON.parse(order)
            const list: any[] = await schema.message
                .find(condition)
                .sort(order)
                .exec()

            if (list.length > 0)
                response.json({ success: true, message: list })
            else
                response.json({ success: false, message: "No " + model + " has been found" })
        }
        else
            response.json({ success: false, message: 'Invalid model name' })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// VALIDATE ROUTE
router.get("/validate", async (request: Request, response: Response) => {
    try {
        let { model, validation, condition, id }: any = request.query
        model = model?.toLowerCase()
        const schema: controllerResponse = getSchema(model)

        if (schema.success) {
            condition = JSON.parse(condition)
            condition = { ...condition, visible: true }
            switch (validation) {
                case 'create':
                    const dataExist: any = await schema.message.findOne(condition).exec()

                    if (dataExist) {
                        response.json({ success: true, message: dataExist })
                        if (model === 'code') {
                            User.findOneAndUpdate
                                (
                                    { _id: dataExist?.user._id, phone_number_verified: false },
                                    { $set: { phone_number_verified: true } },
                                    { new: true, upsert: false }
                                ).exec()
                        }
                    }

                    else
                        response.json({ success: false, message: 'No data found' })
                    break

                case 'update':
                    const dataExist2: any = await schema.message.findOne(condition).exec()

                    if (dataExist2)
                        if (dataExist2._id == id)
                            response.json({ success: false, message: 'No data found' })
                        else
                            response.json({ success: true, message: dataExist })
                    else
                        response.json({ success: false, message: 'No data found' })

                    break

                default: response.json({ success: false, message: 'Server error' })
            }
        }
        else
            response.json({ success: false, message: 'Invalid model name' })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// PING ROUTE 
router.get("/ping", async (_request: Request, response: Response) => {
    try {
        response.json({ success: true })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

router.delete("/delete", async (request: Request, response: Response) => {
    try {
        let { schema, id, action }: any = request.query
        const tableSchema: controllerResponse = getSchema(schema)

        if (tableSchema.success) {
            const body: object = action === 'delete' ? { visible: false } : { visible: true }
            const dataUpdated: any = await tableSchema.message.findOneAndUpdate({ _id: id }, { $set: body }, { new: true, upsert: false })

            if (dataUpdated) {
                response.json({ success: true, message: dataUpdated })
                const tableSchemas: controllerResponse = getAllSchema()

                if (tableSchemas.success) {
                    for (let tableSchema of tableSchemas.message) {
                        await tableSchema.updateMany({ [schema]: id }, { $set: body }, { new: true, upsert: false }).exec()
                    }
                }
            }
            else
                response.json({ success: false, message: "Failed to delete " + schema })
        }
        else {
            response.json(tableSchema)
        }

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// send code
async function sendCode(user: any): Promise<boolean> {
    try {
        const vCode: number = Math.floor(100000 + Math.random() * 900000)
        const newCode: code = new Code({
            user: user._id,
            branch: user.branch?._id,
            code: vCode,
            createdAt: new Date()
        })
        const codeSaved: null | code = await newCode.save()

        if (codeSaved) {
            const result: any = await smsInstance.SMS.send({
                message: `Your ERS authentication code is: ${vCode}.\nValid for 5 minutes`,
                to: '+255' + user.phone_number.substring(1),
                from: application
            })

            if (result.SMSMessageData.Recipients[0].status === 'Success') {
                return true
            }
            else
                return false
        }
        else
            return false

    } catch (error) {
        return false
    }
}

// SEND CODE 
router.post('/send-code', async (request: Request, response: Response) => {
    try {
        const { account }: any = request.body
        const user: any = await User.findOne({ $or: [{ username: account }, { phone_number: account }] }).exec()

        if (user) {
            const codeSent: boolean = await sendCode(user)
            if (codeSent)
                response.json({ success: true, message: user })
            else
                response.json({ success: false, message: 'Failed to send verification code' })
        }
        else
            response.json({ success: false, message: 'Account does not exist' })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// SEND MESSAGE 
router.post('/send-message', async (request: Request, response: Response) => {
    try {
        const { message, numbers }: any = request.body
        const failedNumbers: string[] = []

        for (let number of numbers) {
            const result: any = await smsInstance.SMS.send({
                message: message,
                to: `+255${number.substring(1)}`,
                from: application
            })

            if (result.SMSMessageData.Recipients[0].status !== 'Success')
                failedNumbers.push(number)
        }

        if (failedNumbers.length === 0)
            response.json({ success: true, message: `${numbers.length} message(s) have been sent` })
        else
            response.json({ success: false, message: failedNumbers })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// WEBPUSH  
router.post('/web-push', async (request: Request, response: Response) => {
    try {
        const { user, subscribing, branch }: any = request.body
        const newWebPush: webpush = new WebPush({
            branch,
            user,
            endpoint: subscribing.endpoint,
            keys: subscribing.keys
        })

        const webPushSaved: webpush | null = await newWebPush.save()

        if (webPushSaved)
            response.json({ success: true, message: webPushSaved })
        else
            response.json({ success: false })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// LOGIN
router.post('/auth-login', async (request: Request, response: Response) => {
    try {
        const { account, password }: any = request.body
        const user: any = await User.findOne({
            $or: [
                { phone_number: account },
                { username: account },
            ],
            visible: true
        }).exec()

        if (user) {
            const match: boolean = bcrypt.compareSync(password, user.password)
            if (match) {
                const newSession: session = new Session({
                    user: user._id,
                    branch: user.branch?._id
                })
                const sessionSaved: session | null = await newSession.save()

                if (sessionSaved) {
                    if (user.phone_number_verified) {
                        response.json({ success: true, message: { user, verify: false }, })
                        pushNotification({ message: 'You have been logged in to ERS.', user: user._id, branch: user.branch?._id })
                    }
                    else {
                        const codeSent: any = await sendCode(user)
                        if (codeSent) {
                            response.json({ success: true, message: { user, verify: true } })
                            pushNotification({ message: 'You have been logged in to ERS.', user: user._id, branch: user.branch?._id })
                        }
                        else {
                            response.json({ success: false, message: 'Failed to login' })
                            Session.findByIdAndDelete(sessionSaved._id).exec()
                        }
                    }
                }
                else {
                    response.json({ success: false, message: 'Failed to login' })
                }
            }
            else
                response.json({ success: false, message: 'Password is not correct' })
        }
        else
            response.json({ success: false, message: 'Account does not exist' })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// LOGOUT
router.post('/auth-logout', async (request: Request, response: Response) => {
    try {
        const { user }: any = request.body
        const sessionUpdated: session | null = await Session.findOneAndUpdate
            (
                { user, status: 'active' },
                { status: 'inactive', updated_by: user },
                { new: true }
            ).exec()

        if (sessionUpdated) {
            response.json({ success: true, message: 'You have been logged out' })
            pushNotification({ message: 'You have been logged out from ERS.', user, branch: sessionUpdated.branch?._id })
        }
        else
            response.json({ success: false, message: 'Failed to logout' })

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

router.use('/search', async (request: Request, response: Response) => {
    try {
        let { schema, keyword, condition }: any = request.query
        const tableSchema: controllerResponse = getSchema(schema)

        if (tableSchema.success) {
            keyword = new RegExp(keyword, 'i')
            condition = JSON.parse(condition)
            condition = { ...condition, visible: true }
            switch (schema) {
                case 'product':
                    condition = {
                        ...condition, $or: [
                            { name: keyword },
                            { description: keyword },
                            { generic_name: keyword },
                            { barcode: keyword },
                            { type: keyword },
                        ]
                    }
                    break
                case 'category':
                case 'expense_type':
                case 'store':
                case 'store_product':
                    condition = {
                        ...condition, $or: [
                            { name: keyword },
                        ]
                    }
                    break
                case 'unit':
                    condition = {
                        ...condition, $or: [
                            { name: keyword },
                            { abbreviation: keyword },
                        ]
                    }
                    break
                case 'expense':
                case 'role':
                    condition = {
                        ...condition, $or: [
                            { name: keyword },
                            { description: keyword },
                        ]
                    }
                    break
                case 'manufacturer':
                case 'supplier':
                case 'customer':
                    condition = {
                        ...condition, $or: [
                            { name: keyword },
                            { phone_number: keyword },
                            { tin: keyword },
                            { location: keyword },
                        ]
                    }
                    break
                case 'batch':
                    condition = {
                        ...condition, $or: [
                            { number: keyword },
                        ]
                    }
                    break
                case 'user':
                    condition = {
                        ...condition, $or: [
                            { username: keyword },
                            { phone_number: keyword },
                        ]
                    }
                    break
                case 'branch':
                    condition = {
                        ...condition, $or: [
                            { location: keyword },
                            { tin: keyword },
                            { name: keyword },
                            { phone_number: keyword },
                            { type: keyword },
                        ]
                    }
                    break
                case 'activity':
                    condition = {
                        ...condition, $or: [
                            { type: keyword },
                            { name: keyword },
                            { activity_model: keyword },
                        ]
                    }
                    break
                case 'device':
                    condition = {
                        ...condition, $or: [
                            { device_model: keyword },
                            { name: keyword },
                            { imei: keyword },
                            { brand: keyword },
                            { description: keyword },
                            { type: keyword },
                            { keys: keyword },
                            { values: keyword },
                        ]
                    }
                    break
                default: condition = { ...condition, visible: true }
            }

            const list: any[] = await tableSchema.message
                .find(condition)
                .sort({ createdAt: 1 })
                .exec()

            if (list.length > 0)
                response.json({ success: true, message: list })
            else
                response.json({ success: false, message: "No " + schema + " has been found" })
        }
        else {
            response.json(tableSchema)
        }

    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

// register
router.post('/register', async (request: Request, response: Response) => {
    try {
        const { name, phone_number, username, password, type, setting }: any = request.body
        const newBranch: any = new branch({
            name,
            type,
            phone_number,
        })
        const newUser: any = new User({
            username,
            phone_number,
            branch: newBranch._id,
            setting
        })
        const newSession: any = new Session({
            user: newUser._id,
            branch: newBranch._id
        })
        newBranch.user = newUser._id
        newUser.created_by = newUser._id
        const salt: string | undefined | null = bcrypt.genSaltSync(10)
        const hash: string | undefined | null = bcrypt.hashSync(password, salt)

        if (salt && hash) {
            newUser.password = hash
            const userSaved: any = await newUser.save()

            if (userSaved) {
                const branchSaved: any = await newBranch.save()

                if (branchSaved) {
                    const sessionSaved: any = await newSession.save()

                    if (sessionSaved) {
                        const codeSent: boolean = await sendCode(userSaved)

                        if (codeSent) {
                            response.json({ success: true, message: userSaved })
                        }
                        else {
                            response.json({ success: false, message: 'Failed to register user' })
                            User.findByIdAndDelete(userSaved._id).exec()
                            Session.findByIdAndDelete(sessionSaved._id).exec()
                            branch.findByIdAndDelete(branchSaved._id).exec()
                        }
                    }
                    else {
                        response.json({ success: false, message: 'Failed to register user' })
                        User.findByIdAndDelete(userSaved._id).exec()
                        branch.findByIdAndDelete(branchSaved._id).exec()
                    }
                }
                else {
                    response.json({ success: false, message: 'Failed to register user' })
                    User.findByIdAndDelete(newUser._id).exec()
                }
            }
            else {
                response.json({ success: false, message: 'Failed to register user' })
            }
        }
        else {
            response.json({ success: false, message: 'Failed to register user' })
        }
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

export default router
