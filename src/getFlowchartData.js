// getFlowchartData.js

async function getFlowchartData() {
  const url =
    "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getFlowchartData };
