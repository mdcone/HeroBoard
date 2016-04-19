describe('workoutDate directive', function () {

    // load the directive's module
    beforeEach(module('HeroBoard.Board'));
    beforeEach(module('HeroBoard.dataWarehouse'));

    var element,
        scope,
        stateMaintainer;

    beforeEach(inject(function ($rootScope, _stateMaintainer_) {
        scope = $rootScope.$new();
        stateMaintainer = _stateMaintainer_;
        stateMaintainer.setItem('data', {  date: '01/23/1945'});
    }));

    it('should populate element with the date', inject(function ($compile) {
        element = angular.element('<workout-date></workout-date>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.html()).toContain('01/23/1945');
        
    }));
});