/**
* Created by weed on 14/12/05.
*/
///<reference path='../Scripts/typings/jasmine/jasmine.d.ts' />
///<reference path='../Scripts/typings/node/node.d.ts' />
///<reference path='../Scripts/typings/expect.js/expect.js.d.ts' />
var expect = require('expect.js');
var parserOfExportedFile = require('../ParserOfExportedFile.js');
var efp;
describe('ParserOfExportedFile', function () {
    beforeEach(function () {
        efp = new parserOfExportedFile.ParserOfExportedFile('sample.html');
    });
    it('インスタンス化できる', function () {
        expect(efp).not.to.be(undefined);
    });
});
//# sourceMappingURL=ParserOfExportedFile.test.js.map