import { expect, jest, test, describe } from '@jest/globals';
// const { expect, test, describe } = require( '@jest/globals');
// import cli  from "./cli.js";jest

let ERROR_CODE, realProcess, mockExit, mockStdout;

function beforeTestSetup() {
  ERROR_CODE = 1;
  // Due to the CLI will call process.exit()
  // We assign all properties of the "real process" to
  // our "mock" process, otherwise, if "cli()" relied
  // on any of such properties (i.e `process.env.NODE_ENV`)
  // it would crash with an error like:
  // `TypeError: Cannot read property 'NODE_ENV' of undefined`.
  realProcess = process;
  // const exitMock = jest.fn();
  // global.process = { ...realProcess, exit: exitMock };

  mockExit = jest.spyOn(process, 'exit') 
    .mockImplementation((number) => { 
      throw new Error('mockImplementation caught process.exit: ' + number); 
    });
  console.log("Enabled mockExit jest mockImplementationOn"); 

  mockStdout = jest.spyOn(process.stdout, 'write')
    .mockImplementation((out) => {  // Capture terminal stdout
      console.log(`mockImplementation wrote ${out.length} to stdout: ${out}`) 
      return out;  
    });
  jest.mock('./database.js');
  jest.mock('./ConfigModule.js');
  jest.mock('./text.js');
  // let mockExit = jest.mockImplementationOnce();
  mockExit = jest.spyOn(process, 'exit') 

  return { mockExit }
}

async function afterTestCleanup() {
  mockExit.mockRestore();
  mockStdout.mockRestore();
  global.process = { ...realProcess };
  mockExit.mockClear();
  process.stdout.write("std");
  await setTimeout(() => {
     process.stdout.write("out");
  }, 800);


describe("The CLI tool with no arguments specified ", () => {


  // beforeEach(() => {
  //   beforeTestSetup()
  // });
  // afterEach(async () => {
  //   afterTestCleanup();
  // });
  test('should try to exit process', () => {
    mockExit = jest.spyOn(process, 'exit') 
    // mockExit(ERROR_CODE);
////    cli();mockExit();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  });

  // test("Exit mock to throw error", () => {
    //  cli();
  //   mockExit();
  //   expect(mockExit).toHaveBeenCalledWith(ERROR_CODE).toThrow();
  // });

  test("println mock test of output to stdout", () => {
    const println = (string) => { process.stdout.write(string); }
    println('Hello World');
    expect(mockStdout).toHaveBeenCalledWith('Hello World');
  });


  test("another test", () => {
    expect(() => {
    //    cli();
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  })

  test("another test", () => {
    expect(() => {
      // cli(' --help');    
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  })
  // afterTestCleanup();
});

describe("The CLI tool WITH PARAMETERS ", () => {
  beforeEach(() => {
    beforeTestSetup()
  });
  afterEach(async () => {
    afterTestCleanup();
  });

  test("Test of add", () => {
    expect(() => {
      cli(' add');    
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(ERROR_CODE);
  })

  test("Test 12 times 11", () => {
    expect(12 * 11).toEqual(132);
  })

  // afterTestCleanup();
})

describe("Random pure functions", () => {
  // jest.mock('./database.js');
  // jest.mock('./ConfigModule.js');
  // jest.mock('./text.js');
  // let mockExit = beforeTestSetup();

  test("Five times Eleven", () => {
    expect(5*11).toEqual(55);
  });

  test("Test 12 times 11", () => {
    expect(12 * 11).toEqual(132);
  });

  // afterTestCleanup();
});

   