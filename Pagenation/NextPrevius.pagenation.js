
exports.paginated_results = async (page , limit, data) => {
    console.log("/////////////////////////////////", page, limit)
    page = page ? parseInt(page) : 1
    limit = limit ? parseInt(limit) : 2
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