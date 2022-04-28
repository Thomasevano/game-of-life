// @ts-ignore
import * as matchers from "jest-extended";
import { getVoisins, doTurn, checkIfVoisinExist, removeDuplicates, processCell, countAliveNeighborsOfaCell, getNeighborsOfEachCell } from '../core/core';
import { Cell, Configuration } from '../core/core.types';

expect.extend(matchers);

describe('#getVoisins', function () {
  let cell: Cell;

  beforeEach(function () {
    cell = { x: 0, y: 0 }
  });

  it("should get neighbors of a cell", function () {
    // when
    const neighbors = getVoisins(cell)

    // then
    expect(neighbors).toIncludeAllMembers([
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
    ]);
  });

  it("should count neighbors of a cell", function () {
    // when
    const neighbors: number = getVoisins(cell).length;

    // then
    expect(neighbors).toBe(8);
  });
})

describe('#removeDuplicates', function () {
  it("should remove duplicated cells", function () {
    // given
    let voisins: Configuration = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 1 }
    ];

    // when
    voisins = removeDuplicates(voisins)

    // then
    expect(voisins).toIncludeAllMembers([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ]);
  });
})

describe('#checkIfVoisinExist', function () {

  let generation: Configuration;

  beforeEach(function () {
    generation = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ]
  })

  it("should have a neighbor", function () {
    const isFound = checkIfVoisinExist(generation, { x: 0, y: 0 })

    expect(isFound).toEqual(true);
  });

  it("should not have a neighbor", function () {
    const isFoundTwo = checkIfVoisinExist(generation, { x: 7, y: 9 })

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
