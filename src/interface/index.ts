import { Document, Schema, SchemaDefinitionProperty } from 'mongoose'

// application server interface
export interface server {
    port: number
    database: string
    environment: 'development' | 'production'
}


// webpush interface
export interface webpush extends Document {
    user: Schema.Types.ObjectId
    endpoint: string
    keys: SchemaDefinitionProperty<keys>
}

// webpush keys interface
interface keys {
    p256dh: string,
    auth: string
}

// notification interface
export interface notification {
    message: string
    user?: any
    branch?: any
}

// verification code interface
export interface code extends Document {
    user: Schema.Types.ObjectId,
    code: number
}

export interface session extends Document {
    user: Schema.Types.ObjectId,
    updated_by: Schema.Types.ObjectId,
    branch: any,
    status: string
}