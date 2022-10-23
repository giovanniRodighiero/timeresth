/**
 * Small workaround esbuild inability to work with jest mock and spyOn.
 * https://github.com/evanw/esbuild/issues/412#issuecomment-723047255
 */
function enableSpy(fn) {
    if (UNIT_TEST) {
        let name = fn.name,
            obj = { [name]: fn };
        fn = function () {
            return obj[name].apply(this, arguments);
        };
        fn.spyOn = () => jest.spyOn(obj, name);
    }
    return fn;
}

export default enableSpy;
