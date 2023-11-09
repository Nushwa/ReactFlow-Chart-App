import React, { useState, useEffect } from "react";
import { getFlowchartData } from "./getFlowchartData";
import Flowchart from "./Flowchart";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getFlowchartData();
        // console.log("Fetched Data:", fetchedData);
        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Premier League 2015/16 Football Match Data</h1>
      {isLoading ? <div>Loading...</div> : <Flowchart data={data} />}
    </div>
  );
}
