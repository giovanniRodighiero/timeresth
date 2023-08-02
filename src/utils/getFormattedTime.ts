/** Returns the provided seconds as a string with format hh:mm:ss */
function getFormattedTime(seconds: number = 0): string {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

export default getFormattedTime;
