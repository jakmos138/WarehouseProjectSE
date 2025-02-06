const sendSuccess = function(res, code, data = null) {
    res.status(code).json({
        error: null,
        data: data}
    );
}

const sendError = function(res, code, err = null) {
    res.status(code).json({
        error: err,
        data: null}
    );
}

export { sendSuccess, sendError };