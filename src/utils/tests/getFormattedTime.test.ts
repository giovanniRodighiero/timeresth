import getFormattedTime from "../getFormattedTime";

describe("getFormattedTime", () => {
    it("Should return 00:00:00 if called with no arguments", () => {
        expect(getFormattedTime()).toBe("00:00:00");
    });

    it("Should return 00:20:34 for 1234 seconds", () => {
        expect(getFormattedTime(1234)).toBe("00:20:34");
    });
});
