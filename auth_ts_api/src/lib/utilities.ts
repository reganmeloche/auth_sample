import keys from '../config/keys';

export function handleError(err: object): void {
    /* istanbul ignore next */
    if (keys.displayError) {
        // eslint-disable-next-line no-console
        console.log('ERROR LOG EVENT:', err);
    }
}