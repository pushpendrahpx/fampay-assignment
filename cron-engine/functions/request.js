const https = require("https");

const makeRequest = async (url = "", params = {}, data = {}) => {
  return new Promise((resolve, reject) => {
    let numOfParamkeys = Object.keys(params).length;
    if (numOfParamkeys > 0) {
      url += "?";
      Object.keys(params).forEach((eachKey, eachIndex) => {
        url += eachKey + "=" + params[eachKey];
        if (numOfParamkeys != eachIndex + 1) url += "&";
      });
    }
    console.log(url);
    https
      .get(url, (resp) => {
        let data = "";
        if (resp.statusCode !== 200) {
          reject(`API returned ${resp.statusCode} - ${resp.statusMessage}`);
          return;
        }
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          resolve(JSON.parse(data));
        });
        resp.on("error", (error) => {
          reject(error);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = {
  makeRequest,
};
