function createBoardGraph() {
  let graph = {};

  function validSquare(x, y) {
    if (x < 0 || y < 0 || x > 7 || y > 7) return false;
    return true;
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      graph[`${i},${j}`] = [];
      validSquare(i + 1, j + 2)
        ? graph[`${i},${j}`].push(`${Math.abs(i + 1)},${Math.abs(j + 2)}`)
        : null;
      validSquare(i + 2, j + 1)
        ? graph[`${i},${j}`].push(`${Math.abs(i + 2)},${Math.abs(j + 1)}`)
        : null;
      validSquare(i - 1, j + 2)
        ? graph[`${i},${j}`].push(`${Math.abs(i - 1)},${Math.abs(j + 2)}`)
        : null;
      validSquare(i - 2, j + 1)
        ? graph[`${i},${j}`].push(`${Math.abs(i - 2)},${Math.abs(j + 1)}`)
        : null;
      validSquare(i - 1, j - 2)
        ? graph[`${i},${j}`].push(`${Math.abs(i - 1)},${Math.abs(j - 2)}`)
        : null;
      validSquare(i + 1, j - 2)
        ? graph[`${i},${j}`].push(`${Math.abs(i + 1)},${Math.abs(j - 2)}`)
        : null;
      validSquare(i + 1, j - 2)
        ? graph[`${i},${j}`].push(`${Math.abs(i + 1)},${Math.abs(j - 2)}`)
        : null;
      validSquare(i + 2, j - 1)
        ? graph[`${i},${j}`].push(`${Math.abs(i + 2)},${Math.abs(j - 1)}`)
        : null;
    }
  }

  return graph;
}

function knightMoves(source, goal) {

  function display(array) {
    console.log(`You made it in ${array.length} moves! Here's your path:`);
    array.forEach(element => {
      console.log(`[${element}]`);
    });
  }
  let graph = createBoardGraph()
  let bfsInfo = {};
  let route = [];
  let queue = [];
  queue.push(source);

  for (let node in graph) {
    bfsInfo[`${node}`] = {
      distance: null,
      predecessor: null,
    };
  }

  while (queue.length !== 0) {
    //  u is the vertex that is to be proccesed in queue, vertex v is the next
    let u = queue.shift();
    for (let i = 0; i < graph[u].length; i++) {
      let v = graph[u][i];
      if (bfsInfo[v].distance === null) {
        bfsInfo[v].predecessor = u;
        bfsInfo[v].distance = bfsInfo[u].distance + 1;
        if (v === goal) {
          let temp = v;
          while (temp != source) {
            route.unshift(temp);
            temp = bfsInfo[temp].predecessor;
          }
          route.unshift(source)
          display(route);
          return 'Success';
        }
        queue.push(v);
      }
    }
  }

  return bfsInfo;
}

let test = knightMoves("0,0", "7,7");