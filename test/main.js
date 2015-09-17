import fs from 'fs';
import path from 'path';
import childProcess from 'child_process'
import assert from 'power-assert';
import getModuleNames from '../helper/getModuleNames';
import existDependencies from '../index';

describe('exist-dependencies', () => {
  describe('getModuleNames()', () => {

    it('should return empty array when passing package.json with no dependencies', () => {
      let contents = fs.readFileSync(path.join(__dirname , 'fixtures/packageNoDep.json'));
      let result = getModuleNames(contents, 'npm');
      assert(result.length === 0);
    });

    it('should return 3 length array', () => {
      let contents = fs.readFileSync(path.join(__dirname , 'fixtures/packageWithDep.json'));
      let result = getModuleNames(contents, 'npm');
      assert(result.length === 3);
    });

    xit('should raise error', (done) => {
      let contents = fs.readFileSync(path.join(__dirname , 'fixtures/packageSyntaxError.json'));
      assert.ifError(getModuleNames(contents, 'npm'));
      done();
    });
  });

  xdescribe('check exist', () => {

    it('should be true', () => {
      let result = existDependencies({
        root: path.join(__dirname, 'demoProj')
      });
      assert.ok(result.all)
    });
  });
})
