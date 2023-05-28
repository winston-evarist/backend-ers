import { pushNotification, reFormatText } from "."
import { notification } from "../interface"
import branch from "../models/branch"
import product from "../models/product"
import store_product from "../models/store_product"

export function decrementDays(): void {
    try {
        setInterval(() => {
            branch.updateMany({ days: { $gt: 0 } }, { $inc: { days: -1 } }, { new: true, upsert: false }).exec()
        }, 86400000)
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message)
        }
        else {
            console.error(error)
        }
    }
}

export function checkProductStatus(): void {
    setInterval(async () => {
        try {
            branch.find().then(async (shops: any[]) => {
                try {

                    if (shops.length > 0) {
                        let outOfStock: string = ''
                        let almostOutOfStock: string = ''
                        let expired: string = ''
                        let willExpire: string = ''
                        for (let shop of shops) {
                            const shopNotification: notification = {
                                user: shop?.user?._id,
                                branch: shop?._id,
                                message: ''
                            }
                            if ((shop.days > 10) && (shop.days <= 15)) {
                                const message = `Your subscription will end in ${shop.days}.`
                                pushNotification({ ...shopNotification, message })
                            }
                            else if ((shop.days > 5) && (shop.days <= 10)) {
                                const message = `Your subscription will end in ${shop.days}.`
                                pushNotification({ ...shopNotification, message })
                            }
                            else if ((shop.days > 1) && (shop.days <= 5)) {
                                const message = `Your subscription will end in ${shop.days}.`
                                pushNotification({ ...shopNotification, message })
                            }
                            else if (shop.days <= 0) {
                                const message = `Your subscription has ended ${shop.days}.`
                                pushNotification({ ...shopNotification, message })
                            }

                            const products: any = await product.find({ branch: shop?._id }).exec()
                            if (products.length > 0) {
                                for (let product of products) {
                                    if ((product.stock > 0) && (product.stock <= product.reorder_stock_level)) {
                                        almostOutOfStock = almostOutOfStock + `${reFormatText(product.name).toUpperCase()} - (${product.stock}), `
                                    }
                                    else if (product.stock <= 0) {
                                        outOfStock = outOfStock + `${reFormatText(product.name).toUpperCase()}, `
                                    }

                                    if ((product.expire_date !== null)) {
                                        if (new Date().setHours(23, 59, 59, 999) >= new Date(product.expire_date).setHours(0, 0, 0, 0)) {
                                            expired = expired + `${reFormatText(product.name).toUpperCase()}, `
                                        }
                                        // let today = new Date()
                                        // let afterDate = new Date(new Date().setDate(today.getDate() + 30))

                                        // if ((today.setHours(23, 59, 59, 999) > new Date(product.expire_date).setHours(0, 0, 0, 0)) && (afterDate.setHours(23, 59, 59, 999) >= new Date(product.expire_date).setHours(0, 0, 0, 0))) {
                                        //     willExpire = willExpire + `${reFormatText(product.name).toUpperCase()}, `
                                        // }
                                    }
                                }
                            }
                            const notification: notification = {
                                user: shop.user?._id,
                                branch: shop?._id,
                                message: ''
                            }
                            if (almostOutOfStock.length > 0) {
                                const message = `Almost out of stock:\n${almostOutOfStock.substring(0, almostOutOfStock.length - 2)}.`
                                setTimeout(() => pushNotification({ ...notification, message }), 0)
                            }

                            if (outOfStock.length > 0) {
                                const message = `Out of stock:\n${outOfStock.substring(0, outOfStock.length - 2)}.`
                                setTimeout(() => pushNotification({ ...notification, message }), 30000)
                            }

                            if (expired.length > 0) {
                                const message = `Expired:\n${expired.substring(0, expired.length - 2)}.`
                                setTimeout(() => pushNotification({ ...notification, message }), 60000)
                            }

                            if (willExpire.length > 0) {
                                const message = `Will expire in 30 days:\n${willExpire.substring(0, willExpire.length - 2)}.`
                                setTimeout(() => pushNotification({ ...notification, message }), 90000)
                            }

                        }
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message)
                    }
                    else {
                        console.error(error)
                    }
                }

            })
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
            else {
                console.error(error)
            }
        }
    }, 86400000)
}

export function checkStoreProductStatus(): void {
    setInterval(async () => {
        try {
            branch.find().then(async (shops: any[]) => {
                try {
                    if (shops.length > 0) {
                        let outOfStock: string = ''
                        let almostOutOfStock: string = ''
                        for (let shop of shops) {
                            const products: any = await store_product.find({ branch: shop?._id }).exec()
                            if (products.length > 0) {
                                for (let product of products) {
                                    if ((product.stock > 0) && (product.stock <= product.reorder_stock_level)) {
                                        almostOutOfStock = almostOutOfStock + `${reFormatText(product.name).toUpperCase()} - (${product.stock}), `
                                    }
                                    else if (product.stock <= 0) {
                                        outOfStock = outOfStock + `${reFormatText(product.name).toUpperCase()}, `
                                    }

                                }
                                const notification: notification = {
                                    user: shop.user?._id,
                                    branch: shop?._id,
                                    message: ''
                                }
                                if (almostOutOfStock.length > 0) {
                                    const message = `Almost out of stock (store):\n${almostOutOfStock.substring(0, almostOutOfStock.length - 2)}.`
                                    setTimeout(() => pushNotification({ ...notification, message }), 120000)
                                }

                                if (outOfStock.length > 0) {
                                    const message = `Out of stock (store):\n${outOfStock.substring(0, outOfStock.length - 2)}.`
                                    setTimeout(() => pushNotification({ ...notification, message }), 150000)
                                }
                            }
                        }
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message)
                    }
                    else {
                        console.error(error)
                    }
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
            else {
                console.error(error)
            }
        }
    }, 86400000)
}