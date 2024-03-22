enum HttpStatusCode {

    // * Success
    OK = 200, // Indicates that the [request has succeeded].
    CREATED = 201, // Indicates that the request has been fulfilled and a [new resource has been created].
    NO_CONTENT = 204,

    NOT_MODIFIED = 304, // 

    // * Client errors
    BAD_REQUEST = 400, // Indicates that the server could [not understand the request] due to invalid syntax or missing parameters.
    UNAUTHORIZED = 401, // Indicates that the client [must authenticate] itself to get the requested response.
    FORBIDDEN = 403, // Indicates that the client does [not have permission] to access the requested resource.
    NOT_FOUND = 404, // Indicates that the server [cannot find the requested resource].
    UNPROCESSABLE_ENTITY = 422, // Indicates that the server [understands the request but it can't process it].

    // * Server errors
    INTERNAL_SERVER = 500, // Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.

}

export default HttpStatusCode;