import * as Loaders from '../src/';
import fs from 'fs';

const LOADER_FOLDER = `${process.cwd()}/src/loaders`;
const TEST_LOADER_FOLDER = `${process.cwd()}/__test__/loaders`;

describe('Project Test Coverage', () => {
  it('should have test for each loader', () => {
    // this test ensure test file and loader file are in sync
    const loaderTestFiles: string[] = [];
    fs.readdirSync(LOADER_FOLDER).forEach((file: string) => {
      const testFileName = file.replace('.tsx', '.spec.tsx');
      loaderTestFiles.push(testFileName);
    });
    const testFiles = fs.readdirSync(TEST_LOADER_FOLDER).sort();
    expect(loaderTestFiles.sort()).toEqual(testFiles);
  });

  it('Should export all defined loader from index file as default export', () => {
    // This test also insure that fileName and loader name are in sync
    const loaderNames = Object.keys(Loaders);

    const loaderFiles: string[] = [];
    fs.readdirSync(LOADER_FOLDER).forEach((file: string) => {
      const testFileName = file.replace('.tsx', '');
      loaderFiles.push(testFileName);
    });

    // Include the default export in the assertion
    loaderFiles.push('default')

    expect(loaderNames.sort()).toEqual(loaderFiles.sort());

  });
  
  it('Should export default with all loaders from index file', () => {
    // This test also insure that fileName and loader name are in sync
    const defaultExport = Object.keys(Loaders.default);

    const loaderFiles: string[] = [];
    fs.readdirSync(LOADER_FOLDER).forEach((file: string) => {
      const testFileName = file.replace('.tsx', '');
      loaderFiles.push(testFileName);
    });

    expect(defaultExport.sort()).toEqual(loaderFiles.sort());
  });

});
