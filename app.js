//graph template 
const adj_list = new Map()
//const sibeu_graph = new Map()


function addVertex(v_name){
  adj_list.set(v_name, [])
}

function addEdge(origin, destination, cost){
  adj_list.get(origin).push([destination, cost])
  adj_list.get(destination).push([origin, cost])
}

//test data

// const airports = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' ');
const places = 'Arad Bucharest Craiova Dobreta Eforie Fagaras Giurgiu Hirsova Iasi Lugoj Mehadia Neamt Oradea Pitesti Rimnicu_Vilcea Sibiu Timisoara Urziceni Vaslui Zerind'.split(' ')
//console.log(places)
// const routes = [
//     ['PHX', 'LAX'],
//     ['PHX', 'JFK'],
//     ['JFK', 'OKC'],
//     ['JFK', 'HEL'],
//     ['JFK', 'LOS'],
//     ['MEX', 'LAX'],
//     ['MEX', 'BKK'],
//     ['MEX', 'LIM'],
//     ['MEX', 'EZE'],
//     ['LIM', 'BKK'],
// ];

const routes_to_places = [
  ["Arad", "Zerind", 75],
  ["Arad", "Timisoara", 118],
  ["Arad", "Sibiu", 140],
  ["Bucharest", "Urziceni", 85],
  ["Bucharest", "Giurgiu", 90],
  ["Bucharest", "Pitesti", 101],
  ["Bucharest", "Fagaras", 211],
  ["Craiova", "Dobreta", 120],
  ["Craiova", "Pitesti", 138],
  ["Craiova", "Rimnicu_Vilcea", 146],
  ["Dobreta", "Mehadia", 75],
  ["Eforie", "Hirsova", 86],
  ["Fagaras", "Sibiu", 99],
  ["Hirsova", "Urziceni", 98],
  ["Iasi", "Neamt", 87],
  ["Iasi", "Vaslui", 92],
  ["Lugoj", "Mehadia", 70],
  ["Lugoj", "Timisoara", 111],
  ["Oradea", "Zerind", 71],
  ["Oradea", "Sibiu", 151],
  ["Pitesti", "Rimnicu_Vilcea", 97],
  ["Rimnicu_Vilcea", "Sibiu", 80],
  ["Urziceni", "Vaslui", 142]
]


places.forEach(place => addVertex(place))
routes_to_places.forEach(route => addEdge(...route))

console.log(adj_list)

//graph traversals

function breath_first_search(starting_node, destination){

  const visited = new Set()
  // queue structure: [(node_name, [path_to_the_node])]
  const queue = [[starting_node, [starting_node]]]
  

  while (queue.length > 0){
    const current_node = queue.shift()
    visited.add(current_node[0])

    if(current_node[0] === destination){
      console.log("found destination")
      console.log(current_node[1])
      return
    }

    const child_nodes = adj_list.get(current_node[0])
    //console.log(child_nodes)
    for(const child of child_nodes){
      //do something 
      const path_current_child = []

      current_node[1].forEach(node => path_current_child.push(node))
      path_current_child.push(child[0])

    
      if(!visited.has(child[0])){
        queue.push([child[0], path_current_child])
        
      }

      // if(child[0] === destination){
      //   console.log("found destination")
      //   console.log(path_current_child)
      //   return 
      // }
    }
  }
}


function best_first_search(starting_node, destination){
  //here f(n) => h(n) = g(n) 
  const visited = new Set()
  // queue structure: [([node_name, cost], [path_to_the_node])]
  const queue = [[[starting_node, 0], [[starting_node, 0]]]]
  

  while (queue.length > 0){
    const current_node = queue.shift()
    visited.add(current_node[0][0])
    let total_cost = 0
    if(current_node[0][0] === destination){
      console.log("found destination")
      console.log(current_node[1])
      console.log(`total cost ${current_node[0][1]}`)

      return
    }

    const child_nodes = adj_list.get(current_node[0][0])
    //console.log(child_nodes)
    for(const child of child_nodes){
      //do something 
      const path_current_child = []

      current_node[1].forEach(node => path_current_child.push(node))
      path_current_child.push(child)

    
      if(!visited.has(child[0])){
        total_cost = current_node[0][1] + child[1]
        //console.log(total_cost)
        queue.push([[child[0], total_cost], path_current_child])
        queue.sort(function(a, b){return a[0][1] - b[0][1]});
        
      }

      // if(child[0] === destination){
      //   console.log("found destination")
      //   console.log(path_current_child)
      //   console.log(`total cost ${total_cost}`)
      //   return 
      // }
    }
  }
}


const heuristics = {
  "Arad": 366,
  "Bucharest": 0,
  "Craiova":160,
  "Drobeta":242,
  "Eforie":161,
  "Fagaras":176,
  "Giurgiu":77,
  "Hirsova":151,
  "Iasi":226,
  "Lugoj":244,
  "Mehadia":241,
  "Neamt":234,
  "Oradea":380,
  "Pitesti":100,
  "Rimnicu_Vilcea":193,
  "Sibiu":253,
  "Timisoara":329,
  "Urziceni":80,
  "Vaslui":199,
  "Zerind":374,  
}

function a_star_search(starting_node, destination){
  //here f(n) = g(n) + h(n)
  const visited = new Set()
  // queue structure: [([node_name, cost, cost + heuristic], [path_to_the_node])]
  const queue = [[[starting_node, 0, heuristics[starting_node]], [[starting_node, 0]]]]
  

  while (queue.length > 0){
    const current_node = queue.shift()
    visited.add(current_node[0][0])
    let total_cost = 0
    let heuristic_cost = 0

    if(current_node[0][0] === destination){
      console.log("found destination")
      console.log(current_node[1])
      console.log(`total cost ${current_node[0][1]}`)
      return
    }

    const child_nodes = adj_list.get(current_node[0][0])
    
    for(const child of child_nodes){
      
      const path_current_child = []

      current_node[1].forEach(node => path_current_child.push(node))
      path_current_child.push(child)

    
      if(!visited.has(child[0])){
        total_cost = current_node[0][1] + child[1]
        heuristic_cost = total_cost + heuristics[child[0]]

        queue.push([[child[0], total_cost, heuristic_cost], path_current_child])
        queue.sort(function(a, b){return a[0][2] - b[0][2]}); //inefficient pirority queue
  
      }

    }
  }
}

//greedy_best_first_search("Oradea", "Neamt");
breath_first_search("Arad","Bucharest")
best_first_search("Arad","Bucharest")
a_star_search("Arad","Bucharest")