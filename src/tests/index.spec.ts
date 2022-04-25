// @ts-ignore
import * as matchers from "jest-extended";
import { getVoisins, doTurn, checkIfVoisinExist, removeDuplicates } from '../core/core';
import { Configuration } from '../core/core.types';

expect.extend(matchers);

const configuration: Configuration = [
  { x: 5, y: 5 },
  { x: 5, y: 6 },
  { x: 8, y: 7 },
  { x: 8, y: 8 },
  { x: 7, y: 7 },
  { x: 7, y: 8 }
];

describe('#getVoisins', function () {
  it("should get neighbors of a cell", function () {
    const voisins = getVoisins({ x: 5, y: 5 })

    expect(voisins).toEqual([
      { x: 5, y: 6 },
      { x: 5, y: 4 },
      { x: 6, y: 5 },
      { x: 4, y: 5 },
      { x: 4, y: 4 },
      { x: 6, y: 6 },
      { x: 6, y: 4 },
      { x: 4, y: 6 },
    ]);
  });

  it("should count neighbors of a cell", function () {
    const voisins: Configuration = configuration.map(getVoisins).flat();

    expect(voisins.length).toEqual(48);
  });
})

describe('#removeDuplicates', function () {
  it("should remove duplicated cells", function () {
    let voisins: Configuration = [
      { x: 5, y: 5 },
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 7, y: 7 },
      { x: 7, y: 7 }
    ];

    voisins = removeDuplicates(voisins)

    expect(voisins).toEqual([
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 7, y: 7 }
    ]);
  });
})

describe('#checkIfVoisinExist', function () {
  it("should have a neighbor", function () {
    const isFound = checkIfVoisinExist(configuration, { x: 7, y: 7 })

    expect(isFound).toEqual(true);
  });

  it("should not have a neighbor", function () {
    const isFoundTwo = checkIfVoisinExist(configuration, { x: 7, y: 9 })

    expect(isFoundTwo).toEqual(false);
  });
})

describe('#doTurn', function () {
  it("should kill any cell with fewer than two live neighbours, as if by underpopulation", function () {
    const configuration: Configuration = [
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 1, y: 1 }
    ];

    const newConfiguration = doTurn(configuration)

    expect(newConfiguration).toEqual([]);
  });

  it("should keep alive any live cell with two or three live neighbours", function () {
    const configuration: Configuration = [
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 5, y: 6 },
      { x: 6, y: 6 },
    ];

    const newConfiguration = doTurn(configuration)

    expect(newConfiguration).toIncludeSameMembers(configuration);
  });

  it("Cas 3: Oscillation (reprise de sa forme initiale - à | à -)", function () {
    const configuration: Configuration = [
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 5 }
    ];

    const newConfiguration = doTurn(configuration)
    const newConfigurationBis = doTurn(newConfiguration)

    expect(newConfigurationBis).toIncludeSameMembers(configuration);
  });

  it("Cas 4: Glider (cellules qui se déplacent)", function () {
    let configuration: Configuration = [
      { x: 5, y: 5 },
      { x: 6, y: 6 },
      { x: 6, y: 7 },
      { x: 5, y: 7 },
      { x: 4, y: 7 }
    ];

    for (let i = 0; i < 6; i++) {
      configuration = doTurn(configuration)
    }

    expect(configuration).toIncludeSameMembers([
      { x: 5, y: 8 },
      { x: 6, y: 9 },
      { x: 7, y: 9 },
      { x: 7, y: 8 },
      { x: 7, y: 7 }
    ]);
  });
})
