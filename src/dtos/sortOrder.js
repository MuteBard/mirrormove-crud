function sortOrderEnum(term) {
    if (!term) return;
    const sortOrderMap = {
        ASC: 'ASC',
        DESC: 'DESC'
    }
    const sortOrderValue = sortOrderMap[term.toUpperCase()]
    if (!sortOrderValue) throw new Error(`Invalid sortOrder value provided: ${term}`)
    return sortOrderValue;
}

exports.sortOrderEnum = sortOrderEnum;