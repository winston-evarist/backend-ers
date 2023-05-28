import { notification } from "../interface"
import User from "../models/user"
import bcrypt from 'bcryptjs'
import WebPush from "../models/webpush"
import webpush from 'web-push'
import branch from "../models/branch"

const publicKey: string = 'BF-MlH9ab1HOAQjVh4aaUaWHFje-oS0K_K1Kf1eXyvLFcz-1XN01VoCm9MWWBqt7AYuEkNjlJrm2sEhx70exfxU'
const privateKey: string = 'sitHSnHB3BcOdRcwt0L8Bs_6bJrQHT8RTl9-l5ueLys'


// administrator creation
export async function createAdmin(): Promise<void> {
    try {
        let user: any = await User.findOne({ role: null, branch: null, account_type: 'smasapp' }).exec()

        if (user === null) {
            const newUser: any = new User({
                username: 'mocos',
                phone_number: '0710010010',
                phone_number_verified: true,
                account_type: 'smasapp',
                branch: null,
                role: null,
                setting: {
                    theme: 'dark',
                    language: 'English',
                    font: 'Single Day'
                }
            })

            const salt: string | null = bcrypt.genSaltSync(10)
            const hash: string | null = bcrypt.hashSync('saGma@2022', salt)

            if (hash) {
                newUser.password = hash
                newUser.created_by = newUser?._id
                const userSaved: any = await newUser.save()
                if (userSaved)
                    console.log(`Adminstrator account has been created`)
                else
                    console.log(`Failed to create adminstrator, user saving level`)
            }
            else
                console.log(`Failed to create adminstrator, hash level`)
        }
    } catch (error) {
        console.log(`Failed to create adminstrator, Error level: ${error.message}`)
    }
}

// push notification function
export async function pushNotification(notification: notification) {
    try {
        const userAddress: any[] = await WebPush.find({branch: notification.branch }).exec()
        if (userAddress.length > 0) {
            for (let address of userAddress) {
                const subscriber: webpush.PushSubscription = {
                    endpoint: address.endpoint,
                    keys: {
                        auth: address.keys.auth,
                        p256dh: address.keys.p256dh
                    }
                }

                const payload: string = JSON.stringify({
                    message: notification.message,
                })

                const options: object = {
                    vapidDetails: {
                        subject: 'mailto:taprotec@gmail.com',
                        publicKey,
                        privateKey
                    },
                    TTL: 60
                }

                webpush
                    .sendNotification(
                        subscriber,
                        payload,
                        options
                    )
                    .then(_response => {
                        // console.log(response)
                    })
                    .catch((_error: Error) => { })
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}

export async function hasDays(id: any): Promise<boolean> {
    try {
        if (id.trim() !== '') {
            const branchExist: any = await branch.findById(id).exec()

            if (branchExist) {
                if (branchExist?.days > 0) {
                    return true
                }
                else {
                    const notification: notification = {
                        user: branchExist?.user?._id,
                        branch: id,
                        message: 'Your subscription has ended'
                    }
                    pushNotification(notification)
                    return false
                }
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        }
        else {
            console.error(error)
        }
        return false
    }
}

export function reFormatText(text: string): string {
    if (typeof (text) === 'string') {
        text = text.toLowerCase().trim()
        text = text.replace(/_/gi, ' ')
        return text
    }
    else {
        return text
    }
}