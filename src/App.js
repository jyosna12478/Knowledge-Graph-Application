import React, { useState } from 'react';
import GraphView from './GraphView';
import NodeForm from './NodeForm';
import RelationshipForm from './RelationshipForm';
import './App.css'; // Import the CSS file
import { Neo4jProvider } from 'use-neo4j';
import neo4j from 'neo4j-driver';  

function App() {
  const driver = neo4j.driver(
    'bolt+s://4fcf02a9.databases.neo4j.io', // Replace with your Neo4j AuraDB URI
    neo4j.auth.basic('neo4j', 'erZks85Am7jENJbYi1kw-d4GIBHsr9znqiRHcgAzYoE') // Replace with your username and password
  );

  const [refresh, setRefresh] = useState(false); // Refresh control

  return (
    <Neo4jProvider driver={driver}>
      <div className="App">
        <h1>Knowledge Network</h1>
        <NodeForm setRefresh={setRefresh} />
        <RelationshipForm setRefresh={setRefresh} />
        <GraphView refresh={refresh} />
      </div>
    </Neo4jProvider>
  );
}

export default App;