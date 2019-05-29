const httpErrors = require('http-errors');

module.exports = error => {
    switch (true) {
        case error instanceof httpErrors.BadRequest:
            status = 400;
            console.log(status);
            return status;

        case error instanceof httpErrors.Forbidden:
            status = 403;
            console.log(status);
            return status;

        case error instanceof httpErrors.Unauthorized:
            status = 401;
            console.log(status);
            return status;

        case error instanceof httpErrors.NotFound:
            status = 404;
            console.log(status);
            return status;

        case error instanceof httpErrors.Conflict:
            status = 409;
            console.log(status);
            return status;

        case error instanceof httpErrors.BadGateway:
            status = 502;
            console.log(status);
            return status;

        case error instanceof httpErrors.InternalServerError:
            status = 500;
            console.log(status);
            return status;
    }
    /* if (error instanceof httpErrors.BadRequest) {
        status = 400;
    } */
};
