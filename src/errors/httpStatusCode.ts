export enum HttpStatusCode {

    // * Success
    OK = 200,
    CREATED = 201,

    // * Client errors
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,

    // * Server errors
    INTERNAL_SERVER = 500,

}