describe('popover template', function() {
  var elm,
      elmBody,
      scope,
      elmScope,
      tooltipScope;

  // load the popover code
  beforeEach(module('ui.bootstrap.popover'));

  // load the template
  beforeEach(module('template/popover/popover.html'));
  beforeEach(module('template/popover/popover-template.html'));

  beforeEach(inject(function ($templateCache) {
    $templateCache.put('myUrl', [200, '<span>{{ myTemplateText }}</span>', {}]);
  }));

  beforeEach(inject(function($rootScope, $compile) {
    elmBody = angular.element(
      '<div><span popover-template="{{ templateUrl }}">Selector Text</span></div>'
    );

    scope = $rootScope;
    $compile(elmBody)(scope);
    scope.templateUrl = 'myUrl';

    scope.$digest();
    elm = elmBody.find('span');
    elmScope = elm.scope();
    tooltipScope = elmScope.$$childTail;
  }));

  it('should open on click', inject(function() {
    elm.trigger( 'click' );
    expect( tooltipScope.isOpen ).toBe( true );

    expect( elmBody.children().length ).toBe( 2 );
  }));

  it('should not open on click if templateUrl is empty', inject(function() {
    scope.templateUrl = null;
    scope.$digest();

    elm.trigger( 'click' );
    expect( tooltipScope.isOpen ).toBe( false );

    expect( elmBody.children().length ).toBe( 1 );
  }));

  it('should show updated text', inject(function() {
    scope.myTemplateText = 'some text';
    scope.$digest();

    elm.trigger( 'click' );
    expect( tooltipScope.isOpen ).toBe( true );

    expect( elmBody.children().eq(1).text().trim() ).toBe( 'some text' );

    scope.myTemplateText = 'new text';
    scope.$digest();

    expect( elmBody.children().eq(1).text().trim() ).toBe( 'new text' );
  }));
});

