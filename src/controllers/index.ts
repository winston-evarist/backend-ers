// require controllers modules
import { controller } from "../types"
import { changeAuthenticated } from "./changeAuthenticated"
import { insertSingleData } from "./insertSingleData"
import { createAuthenticated } from "./createAuthenticated"
import { deleteSingleData } from "./deleteSingleData"
import { list } from "./list"
import { listAll } from "./listAll"
import { loginAuthenticated } from "./loginAuthenticated"
import { read } from "./read"
import { updateSingleData } from "./updateSingleData"
import { validate } from "./validate"
import { validateAuthenticated } from "./validateAuthenticated"
import { uploadSingleFile } from "./uploadSingleFile"
import { deleteSingleFile } from "./deleteSingleFile"
import { updateMultipleData } from "./updateMultipleData"
import { insertMultipleData } from "./insertMultipleData"
import { deleteMultipleData } from "./deleteMultipleData"

// create controllers object
const controller: controller = {
    changeAuthenticated,
    insertSingleData,
    createAuthenticated,
    deleteSingleData,
    list,
    listAll,
    loginAuthenticated,
    read,
    updateSingleData,
    validate,
    validateAuthenticated,
    uploadSingleFile,
    deleteSingleFile,
    updateMultipleData,
    insertMultipleData,
    deleteMultipleData
}

// export controller for global accessibility
export default controller