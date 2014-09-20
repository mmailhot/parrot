'use strict';

describe('Controller: EmaildisplayCtrl', function () {

  // load the controller's module
  beforeEach(module('hackathon2App'));

  var EmaildisplayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmaildisplayCtrl = $controller('EmaildisplayCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
