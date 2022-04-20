// Coeur du jeu - Ces fonctions sont suffisantes pour faire fonctionner le jeu
export interface Cell {
  x: number;
  y: number;
}

export interface Configuration extends Array<Cell>{}

export function randomConfiguration(cells: number = 1500, limit: number = 900) {
    let configuration: Configuration = []
    for (let i = 0; i < cells; i++) {
        const x = Math.floor(Math.random() * (limit/6))
        const y = Math.floor(Math.random() * (limit/6))
        configuration.push({x: x, y: y})
    }
    return configuration
}

export function doTurn(configuration: Configuration): Configuration {
  let voisins: Configuration = [];
  configuration.map(cell => voisins.push(...getVoisins(cell.x, cell.y)));
  voisins = removeDuplicates(voisins)
  let newConfiguration : Array<Cell> = [];
  voisins.map(voisin => (processCell(configuration, voisin.x, voisin.y, checkIfVoisinExist(configuration, voisin))) ? newConfiguration.push({x: voisin.x, y: voisin.y}) : null);
  return newConfiguration
}

export function processCell(configuration: Configuration, cellX: number, cellY: number, isAlive: boolean): boolean {
  let nbVoisins = 0
  let voisins = getVoisins(cellX, cellY)
  voisins.map(voisin => checkIfVoisinExist(configuration, voisin) ? nbVoisins++ : null);
  if (nbVoisins === 3) {
      return true;
  }else return nbVoisins === 2 && isAlive;
}

export function checkIfVoisinExist(configuration: Configuration, voisin: Cell) {
  let isFound = false
  configuration.some(cell => (cell.x === voisin.x && cell.y === voisin.y) ? isFound = true : '');
  return isFound
}

export function getVoisins(cellX: number, cellY: number): Configuration {
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

export function removeDuplicates(voisins: Configuration) {
  return voisins.reduce((unique, voisin) => {
      if(!unique.some(cell => cell.x === voisin.x && cell.y === voisin.y)) unique.push(voisin);
      return unique;
  },[]);
}
