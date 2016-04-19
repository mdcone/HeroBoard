describe('workoutDate directive', function () {

    // load the directive's module
    beforeEach(module('HeroBoard.Board'));
    beforeEach(module('HeroBoard.dataWarehouse'));

    var element,
        scope,
        stateMaintainer;

    function upDate(date) {
        stateMaintainer.setItem('data', {  date: date});
    } 
    
    beforeEach(inject(function ($rootScope, _stateMaintainer_) {
        scope = $rootScope.$new();
        stateMaintainer = _stateMaintainer_;
    }));

    it('should populate element with the date', inject(function ($compile) {
        upDate('01/23/1945');
        element = angular.element('<workout-date></workout-date>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.html()).toContain('01/23/1945');
        upDate('01/23/1946');
        scope.$digest();
        expect(element.html()).toContain('01/23/1946');
    }));
    
});