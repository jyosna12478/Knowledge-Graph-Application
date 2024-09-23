import React, { useState } from 'react';
import { useWriteCypher } from 'use-neo4j';

function NodeForm({ setRefresh }) {
  const [nodeName, setNodeName] = useState(""); 
  const { loading, error, run } = useWriteCypher(
    'CREATE (n:Person {name: $name}) RETURN n'
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (nodeName.trim()) { 
      console.log("Submitting node:", nodeName);
      run({ name: nodeName }) // Ensure that the name is passed as a parameter
        .then(() => {
          console.log("Node added successfully:", nodeName);
          setRefresh(prev => !prev); 
        })
        .catch((err) => console.error("Failed to add node:", err));
      setNodeName(""); 
    } else {
      console.error("Node name cannot be empty");
      alert("Please enter a valid node name.");
    }
  };

  if (loading) return <div>Adding node...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter node name" 
        value={nodeName} 
        onChange={(e) => setNodeName(e.target.value)} 
      />
      <button type="submit">Add Node</button>
    </form>
  );
}

export default NodeForm;