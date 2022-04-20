// @ts-ignore
import * as matchers from "jest-extended";
import { getVoisins, doTurn, checkIfVoisinExist, removeDuplicates } from '../core/core';
import { Configuration } from '../core/core.types';

expect.extend(matchers);

let configuration: Configuration = [
    {x: 5, y: 5},
    {x: 5, y: 6},
    {x: 8, y: 7},
    {x: 8, y: 8},
    {x: 7, y: 7},
    {x: 7, y: 8}
];

it("Récupération Voisins", function () {
  let voisins = getVoisins({x: 5, y: 5})
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
    let voisins: Configuration = configuration.map(getVoisins).flat();
    expect(voisins.length).toEqual(48);
});

it("Remove duplicates", function () {
    let voisins: Configuration = [
        {x: 5, y: 5},
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 7, y: 7},
        {x: 7, y: 7}
    ];
    voisins = removeDuplicates(voisins)
    expect(voisins).toEqual([
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 7, y: 7}
    ]);
});

it("Check if cell exists", function () {
    const isFound = checkIfVoisinExist(configuration, {x: 7, y: 7})
    expect(isFound).toEqual(true);

    const isFoundTwo = checkIfVoisinExist(configuration, {x: 7, y: 9})
    expect(isFoundTwo).toEqual(false);
});

it("Cas 1: Sous-population (décès des cellules)", function () {
    let configuration: Configuration = [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 1, y: 1}
    ];
    let newConfiguration = doTurn(configuration)
    expect(newConfiguration).toEqual([]);
});

it("Cas 2: cellules vivantes et immobiles", function () {
    let configuration: Configuration = [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 5, y: 6},
        {x: 6, y: 6},
    ];
    let newConfiguration = doTurn(configuration)
    expect(newConfiguration).toIncludeSameMembers(configuration);
});

it("Cas 3: Oscillation (reprise de sa forme initiale - à | à -)", function () {
    let configuration: Configuration = [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 7, y: 5}
    ];
    let newConfiguration = doTurn(configuration)
    let newConfigurationBis = doTurn(newConfiguration)
    expect(newConfigurationBis).toIncludeSameMembers(configuration);
});

it("Cas 4: Glider (cellules qui se déplacent)", function () {
    let configuration: Configuration = [
        {x: 5, y: 5},
        {x: 6, y: 6},
        {x: 6, y: 7},
        {x: 5, y: 7},
        {x: 4, y: 7}
    ];
    for (let i = 0; i < 6; i++) {
        configuration = doTurn(configuration)
    }
    expect(configuration).toIncludeSameMembers([
        {x: 5, y: 8},
        {x: 6, y: 9},
        {x: 7, y: 9},
        {x: 7, y: 8},
        {x: 7, y: 7}
    ]);
});
