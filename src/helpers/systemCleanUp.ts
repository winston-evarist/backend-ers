// import branch from "../models/branch"
// import activity from "../models/activity"
// // import { models } from '../config/index'

// // current date 
// const currentDate: Date = new Date();

// async function systemCleanup(): Promise<void> {
//     try {
//         (await branch.find({ days: { $lte: 0 } })).forEach(async (userBranch) => {
//             // find shop latest activity
//             const latestActivity: any = await activity.findOne({ branch: userBranch._id }).sort({ createdAt: -1 }).exec()

//             // get shop created date or latest shop activity
//             const pastDate: Date = latestActivity ? new Date(latestActivity.createdAt) : new Date(userBranch.createdAt)

//             // get difference in time between current date and past date
//             const timeDifference: number = currentDate.getTime() - pastDate.getTime()

//             // get total number of days between days 
//             const days: number = timeDifference / (1000 * 3600 * 24)

//             // check if days have exceed 30 days 
//             if (days >= 30)
//                 wipeBranch(userBranch._id)
//         })

//         setInterval(() => {
//             systemCleanup()
//         }, 86400000)

//     } catch (error) {
//         if (error instanceof Error)
//             console.log(error.message)
//         else
//             console.log(error)
//         setInterval(() => {
//             systemCleanup()
//         }, 86400000)

//     }
// }
// systemCleanup()

// async function wipeBranch(branchId: any): Promise<void> {
//     try {
//         // delete branch
//         branch.findByIdAndDelete(branchId).exec()

//         // delete other branch data 
//         const modelNames: any = Object.keys(models)
//         for (let modelName of modelNames) {
//             await models[modelName].deleteMany({ branch: branchId }).exec()
//         }

//     } catch (error) {
//         if (error instanceof Error)
//             console.log(error.message)
//         else
//             console.log(error)
//     }
// }

// // delete all deleted data after 30 days 
// async function wipeData(): Promise<void> {
//     try {
//         // delete other branch data 
//         const modelNames: any = Object.keys(models)
//         for (let modelName of modelNames) {
//             (await models[modelName].find({ $or: [{ visible: false }, { type: 'danger' }, { restored: false }, { type: 'warn' }, { restored: true }] })).forEach(async (data: any) => {
//                 // get data last updated date
//                 const pastDate: Date = new Date(data.updatedAt)

//                 // get difference in time between current date and past date
//                 const timeDifference: number = currentDate.getTime() - pastDate.getTime()

//                 // get total number of days between days 
//                 const days: number = timeDifference / (1000 * 3600 * 24)

//                 // check if days have exceed 7 days 
//                 if (days >= 7) {
//                     await models[modelName].findByIdAndDelete(data._id).exec()
//                 }
//             })
//         }

//         setInterval(() => {
//             wipeData()
//         }, 86400000)

//     } catch (error) {
//         setInterval(() => {
//             wipeData()
//         }, 86400000)
//         if (error instanceof Error)
//             console.log(error.message)
//         else
//             console.log(error)
//     }
// }

// wipeData()
export  {}