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

it("Cas 1: Sous-population (décès des cellules)", function () {
    let voisins = <Array<Cell>> [];
    let configuration = <Array<Cell>> [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 1, y: 1}
    ];
    let newConfiguration = doTurn(configuration)
    expect(newConfiguration).toEqual([]);
});

it("Cas 2: cellules vivantes et immobiles", function () {
    let configuration = <Array<Cell>> [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 5, y: 6},
        {x: 6, y: 6},
    ];
    let newConfiguration = doTurn(configuration)
    expect(newConfiguration).toIncludeSameMembers(configuration);
});

it("Cas 3: Oscillation (reprise de sa forme initiale - à | à -)", function () {
    let configuration = <Array<Cell>> [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 7, y: 5}
    ];
    let newConfiguration = doTurn(configuration)
    let newConfigurationBis = doTurn(newConfiguration)
    expect(newConfigurationBis).toIncludeSameMembers(configuration);
});

it("Cas 4: Glider (cellules qui se déplacent)", function () {
    let configuration = <Array<Cell>> [
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

function doTurn(configuration: Array<Cell>): Array<Cell> {
    let voisins = <Array<Cell>> [];
    configuration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
    voisins = removeDuplicates(voisins)
    let newConfiguration = <Array<Cell>> [];
    voisins.map(voisin => (processCell(configuration, voisin.x, voisin.y, checkIfVoisinExist(configuration, voisin))) ? newConfiguration.push({x: voisin.x, y: voisin.y}) : null);
    return newConfiguration
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