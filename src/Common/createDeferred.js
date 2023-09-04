const createDeferred = ((size) => {
    const queue = [];
    let runningCount = 0;
    const checkRun = () => {
        if (queue.length === 0) {
            runningCount = 0;
            return;
        }
        if (runningCount < size) {
            const callback = queue.shift();
            runningCount += 1;
            callback().finally(() => {
                runningCount -= 1;
                checkRun();
            });
        }
    };
    return (callback) => {
        return new Promise((resolve) => {
            queue.push(() => {
                const promise = Promise.resolve().then(() => callback());
                resolve(promise);
                return promise;
            });
            checkRun();
        });
    };
});

export default createDeferred;