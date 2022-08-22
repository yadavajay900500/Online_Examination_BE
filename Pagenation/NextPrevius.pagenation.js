const questionModel = require("../models/questionPaper.module");
const mongoose=require("mongoose")


 exports.paginated_results = async (page=1, PAGE_SIZE, data) => {
    PAGE_SIZE =PAGE_SIZE ? parseInt(PAGE_SIZE) : data.length
        const skip = (page - 1) * PAGE_SIZE;        // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
        let result=await questionModel.find({})  
                        .skip(skip)                 // Same as before, always use 'skip' first
                        .limit(PAGE_SIZE)
        
        return result
    }

