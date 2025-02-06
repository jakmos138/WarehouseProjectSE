const secondaryParseFields = function(data, ...names) {
    let out = {}
    names.forEach(e => {
        if (data[e] !== undefined) out[e] = data[e][0];
        else out[e] = null;
    });
    return out;
}

const validateProperty = function(value, type) {

}

export { secondaryParseFields, validateProperty };