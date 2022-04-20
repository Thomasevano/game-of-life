import { Configuration, Cell } from "./core.types";
// Coeur du jeu - Ces fonctions sont suffisantes pour faire fonctionner le jeu

// Génère une configuration aléatoire, choix du nombre de cellules vivantes et de la taille du cadre possible
export function randomConfiguration(cells: number = 1500, size: number = 150) {
    let configuration: Configuration = []
    for (let i = 0; i < cells; i++) {
        const x = (size/3) + Math.floor(Math.random() * (size/3))
        const y = (size/3) + Math.floor(Math.random() * (size/3))
        configuration.push({x: x, y: y})
    }
    return configuration
}

// Réalise un tour de configuration (génération de la prochaine configuration à partir d'une configuration donnée)
export function doTurn(configuration: Configuration): Configuration {
  let voisins: Configuration = removeDuplicates(configuration.map(getVoisins).flat())
  return voisins.map(voisin => (processCell(configuration, voisin, checkIfVoisinExist(configuration, voisin))) ? ({x: voisin.x, y: voisin.y}) : null).filter(Boolean) as Configuration
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
export function getVoisins(cell: Cell): Configuration {
  return [
      {x: cell.x, y: cell.y+1},
      {x: cell.x, y: cell.y-1},
      {x: cell.x+1, y: cell.y},
      {x: cell.x-1, y: cell.y},
      {x: cell.x-1, y: cell.y-1},
      {x: cell.x+1, y: cell.y+1},
      {x: cell.x+1, y: cell.y-1},
      {x: cell.x-1, y: cell.y+1}
  ]
}

// Supprime les possibles voisins doublons (pour éviter de les retester)
export function removeDuplicates(voisins: Configuration) {
  return voisins.reduce((unique: Configuration, voisin: Cell) => {
      if(!unique.some(cell => cell.x === voisin.x && cell.y === voisin.y)) unique.push(voisin);
      return unique;
  },[]);
}
