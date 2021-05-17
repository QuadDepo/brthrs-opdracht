export default (limit:number, page:number, total:number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const next = endIndex < total ? page + 1 : null;
    const prev = startIndex > 0 ? page - 1 : null;

    return {
        startIndex,
        endIndex,
        next,
        prev,
    }
}