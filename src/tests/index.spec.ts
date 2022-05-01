// @ts-ignore
import * as matchers from "jest-extended";
import { getVoisins, doTurn, checkIfVoisinExist, removeDuplicates, processCell, countAliveNeighborsOfaCell, getNeighborsOfEachCell, getCellCoordsForNextGen } from '../core/core';
import { Cell, Configuration } from '../core/core.types';

expect.extend(matchers);

describe('#getVoisins', function () {
  let cell: Cell;

  beforeEach(function () {
    cell = [0, 0]
  });

  it("should get neighbors of a cell", function () {
    // when
    const neighbors = getVoisins(cell)

    // then
    expect(neighbors).toIncludeAllMembers([
      [1, 1],
      [1, 0],
      [1, -1],
      [0, 1],
      [0, -1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
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
      [0, 0],
      [0, 1],
      [0, 1],
    ];

    // when
    voisins = removeDuplicates(voisins)

    // then
    expect(voisins).toIncludeAllMembers([
      [0, 0],
      [0, 1]
    ]);
  });
})

describe('#checkIfVoisinExist', function () {

  let generation: Configuration;

  beforeEach(function () {
    generation = [
      [0, 0],
      [0, 1]
    ]
  })

  it("should have a neighbor", function () {
    const isFound = checkIfVoisinExist(generation, [0, 0])

    expect(isFound).toBe(true);
  });

  it("should not have a neighbor", function () {
    const isFoundTwo = checkIfVoisinExist(generation, [7, 9])

    expect(isFoundTwo).toBe(false);
  });
})

describe('#processCell', function () {

  let generation: Configuration;

  beforeEach(function () {
    generation = [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, 1],
      [0, 0],
      [0, -1],
      [-1, 1],
      [-1, 1],
    ]
  });

  it("should kill the cell if fewer than two live neighbours, as if by underpopulation", function () {
    const cell: Cell = [2, 2];

    const cellStatusAtNewGeneration = processCell(generation, cell, true)

    expect(cellStatusAtNewGeneration).toBe(false);
  });

  it("should keep alive any live cell with two or three live neighbours", function () {
    const cell: Cell = [1, 2];

    const newConfiguration = processCell(generation, cell, true)

    expect(newConfiguration).toBe(true);
  });
});

describe('#doTurn', function () {
  it("should Oscillation (reprise de sa forme initiale - à | à -)", function () {
    const configuration: Configuration = [
      [0, 0],
      [1, 0],
      [2, 0]
    ];

    const newConfiguration = doTurn(configuration)
    const newConfigurationBis = doTurn(newConfiguration)

    expect(newConfigurationBis).toIncludeSameMembers(configuration);
  });

  it("Cas 4: Glider (cellules qui se déplacent)", function () {
    let configuration: Configuration = [
      [5, 5],
      [6, 6],
      [6, 7],
      [5, 7],
      [4, 7]
    ];

    for (let i = 0; i < 6; i++) {
      configuration = doTurn(configuration)
    }

    expect(configuration).toIncludeSameMembers([
      [5, 8],
      [6, 9],
      [7, 9],
      [7, 8],
      [7, 7]
    ]);
  });
});

describe('#countAliveNeighborsOfaCell', function () {
  it('should count alive neighbors of a cell', function () {
    // given
    const cell: Cell = [0, 0]
    const generation: Configuration = [
      [0, 1],
      [0, -1],
    ]

    // when
    const aliveNeighbors = countAliveNeighborsOfaCell(cell, generation)

    expect(aliveNeighbors).toEqual(2);
  })
});

describe('#getNeighborsOfEachCell', function () {
  it('should return neighbors of all cells', function () {
    // given
    const generation: Configuration = [
      [0, 0],
      [2, 2],
    ]

    // when
    const neighbors = getNeighborsOfEachCell(generation);

    // then\
    expect(neighbors).toIncludeAllMembers([
      [1, 1],
      [1, 0],
      [1, -1],
      [0, 1],
      [0, -1],
      [-1, 1],
      [-1, 0],
      [3, 2],
      [3, 1],
      [2, 3],
      [2, 1],
      [1, 3],
      [1, 2],
    ])
  });
});

describe('#getCellCoordsForNextGen', function () {
  let generation: Configuration;

  beforeEach(function () {
    generation = [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, 1],
      [0, 0],
      [0, -1],
      [-1, 1],
      [-1, 0],
    ]
  });

  it('should get cell coordinates if alive in next generation', function () {
    const cell: Cell = [0, 2];

    const nextGenerationCoordinates = getCellCoordsForNextGen(generation, cell);

    expect(nextGenerationCoordinates).toMatchObject([0, 2]);
  });

  it('should get null if cell not alive in next generation', function () {
    const cell: Cell = [0, 1];

    const nextGenerationCoordinates = getCellCoordsForNextGen(generation, cell);

    expect(nextGenerationCoordinates).toBeNull();
  });
});
