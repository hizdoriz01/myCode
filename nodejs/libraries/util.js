function isFloat(n) {
    return n === +n && n !== (n|0);
}

function promise(items, fn, context) {
    return items.reduce(function (promise, item) {
        return promise.then(function () {
            return fn(item, context);
        });
    }, Promise.resolve());
}

function item(item, context) {
    return new Promise(async (resolve, reject) => {
        resolve();
    });
}