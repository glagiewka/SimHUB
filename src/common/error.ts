export const wrapError = (e: any) => {
    if (e instanceof Error) {
        return e
    }

    return new Error(e)
}
