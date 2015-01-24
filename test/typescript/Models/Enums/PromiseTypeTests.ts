describe("Tests PromiseType enum", function () {
    it("has success or fail type", function () {
        expect(PromiseType.SuccessOrFail).toBeDefined();
    });

    it("has numbered type", function () {
        expect(PromiseType.Numbered).toBeDefined();
    });

    it("has custom type", function () {
        expect(PromiseType.Custom).toBeDefined();
    });
});