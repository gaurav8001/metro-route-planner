import React, { useState } from "react";
import MetroGraph from "./components/MetroGraph.jsx";
import { ReactFlowProvider } from "reactflow";

const initialStations = [
  { id: 0, name: "Station A", line: 1 },
  { id: 1, name: "Station B", line: 1 },
  { id: 2, name: "Station C", line: 2 },
  { id: 3, name: "Station D", line: 2 },
  { id: 4, name: "Station E", line: 3 },
  { id: 5, name: "Station F", line: 3 },
  { id: 6, name: "Station G", line: 1 },
];

const graph = Array.from({ length: 7 }, () => []);
graph[0].push({ destination: 1, distance: 10, cost: 50 });
graph[0].push({ destination: 2, distance: 20, cost: 30 });
graph[1].push({ destination: 2, distance: 5, cost: 10 });
graph[1].push({ destination: 3, distance: 15, cost: 40 });
graph[2].push({ destination: 1, distance: 5, cost: 20 });
graph[2].push({ destination: 3, distance: 10, cost: 25 });
graph[2].push({ destination: 4, distance: 20, cost: 50 });
graph[3].push({ destination: 2, distance: 10, cost: 10 });
graph[3].push({ destination: 5, distance: 20, cost: 30 });
graph[4].push({ destination: 2, distance: 20, cost: 30 });
graph[4].push({ destination: 5, distance: 10, cost: 20 });
graph[4].push({ destination: 6, distance: 5, cost: 10 });
graph[5].push({ destination: 3, distance: 20, cost: 10 });
graph[5].push({ destination: 4, distance: 10, cost: 10 });
graph[5].push({ destination: 6, distance: 15, cost: 20 });

// Dijkstra's Algorithm (Shortest Path by Distance)
function dijkstra(source, destination) {
  const n = graph.length;
  const dist = Array(n).fill(Infinity);
  const cost = Array(n).fill(Infinity);
  const parent = Array(n).fill(-1);
  const visited = Array(n).fill(false);
  dist[source] = 0;
  cost[source] = 0;

  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }
    if (u === -1) break;
    visited[u] = true;
    for (let edge of graph[u]) {
      if (dist[u] + edge.distance < dist[edge.destination]) {
        dist[edge.destination] = dist[u] + edge.distance;
        cost[edge.destination] = cost[u] + edge.cost;
        parent[edge.destination] = u;
      }
    }
  }

  const path = [];
  for (let at = destination; at !== -1; at = parent[at]) {
    path.push(at);
  }
  path.reverse();
  return [path, cost[destination]];
}

// BFS-like for Cheapest Path (minimal cost with distance as secondary)
function bfs(source, destination) {
  const n = graph.length;
  const dist = Array(n).fill(Infinity);
  const cost = Array(n).fill(Infinity);
  const parent = Array(n).fill(-1);
  const queue = [source];
  dist[source] = 0;
  cost[source] = 0;

  while (queue.length > 0) {
    const u = queue.shift();
    for (let edge of graph[u]) {
      const v = edge.destination;
      const d = dist[u] + edge.distance;
      const c = cost[u] + edge.cost;
      // Relax edge based on distance first, then cost
      if (d < dist[v] || (d === dist[v] && c < cost[v])) {
        dist[v] = d;
        cost[v] = c;
        parent[v] = u;
        queue.push(v);
      }
    }
  }

  const path = [];
  for (let at = destination; at !== -1; at = parent[at]) {
    path.push(at);
  }
  path.reverse();
  return [path, cost[destination]];
}

// DFS Utility to find Best Path by shortest number of stations (minimum stops)
function dfsUtil(u, dest, visited, path, bestPath, bestCost, currCost) {
  visited[u] = true;
  path.push(u);

  if (u === dest) {
    if (bestPath.path.length === 0 || path.length < bestPath.path.length) {
      bestPath.path = [...path];
      bestCost.value = currCost;
    }
  } else {
    for (let edge of graph[u]) {
      if (!visited[edge.destination]) {
        dfsUtil(edge.destination, dest, visited, path, bestPath, bestCost, currCost + edge.cost);
      }
    }
  }

  visited[u] = false;
  path.pop();
}

function dfs(source, destination) {
  const visited = Array(graph.length).fill(false);
  const path = [];
  const bestPath = { path: [] };
  const bestCost = { value: Infinity };
  dfsUtil(source, destination, visited, path, bestPath, bestCost, 0);
  return [bestPath.path, bestCost.value];
}

const App = () => {
  const [stations] = useState(initialStations);
  const [source, setSource] = useState(0);
  const [destination, setDestination] = useState(1);
  const [selectedPath, setSelectedPath] = useState([]);
  const [pathType, setPathType] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const handlePath = (type) => {
    let path = [], cost = 0;
    if (type === "shortest") [path, cost] = dijkstra(source, destination);
    else if (type === "cheapest") [path, cost] = bfs(source, destination);
    else if (type === "best") [path, cost] = dfs(source, destination);
    setSelectedPath(path);
    setPathType(type);
    setTotalCost(cost);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-6 shadow-md">
        <h1 className="text-4xl font-extrabold text-center">Indore Metro Route Planner🚇</h1>
        <p className="text-center text-lg mt-2">Choose a source and destination station to find optimal metro routes</p>
      </header>

      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <select
            className="p-2 border rounded"
            value={source}
            onChange={(e) => setSource(parseInt(e.target.value))}
          >
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded"
            value={destination}
            onChange={(e) => setDestination(parseInt(e.target.value))}
          >
            {stations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handlePath("shortest")}
          >
            Shortest Path
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => handlePath("cheapest")}
          >
            Cheapest Path
          </button>

          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={() => handlePath("best")}
          >
            Best Path (DFS)
          </button>
        </div>

        <ReactFlowProvider>
          <MetroGraph stations={stations} graph={graph} highlightedPath={selectedPath} />
        </ReactFlowProvider>

        {selectedPath.length > 0 && (
          <p className="text-center text-lg mt-4">
            <strong>{pathType.charAt(0).toUpperCase() + pathType.slice(1)} Path</strong>:{" "}
            {selectedPath.map((id) => stations[id].name).join(" → ")} <br />
            <strong>Total Cost</strong>: ₹{totalCost}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
