let errorMessages = {
    400: "400 Bad Request",
    401: "401 Unauthorized",
    403: "403 Forbidden",
    404: "404 Not Found",
    409: "409 Conflict",
    500: "500 Internal Server Error",
    501: "501 Not Implemented"
}

const sendSuccess = function(res, code, data = null) {
    res.status(code).json({
        error: null,
        data: data}
    );
}

const sendError = function(res, code, err = null) {
    if (err == null && errorMessages[code] !== undefined) err = errorMessages[code];
    console.log(`Error response sent: ${err} (${code})`);
    res.status(code).json({
        error: err,
        data: null}
    );
}

export { sendSuccess, sendError };