
export interface Cell {
  x: number;
  y: number;
}

export function doTurn(configuration: Array<Cell>): Array<Cell> {
  let voisins : Array<Cell> = [];
  configuration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
  voisins = removeDuplicates(voisins)
  let newConfiguration : Array<Cell> = [];
  voisins.map(voisin => (processCell(configuration, voisin.x, voisin.y, checkIfVoisinExist(configuration, voisin))) ? newConfiguration.push({x: voisin.x, y: voisin.y}) : null);
  return newConfiguration
}

export function processCell(configuration: Array<Cell>, cellX: number, cellY: number, isAlive: boolean): boolean {
  let nbVoisins = 0
  let voisins = getVoisins(cellX, cellY)
  voisins.map(voisin => checkIfVoisinExist(configuration, voisin) ? nbVoisins++ : null);
  if (nbVoisins === 3) {
      return true;
  }else return nbVoisins === 2 && isAlive;
}

export function checkIfVoisinExist(configuration: Array<Cell>, voisin: Cell) {
  let isFound = false
  configuration.some(cell => (cell.x === voisin.x && cell.y === voisin.y) ? isFound = true : '');
  return isFound
}

export function getVoisins(cellX: number, cellY: number): Array<Cell> {
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

export function removeDuplicates(voisins: Array<Cell>) {
  return voisins.reduce((unique, voisin) => {
      if(!unique.some(cell => cell.x === voisin.x && cell.y === voisin.y)) unique.push(voisin);
      return unique;
  },[]);
}
