// Coeur du jeu - Ces fonctions sont suffisantes pour faire fonctionner le jeu
export interface Cell {
  x: number;
  y: number;
}

export interface Configuration extends Array<Cell>{}

export function randomConfiguration(cells: number = 1500, size: number = 150) {
    let configuration: Configuration = []
    for (let i = 0; i < cells; i++) {
        const x = Math.floor(Math.random() * (size))
        const y = Math.floor(Math.random() * (size))
        configuration.push({x: x, y: y})
    }
    return configuration
}

export function doTurn(configuration: Configuration): Configuration {
  let voisins: Configuration = removeDuplicates(configuration.map(getVoisins).flat())
  return voisins.map(voisin => (processCell(configuration, voisin, checkIfVoisinExist(configuration, voisin))) ? ({x: voisin.x, y: voisin.y}) : null).filter(Boolean)
}

export function processCell(configuration: Configuration, cell: Cell, isAlive: boolean): boolean {
  let nbVoisins = 0
  let voisins = getVoisins(cell)
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

export function getVoisins({x: cellX, y: cellY}): Configuration {
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
