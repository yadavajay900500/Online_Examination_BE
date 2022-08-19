const questionModel = require("../models/questionPaper.module");

exports.paginated_results = async (page , limit, data) => {
    console.log("/////////////////////////////////", page, limit)
    page = page ? parseInt(page) : 1
    limit = limit ? parseInt(limit) : 1
    console.log(".>>>>>>>>>>>>>>>>>>>>>>>>>", page, limit)
    let startIndex = (page - 1) * limit
    let endIndex = page * limit
    const length = data.length
    let result = {}


    if (endIndex < length) {
        result.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        result.previous = {
            page: page - 1,
            limit: limit
        }
    }
    result.data = data.slice(startIndex, endIndex)

    return result;

}

// exports.paginated_results = async (page=1, PAGE_SIZE, data) => {
//     PAGE_SIZE =PAGE_SIZE ? parseInt(PAGE_SIZE) : 20
//         //const PAGE_SIZE = 20;                       // Similar to 'limit'
//         const skip = (page - 1) * PAGE_SIZE;        // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
//         let re=data.find({})  
//                         .skip(skip)                 // Same as before, always use 'skip' first
//                         .limit(PAGE_SIZE)
//         console.log("pesination",re)
//         return re
//     }
