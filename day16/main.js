let answer1 = 0;
let answer2 = 0;
let mapData = [];
let startPosition;
let endPosition;
let position;
let directions = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];
let direction = 1;
let rotateDirection = 1;
let graph = {};
let cytoscapeData;

fetch("data.txt")
//fetch("data_simple.txt")
//fetch("data_bigger.txt")
  .then((response) => response.text())
  .then((textData) => {
    let temp = textData.split("\r\n");
    for (let i = 0; i < temp.length; i++) {
      mapData.push(temp[i].split(""));
    }

    //consoleLogMap();
    findStartPosition();
    findEndPosition();
    console.log(startPosition);
    console.log(endPosition);
    removeDeadEnds();
    makeGraph();
    //checkSolution(startPosition);
    //

   

    let tempMap = [...mapData];
    //console.log(Object.keys(graph));
    let keysTemp = Object.keys(graph);
    //visualizeGraphOnMap();
   


    function visualizeGraphOnMap() {
      for (let i = 0; i < keysTemp.length; i++) {
        let temp = keysTemp[i].replace("n", "").split("-");
        let x = parseInt(temp[0]);
        let y = parseInt(temp[1]);
        console.log(x + " " + y);
        tempMap[y][x] = "X";
      }
      
      let temp = "";
      for (let y = 0; y < tempMap.length; y++) {
        temp = temp + tempMap[y].join("")+ "\n";
      }
      console.log("tempMap");
      console.log(temp);
    }
    
    let startNode = "n" + startPosition.x + "-" + startPosition.y;
    let endNode = "n" + endPosition.x + "-" + endPosition.y;
    

    cytoscapeData = convertToCytoscape(graph);
    //console.log("cytoscapeData");
    //console.log(cytoscapeData);


    //cytoscapeData = convertToUndirected(cytoscapeData) 
    
    //console.log(cytoscapeData);
    //visualizeGraph()


    // Initialize Cytoscape.js
    const cy = cytoscape({elements: cytoscapeData.elements});  
    var dijkstra = cy.elements().aStar({root:"#"+startNode, goal:"#"+endNode, weight: function(edge){return edge.data('weight');}});    
    var pathToJ = dijkstra.path.select();
    //var distToJ = dijkstra.distanceTo( "#"+endNode );
    //console.log(pathToJ);

    let answer1 = 0;
   
    let foundPath = [];

    for (let i = 0; i < pathToJ.length; i++) {
      let temp = pathToJ[i]._private.data.id;
      //first letter starts with an n
     if (i%2 == 0) {    
        foundPath.push(temp);
        //console.log(pathToJ[i]);
        answer1 += pathToJ[i]._private.data.weight;
        //answer1 += 1000;
      }
    }
    //foundPath = [...new Set(foundPath)];  
    //console.log(foundPath);

    console.log("answer1: " + answer1);

     
    //mame a path on the map from the foundPath
    for (let i = 0; i < foundPath.length; i++) {
      let temp = foundPath[i].replaceAll("n","").split("-");
      let x = parseInt(temp[0]);
      let y = parseInt(temp[1]);
      //console.log(x + " " + y);
      mapData[y][x] = "X";
    }
    console.log("mapData with path:");
    consoleLogMap();

    //i got a path with X now calcultate the distance
    let distance = 0;
    for (let i = 0; i < foundPath.length-1; i++) {
      let temp = foundPath[i].replaceAll("n","").split("-");
      let x1 = parseInt(temp[0]);
      let y1 = parseInt(temp[1]);
      let temp2 = foundPath[i+1].replaceAll("n","").split("-");
      let x2 = parseInt(temp2[0]);
      let y2 = parseInt(temp2[1]);
      distance += Math.abs(x1-x2) + Math.abs(y1-y2);
      distance += 1000;
    }
    console.log("distance: " + distance);
    //101492 to high
    //112436 to high
    //101508 to high
    //112436 a star



    //101484 not right
    //100048 not right

  
    


  });
  
  function convertToUndirected(graphData) {
    const edges = graphData.elements.edges;
    const undirectedEdges = new Set();
  
    // Iterate through the edges to ensure bidirectionality
    edges.forEach(edge => {
      const source = edge.data.source;
      const target = edge.data.target;
      const weight = edge.data.weight;
  
      // Create a unique key for the edge
      const forwardKey = `${source}-${target}`;
      const reverseKey = `${target}-${source}`;
  
      // Add the edge if neither direction exists in the set
      if (!undirectedEdges.has(forwardKey) && !undirectedEdges.has(reverseKey)) {
        undirectedEdges.add(forwardKey); // Mark the forward edge
        undirectedEdges.add(reverseKey); // Mark the reverse edge
  
        // Add both directions to the undirected graph
        edges.push({ data: { source: target, target: source, weight } });
      }
    });
  
    return graphData;
  }
  


  function visualizeGraph() {
    // Initialize Cytoscape.js
    const cy = cytoscape({
      container: document.getElementById('cy'), // Container to render the graph
      elements: cytoscapeData.elements,
      style: [ // Define styles for nodes and edges
        {
          selector: 'node',
          style: {
            'background-color': '#0074D9',
            'label': 'data(id)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#FF4136',
            'target-arrow-color': '#FF4136',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(weight)',
            'font-size': '10px',
            'text-background-opacity': 1,
            'text-background-color': '#fff',
            'text-background-padding': '2px',
            'color': '#111'
          }
        }
      ],
      layout: {
        name: 'grid', // Layout algorithm (you can try 'grid', 'circle', etc.)
        padding: 10
      }
    });
  }

function convertToCytoscape(data) {
  const cytoscapeData = { elements: { nodes: [], edges: [] } };
  const seenNodes = new Set();

  // Add nodes and edges
  for (const source in data) {
    // Add source node if not already added
    if (!seenNodes.has(source)) {
      cytoscapeData.elements.nodes.push({ data: { id: source, position: {x: Number(source.replace("n","").split("-")[0]), y: Number(source.replace("n","").split("-")[1]) }} });
      seenNodes.add(source);
    }

    //  "position": { "x": 100, "y": 200 },

    // Add edges
    for (const connection of data[source]) {
      const target = connection.n;
      const weight = connection.d;

      // Add target node if not already added
      if (!seenNodes.has(target)) {
        cytoscapeData.elements.nodes.push({ data: { id: target, position: {x: Number(target.replace("n","").split("-")[0]), y: Number(target.replace("n","").split("-")[1]) }} });
        seenNodes.add(target);
      }

      // Add edge
      cytoscapeData.elements.edges.push({
        data: {
          source: source,
          target: target,
          weight: weight,
        },
      });
    }
  }
  //make undirected
  for (const source in data) {
    for (const connection of data[source]) {
      const target = connection.n;
      const weight = connection.d;
      let found = false;
      for (let i = 0; i < cytoscapeData.elements.edges.length; i++) {
        if (
          cytoscapeData.elements.edges[i].data.source == target &&
          cytoscapeData.elements.edges[i].data.target == source
        ) {
          found = true;
        }
      }
      if (!found) {
        cytoscapeData.elements.edges.push({
          data: {
            source: target,
            target: source,
            weight: weight,
          },
        });
      }
    }
  }

  return cytoscapeData;
}

//
//return all possible paths in the maze from start to end
//
//map . = empty space
//map # = wall
//
function consoleLogMap() {
  let temp = "";
  for (let i = 0; i < mapData.length; i++) {
    temp = temp + mapData[i].join("") + "\n";
  }
  temp = temp.replaceAll(".", " ");
  temp = temp.replaceAll("0", ".");
  //temp = temp.replaceAll("#", "■");

  console.log(temp);
}

function makeGraph() {
  //create a graph from the map based on all nodes... nodes are corners
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      if (mapData[y][x] == ".") {
        //check if this is a node...
        let isNode = false;
        //case 1: 3 or 4 empty spaces around it
        let count = 0;
        if (mapData[y + 1][x] == ".") {
          count++;
        }
        if (mapData[y - 1][x] == ".") {
          count++;
        }
        if (mapData[y][x + 1] == ".") {
          count++;
        }
        if (mapData[y][x - 1] == ".") {
          count++;
        }
        if (count > 2) {
          isNode = true;
        }
        //case 2: 2 empty spaces around it and they are not in the same direction
        count = 0;
        if (mapData[y + 1][x] == ".") {
          count++;
        }
        if (mapData[y - 1][x] == ".") {
          count++;
        }
        if (mapData[y][x + 1] == ".") {
          count++;
        }
        if (mapData[y][x - 1] == ".") {
          count++;
        }
        if (count == 2) {
          if (
            (mapData[y + 1][x] == "." && mapData[y - 1][x] == ".") ||
            (mapData[y][x + 1] == "." && mapData[y][x - 1] == ".")
          ) {
            isNode = false;
          } else {
            isNode = true;
          }
        }

        if (isNode) {
          let key = "n" + x + "-" + y;
          //find all nodes around this node and the distance to them
          graph[key] = [];
          //move up as far as possible
          let tempY = y;
          while (mapData[tempY - 1][x] == ".") {
            tempY--;
          }
          if (tempY != y) {
            graph[key].push({
              n: "n" + x + "-" + tempY,
              d: Math.abs(y - tempY)+1000,
            });
          }
          //move down as far as possible
          tempY = y;
          while (mapData[tempY + 1][x] == ".") {
            tempY++;
          }
          if (tempY != y) {
            graph[key].push({
              n: "n" + x + "-" + tempY,
              d: Math.abs(y - tempY)+1000,
            });
          }
          //move left as far as possible
          let tempX = x;
          while (mapData[y][tempX - 1] == ".") {
            tempX--;
          }
          if (tempX != x) {
            graph[key].push({
              n: "n" + tempX + "-" + y,
              d: Math.abs(x - tempX)+1000,
            });
          }
          //move right as far as possible
          tempX = x;
          while (mapData[y][tempX + 1] == ".") {
            tempX++;
          }
          if (tempX != x) {
            graph[key].push({
              n: "n" + tempX + "-" + y,
              d: Math.abs(x - tempX)+1000,
            });
          }
        }
      }
    }
  }
  //console.log("Graph-length: " + Object.keys(graph).length);
  //console.log(graph);
  //console.log("done");
}

function removeDeadEnds() {
  let deadEnd = false;
  do {
    deadEnd = false;
    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        if (mapData[y][x] == ".") {
          let count = 0;
          if (mapData[y + 1][x] == "#") {
            count++;
          }
          if (mapData[y - 1][x] == "#") {
            count++;
          }
          if (mapData[y][x + 1] == "#") {
            count++;
          }
          if (mapData[y][x - 1] == "#") {
            count++;
          }
          if (count >= 3) {
            if (
              (y == startPosition.y && x == startPosition.x) ||
              (y == endPosition.y && x == endPosition.x)
            ) {
              //do nothing because it is the start or end position
            } else {
              mapData[y][x] = "#";
              deadEnd = true;
            }
          }
        }
      }
    }
  } while (deadEnd);
}

function checkSolution(startPosition) {
  position = {
    x: startPosition.x,
    y: startPosition.y,
  };

  //while (position.x != endPosition.x && position.y != endPosition.y) {
  let foundEndpoint = false;

  while (!foundEndpoint) {
    let newPosition = {
      x: position.x + directions[direction].x,
      y: position.y + directions[direction].y,
    };
    if (newPosition.x == endPosition.x && newPosition.y == endPosition.y) {
      foundEndpoint = true;
      //console.log("Found endpoint");
      break;
    }
    if (
      mapData[newPosition.y][newPosition.x] == "." ||
      mapData[newPosition.y][newPosition] == "0"
    ) {
      if (mapData[newPosition.y][newPosition.x] == "0") {
        rotateDirection = -rotateDirection;
      }
      mapData[newPosition.y][newPosition.x] = "0";
      position.x = newPosition.x;
      position.y = newPosition.y;
    } else {
      direction = direction + rotateDirection;
      if (direction > 3) {
        direction = 0;
      }
      if (direction < 0) {
        direction = 3;
      }
    }
  }
}

function findStartPosition() {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      if (mapData[y][x] == "S") {
        startPosition = { x: x, y: y };
        mapData[y][x] = ".";
        break;
      }
    }
  }
}

function findEndPosition() {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      if (mapData[y][x] == "E") {
        endPosition = { x: x, y: y };
        mapData[y][x] = ".";
        break;
      }
    }
  }
}
