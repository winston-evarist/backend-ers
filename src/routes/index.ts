// require dependencies
import { Router, Request, Response } from 'express'
import controller from '../controllers'

// initializing express router 
const router: Router = Router()

router.get('/version', (_request: Request, response: Response) => {
    try {
        const version: string = 'v0.0.2'
        response.json({ success: true, message: version})
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
})

router.post('/create', async (request: Request, response: Response) => {
    try {
        response.json(await controller.insertSingleData(request.body))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.post('/bulk-create', async (request: Request, response: Response) => {
    try {
        response.json(await controller.insertMultipleData(request.body))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.get('/read', async (request: Request, response: Response) => {
    try {
        response.json(await controller.read(request.query))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.put('/update', async (request: Request, response: Response) => {
    try {
        response.json(await controller.updateSingleData(request.body))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.put('/bulk-update', async (request: Request, response: Response) => {
    try {
        response.json(await controller.updateMultipleData(request.body))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.delete('/delete', async (request: Request, response: Response) => {
    try {
        response.json(await controller.deleteSingleData(request.query))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.delete('/bulk-delete', async (request: Request, response: Response) => {
    try {
        const { queries }: any = request.query
        response.json(await controller.deleteMultipleData(queries))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.get('/list', async (request: Request, response: Response) => {
    try {
        response.json(await controller.list(request.query))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.get('/list-all', async (request: Request, response: Response) => {
    try {
        response.json(await controller.listAll(request.query))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.get('/validate', async (request: Request, response: Response) => {
    try {
        response.json(await controller.validate(request.query))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.post('/create-authenticated', async (request: Request, response: Response) => {
    try {
        response.json(await controller.createAuthenticated(request.body))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.post('/authenticated-login', async (request: Request, response: Response) => {
    try {
        response.json(await controller.loginAuthenticated(request.body))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.get('/validate-authenticated', async (request: Request, response: Response) => {
    try {
        response.json(await controller.validateAuthenticated(request.query))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.post('/change-authenticated', async (request: Request, response: Response) => {
    try {
        response.json(await controller.changeAuthenticated(request.body))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.post('/upload-file', async (request: Request, response: Response) => {
    try {
        let { body }: any = request.body
        const { file }: any = request.files
        body = JSON.stringify(body)
        response.json(await controller.uploadSingleFile(file, body))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

router.delete('/delete-file', async (request: Request, response: Response) => {
    try {
        response.json(await controller.deleteSingleFile(request.query))
    } catch (error) {
        // JSON response with the error occured
        if (error instanceof Error)
            response.json({ success: false, message: error.message })
        else
            response.json({ success: false, message: error })
    }
})

export default router
