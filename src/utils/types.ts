/**
 * This is used to indicate the type of update payload.
 * `T` is the type of the object to be updated.
 * `K` is the key of the object to be updated.
 */
export type Update<T, K extends keyof T> = Partial<T> & Pick<T, K>
