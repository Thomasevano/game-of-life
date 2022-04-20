// Coeur du jeu - Ces fonctions sont suffisantes pour faire fonctionner le jeu
export interface Cell {
  x: number;
  y: number;
}

export interface Configuration extends Array<Cell>{}

// Génère une configuration aléatoire, choix du nombre de cellules vivantes et de la taille du cadre possible
export function randomConfiguration(cells: number = 1500, size: number = 150) {
    let configuration: Configuration = []
    for (let i = 0; i < cells; i++) {
        const x = Math.floor(Math.random() * (size))
        const y = Math.floor(Math.random() * (size))
        configuration.push({x: x, y: y})
    }
    return configuration
}

// Réalise un tour de configuration (génération de la prochaine configuration à partir d'une configuration donnée)
export function doTurn(configuration: Configuration): Configuration {
  let voisins: Configuration = removeDuplicates(configuration.map(getVoisins).flat())
  return voisins.map(voisin => (processCell(configuration, voisin, checkIfVoisinExist(configuration, voisin))) ? ({x: voisin.x, y: voisin.y}) : null).filter(Boolean)
}

// Vérifie si une cellule (vivante ou non) pourra vivre sur la prochaine configuration
export function processCell(configuration: Configuration, cell: Cell, isAlive: boolean): boolean {
  let nbVoisins = 0
  let voisins = getVoisins(cell)
  voisins.map(voisin => checkIfVoisinExist(configuration, voisin) ? nbVoisins++ : null);
  if (nbVoisins === 3) {
      return true;
  }else return nbVoisins === 2 && isAlive;
}

// Vérifie si la case adjacente est vivante dans la configuration actuelle
export function checkIfVoisinExist(configuration: Configuration, voisin: Cell) {
  let isFound = false
  configuration.some(cell => (cell.x === voisin.x && cell.y === voisin.y) ? isFound = true : '');
  return isFound
}

// Récupération des 8 cases adjacentes d'une cellule
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

// Supprime les possibles voisins doublons (pour éviter de les retester)
export function removeDuplicates(voisins: Configuration) {
  return voisins.reduce((unique, voisin) => {
      if(!unique.some(cell => cell.x === voisin.x && cell.y === voisin.y)) unique.push(voisin);
      return unique;
  },[]);
}
