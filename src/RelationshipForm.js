import React, { useState } from 'react';
import { useWriteCypher } from 'use-neo4j';

function RelationshipForm({ setRefresh }) {
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [relationshipType, setRelationshipType] = useState('');

  const { loading, error, run } = useWriteCypher(
    'MATCH (a:Person {name: $startName}), (b:Person {name: $endName}) CREATE (a)-[r:' + relationshipType + ']->(b) RETURN r'
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (startNode.trim() && endNode.trim() && relationshipType.trim()) {
      console.log("Submitting relationship:", startNode, endNode, relationshipType);
      run({ startName: startNode, endName: endNode })
        .then(() => {
          console.log('Relationship added successfully:', startNode, relationshipType, endNode);
          setRefresh(prev => !prev);
        })
        .catch((err) => console.error('Failed to add relationship:', err));

      setStartNode('');
      setEndNode('');
      setRelationshipType('');
    } else {
      alert("Please enter valid start/end node names and relationship type.");
    }
  };

  if (loading) return <div>Adding relationship...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Start node name"
        value={startNode}
        onChange={(e) => setStartNode(e.target.value)}
      />
      <input
        type="text"
        placeholder="End node name"
        value={endNode}
        onChange={(e) => setEndNode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Relationship type"
        value={relationshipType}
        onChange={(e) => setRelationshipType(e.target.value)}
      />
      <button type="submit">Add Relationship</button>
    </form>
  );
}

export default RelationshipForm;