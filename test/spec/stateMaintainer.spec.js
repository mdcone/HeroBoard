describe('The stateMaintainer Service', function () {
    // load the service's module
    beforeEach(module('HeroBoard.dataWarehouse'));

    var stateMaintainer;

    beforeEach(inject(function ($rootScope, _stateMaintainer_) {
        stateMaintainer = _stateMaintainer_;
        rootScope = $rootScope;
    }));

    it('should notify listeners when something changes', function (done) {
        rootScope.$on('thing-updated', function () {
            expect(true).toBe(true);
            done();
        });

        stateMaintainer.setItem('thing', true);
    });

});