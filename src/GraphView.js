import React, { useEffect, useState } from 'react';
import { useReadCypher } from 'use-neo4j';

function GraphView({ refresh }) {
  const { loading, error, records, run } = useReadCypher(
    'MATCH (a)-[r]->(b) RETURN a, type(r) AS relationshipType, b'
  );
  const [shouldRun, setShouldRun] = useState(true);

  useEffect(() => {
    if (shouldRun) {
      run();
      setShouldRun(false);
    }
  }, [shouldRun, run]);

  useEffect(() => {
    if (refresh) {
      setShouldRun(true);
    }
  }, [refresh]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="graph-container">
      <h2>Graph Visualization Area</h2>
      <div className="relationship-container">
        {records && records.length > 0 ? (
          records.map((record, index) => {
            const startNode = record.get('a')?.properties?.name || 'Unnamed Node';
            const endNode = record.get('b')?.properties?.name || 'Unnamed Node';
            const relationshipType = record.get('relationshipType') || 'No relationship type';

            return (
              <div key={index} className="relationship-box">
                <div className="node-box">{startNode}</div>
                <div className="arrow-box">
                  <div className="relationship-type">{relationshipType}</div>
                  <span className="relationship-arrow">-&gt;</span>
                </div>
                <div className="node-box">{endNode}</div>
              </div>
            );
          })
        ) : (
          <p>No nodes or relationships found in the database.</p>
        )}
      </div>
    </div>
  );
}

export default GraphView;