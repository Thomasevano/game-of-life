// @ts-ignore
import * as matchers from "jest-extended";
import * as gameOfLife from '../core/core';
expect.extend(matchers);

let configuration: Array<gameOfLife.Cell> = [
    {x: 5, y: 5},
    {x: 5, y: 6},
    {x: 8, y: 7},
    {x: 8, y: 8},
    {x: 7, y: 7},
    {x: 7, y: 8}
];

it("Récupération Voisins", function () {
  let voisins = gameOfLife.getVoisins(5, 5)
  expect(voisins).toEqual([
      {x: 5, y: 6},
      {x: 5, y: 4},
      {x: 6, y: 5},
      {x: 4, y: 5},
      {x: 4, y: 4},
      {x: 6, y: 6},
      {x: 6, y: 4},
      {x: 4, y: 6},
  ]);
});

it("Comptage voisins", function () {
    let voisins: Array<gameOfLife.Cell> = [];
    configuration.map(cell => voisins.push(...gameOfLife.getVoisins(cell.x, cell.y)));
    expect(voisins.length).toEqual(48);
});

it("Remove duplicates", function () {
    let voisins: Array<gameOfLife.Cell> = [
        {x: 5, y: 5},
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 7, y: 7},
        {x: 7, y: 7}
    ];
    voisins = gameOfLife.removeDuplicates(voisins)
    expect(voisins).toEqual([
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 7, y: 7}
    ]);
});

it("Check if cell exists", function () {
    const isFound = gameOfLife.checkIfVoisinExist(configuration, {x: 7, y: 7})
    expect(isFound).toEqual(true);

    const isFoundTwo = gameOfLife.checkIfVoisinExist(configuration, {x: 7, y: 9})
    expect(isFoundTwo).toEqual(false);
});

it("Cas 1: Sous-population (décès des cellules)", function () {
    let configuration: Array<gameOfLife.Cell> = [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 1, y: 1}
    ];
    let newConfiguration = gameOfLife.doTurn(configuration)
    expect(newConfiguration).toEqual([]);
});

it("Cas 2: cellules vivantes et immobiles", function () {
    let configuration: Array<gameOfLife.Cell> = [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 5, y: 6},
        {x: 6, y: 6},
    ];
    let newConfiguration = gameOfLife.doTurn(configuration)
    expect(newConfiguration).toIncludeSameMembers(configuration);
});

it("Cas 3: Oscillation (reprise de sa forme initiale - à | à -)", function () {
    let configuration: Array<gameOfLife.Cell> = [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 7, y: 5}
    ];
    let newConfiguration = gameOfLife.doTurn(configuration)
    let newConfigurationBis = gameOfLife.doTurn(newConfiguration)
    expect(newConfigurationBis).toIncludeSameMembers(configuration);
});

it("Cas 4: Glider (cellules qui se déplacent)", function () {
    let configuration: Array<gameOfLife.Cell> = [
        {x: 5, y: 5},
        {x: 6, y: 6},
        {x: 6, y: 7},
        {x: 5, y: 7},
        {x: 4, y: 7}
    ];
    for (let i = 0; i < 6; i++) {
        configuration = gameOfLife.doTurn(configuration)
    }
    expect(configuration).toIncludeSameMembers([
        {x: 5, y: 8},
        {x: 6, y: 9},
        {x: 7, y: 9},
        {x: 7, y: 8},
        {x: 7, y: 7}
    ]);
});
