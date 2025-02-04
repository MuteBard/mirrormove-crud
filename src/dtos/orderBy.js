function orderByEnum(term){
    if (!term) return;
    const orderByMap = {
        NAME: 'NAME',
        SECONDS: 'SECONDS',
        CREATEDAT: 'CREATEDAT',
        UPDATEDAT: 'UPDATEDAT'
    }
    const orderbyValue = orderByMap[term.toUpperCase()]
    if (!orderbyValue) throw new Error(`Invalid orderBy value provided: ${term}`)
    return orderbyValue;
}

exports.orderByEnum = orderByEnum;