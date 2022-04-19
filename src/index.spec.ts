// @ts-ignore
import * as matchers from "jest-extended";
expect.extend(matchers);

interface Cell {
    x: number;
    y: number;
}

let configuration = <Array<Cell>> [
    {x: 5, y: 5},
    {x: 5, y: 6},
    {x: 8, y: 7},
    {x: 8, y: 8},
    {x: 7, y: 7},
    {x: 7, y: 8}
];

it("Récupération Voisins", function () {
  let voisins = getVoisins(5, 5)
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
    let voisins = <Array<Cell>> [];
    configuration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
    expect(voisins.length).toEqual(48);
});

it("Remove duplicates", function () {
    let voisins = <Array<Cell>> [
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

it("Configuration suivante", function () {
    let voisins = <Array<Cell>> [];
    configuration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
    voisins = removeDuplicates(voisins)
    let newConfiguration = <Array<Cell>> [];
    voisins.map(voisin => (processCell(configuration, voisin.x, voisin.y, checkIfVoisinExist(configuration, voisin))) ? newConfiguration.push({x: voisin.x, y: voisin.y}) : null);
    configuration = newConfiguration
    expect(newConfiguration).toEqual(false);
});

it("Cas sous-population (décès tous)", function () {
    let voisins = <Array<Cell>> [];
    let configuration = <Array<Cell>> [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 1, y: 1}
    ];
    configuration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
    voisins = removeDuplicates(voisins)
    let newConfiguration = <Array<Cell>> [];
    voisins.map(voisin => (processCell(configuration, voisin.x, voisin.y, checkIfVoisinExist(configuration, voisin))) ? newConfiguration.push({x: voisin.x, y: voisin.y}) : null);
    expect(newConfiguration.length).toEqual(0);
});

it("Cas vivant et immobile", function () {
    let voisins = <Array<Cell>> [];
    let configuration = <Array<Cell>> [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 5, y: 6},
        {x: 6, y: 6},
    ];
    configuration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
    voisins = removeDuplicates(voisins)
    let newConfiguration = <Array<Cell>> [];
    voisins.map(voisin => (processCell(configuration, voisin.x, voisin.y, checkIfVoisinExist(configuration, voisin))) ? newConfiguration.push({x: voisin.x, y: voisin.y}) : null);
    expect(newConfiguration.length).toEqual(4);
});

it("Cas oscillation (- vers | vers -)", function () {
    let voisins = <Array<Cell>> [];
    let configuration = <Array<Cell>> [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 7, y: 5}
    ];
    configuration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
    voisins = removeDuplicates(voisins)
    let newConfiguration = <Array<Cell>> [];
    voisins.map(voisin => (processCell(configuration, voisin.x, voisin.y, checkIfVoisinExist(configuration, voisin))) ? newConfiguration.push({x: voisin.x, y: voisin.y}) : null);

    newConfiguration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
    voisins = removeDuplicates(voisins)
    let newConfigurationBis = <Array<Cell>> [];
    voisins.map(voisin => (processCell(newConfiguration, voisin.x, voisin.y, checkIfVoisinExist(newConfiguration, voisin))) ? newConfigurationBis.push({x: voisin.x, y: voisin.y}) : null);

    expect(newConfigurationBis).toIncludeSameMembers(configuration);
});

function initVie() {
    let voisins = <Array<Cell>> [];
    configuration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
    voisins = removeDuplicates(voisins)
    let newConfiguration = <Array<Cell>> [];
    voisins.map(voisin => (processCell(configuration, voisin.x, voisin.y, checkIfVoisinExist(configuration, voisin))) ? newConfiguration.push({x: voisin.x, y: voisin.y}) : null);
    configuration = newConfiguration
}

function processCell(configuration: Array<Cell>, cellX: number, cellY: number, isAlive: boolean): boolean {
    let nbVoisins = 0
    let voisins = getVoisins(cellX, cellY)
    voisins.map(voisin => checkIfVoisinExist(configuration, voisin) ? nbVoisins++ : null);
    if (nbVoisins === 3) {
        return true;
    }else return nbVoisins === 2 && isAlive;
}

function checkIfVoisinExist(configuration: Array<Cell>, voisin: Cell) {
    let isFound = false
    configuration.some(cell => (cell.x === voisin.x && cell.y === voisin.y) ? isFound = true : '');
    return isFound
}
function getVoisins(cellX: number, cellY: number): Array<Cell> {
    return [
        {x: cellX, y: cellY+1},
        {x: cellX, y: cellY-1},
        {x: cellX+1, y: cellY},
        {x: cellX-1, y: cellY},
        {x: cellX-1, y: cellY-1},
        {x: cellX+1, y: cellY+1},
        {x: cellX+1, y: cellY-1},
        {x: cellX-1, y: cellY+1}
    ]
}

function removeDuplicates(voisins: Array<Cell>) {
    return voisins.reduce((unique, voisin) => {
        if(!unique.some(cell => cell.x === voisin.x && cell.y === voisin.y)) unique.push(voisin);
        return unique;
    },[]);
}