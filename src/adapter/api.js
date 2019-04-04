const API_ROOT = `http://localhost:3000`;

export const getPopGrowthPerDay = country => {
  console.log("api, getPopGrowthPerDay here", country);
  fetch(`${API_ROOT}/popgrowthperday/${country}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  }).then(res => console.log(res));
  //.then(resp => resp.json())
  // .then(res => console.log("RESPONSE FROM API ", res));
};

//console.log("RESPONSE FROM API ", response);
