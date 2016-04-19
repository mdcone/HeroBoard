
describe('The dataGrabber Service', function () {
    // load the service's module
    beforeEach(module('HeroBoard.dataWarehouse'));

    var $httpBackend;
    var dataGrabber;
    var authRequestHandler;

    beforeEach(inject(function (_$httpBackend_, _dataGrabber_) {
        $httpBackend = _$httpBackend_;
        dataGrabber = _dataGrabber_;
        authRequestHandler = $httpBackend.when('GET', '/API/test/')
            .respond({ message: 'yehaw'});
        dataGrabber.setAppUrl('');
    }));

    it('should get data from endpoint', function (done) {
        $httpBackend.expectGET('/API/test/');
        
        var result = dataGrabber.resourceGet('/API/test/');
        result.then(function (data) {
            expect(data.data.message).toBe('yehaw');
            done();
        });
        $httpBackend.flush();
    });

    it('should reject the promise if an error occurred', function (done) {
        authRequestHandler.respond(404, '');
        $httpBackend.expectGET('/API/test/');

        var result = dataGrabber.resourceGet('/API/test/');
        result.then(function (data) {
        }, function (error) {
            expect(error.status).toBe(404);
            done();
        });
        $httpBackend.flush();
    });
});