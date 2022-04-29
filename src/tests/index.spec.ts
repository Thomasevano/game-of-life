// @ts-ignore
import * as matchers from "jest-extended";
import { getVoisins, doTurn, checkIfVoisinExist, removeDuplicates, processCell, countAliveNeighborsOfaCell, getNeighborsOfEachCell, getCellCoordsForNextGen } from '../core/core';
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

    expect(isFound).toBe(true);
  });

  it("should not have a neighbor", function () {
    const isFoundTwo = checkIfVoisinExist(generation, { x: 7, y: 9 })

    expect(isFoundTwo).toBe(false);
  });
})

describe('#processCell', function () {

  let generation: Configuration;

  beforeEach(function () {
    generation = [
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: 1 },
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
    ]
  });

  it("should kill the cell if fewer than two live neighbours, as if by underpopulation", function () {
    const cell: Cell = { x: 2, y: 2 };

    const cellStatusAtNewGeneration = processCell(generation, cell, true)

    expect(cellStatusAtNewGeneration).toBe(false);
  });

  it("should keep alive any live cell with two or three live neighbours", function () {
    const cell: Cell = { x: 1, y: 2 };

    const newConfiguration = processCell(generation, cell, true)

    expect(newConfiguration).toBe(true);
  });
});

describe('#doTurn', function () {
  it("should Oscillation (reprise de sa forme initiale - à | à -)", function () {
    const configuration: Configuration = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 }
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
});

describe('#countAliveNeighborsOfaCell', function () {
  it('should count alive neighbors of a cell', function () {
    // given
    const cell: Cell = { x: 0, y: 0 }
    const generation: Configuration = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
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
      { x: 0, y: 0 },
      { x: 2, y: 2 },
    ]

    // when
    const neighbors = getNeighborsOfEachCell(generation);

    // then\
    expect(neighbors).toIncludeAllMembers([
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: 3, y: 2 },
      { x: 3, y: 1 },
      { x: 2, y: 3 },
      { x: 2, y: 1 },
      { x: 1, y: 3 },
      { x: 1, y: 2 },
    ])
  });
});

describe('#getCellCoordsForNextGen', function () {
  let generation: Configuration;

  beforeEach(function () {
    generation = [
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: 1 },
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
    ]
  });

  it('should get cell coordinates if alive in next generation', function () {
    const cell: Cell = { x: 0, y: 2 };

    const nextGenerationCoordinates = getCellCoordsForNextGen(generation, cell);

    expect(nextGenerationCoordinates).toMatchObject({ x: 0, y: 2 });
  });

  it('should get null if cell not alive in next generation', function () {
    const cell: Cell = { x: 0, y: 1 };

    const nextGenerationCoordinates = getCellCoordsForNextGen(generation, cell);

    expect(nextGenerationCoordinates).toBeNull();
  });
});
