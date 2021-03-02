export class NotFound extends Error {
    public constructor(message = 'Not found!') {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ValidationError extends Error {
    public constructor(message = 'Invalid input!') {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class Unauthorized extends Error {
    public constructor(message = 'Unauthorized!') {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}