describe("A jasmine test", function() {
	it("should pass if true is true", function(){
		expect(true).toBe(true);
	});
});

var calculator = require("/Users/benjamincampbell/Development/Titanium_Studio_Workspace/ISAT 480/Resources/ui/common/ApplicationTabGroup.js");
 
describe("multiplication", function () {
  it("should multiply 2 and 3", function () {
    var product = calculator.multiply(2, 3);
    expect(product).toBe(6);
  });
});    