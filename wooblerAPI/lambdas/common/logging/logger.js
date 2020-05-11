function stringIsEmpty(string){
    if (!string) return true;
    const { length } = string.trim();
    return (length === 0);
}

function stringify(src){
    if (!src) return '';
    return src.trim ? src : JSON.stringify(src);
}

export const logger = {
    logError(errorObject){
        if (!errorObject) return;
        if (stringIsEmpty(errorObject.message)) return;
        console.error(errorObject.message.trim());
    },
    logInfo(message){
        const msg = stringify(message);
        if (stringIsEmpty(msg)) return;
        console.info(msg.trim());
    },
    logWarning(message){
        const msg = stringify(message);
        if (stringIsEmpty(msg)) return;
        console.warn(msg.trim());
    }
};