require("dotenv").config();
const util = require("./util.json");

const YoutubeSearchv3 = util.YoutubeSearchv3;
const { makeRequest } = require("./functions/request");
var { mongoClient, pushData } = require("./inits/mongodb");
const CronJob = require("cron").CronJob;
const keywords = require("./keywords.json");
const { redisConnection } = require("./inits/redis");

const { API_KEY1, API_KEY2 } = process.env.API_KEY;
const APIKEYS = [API_KEY1, API_KEY2];

// This Var helps to maintain from which API KEY are we fetching
var API_KEY_INDEX = 0;
const task = () => {
  keywords.forEach(async (eachQuery, eachIndex) => {
    try {
      console.log(
        `made a request for ${eachQuery} at ${job.nextDate().ts} second`
      );

      let params = {
        key: APIKEYS[API_KEY_INDEX],
        part: "snippet",
        type: "video",
        q: eachQuery,
        maxResults: 100,
        order: "date",
      };

      let response = await makeRequest(YoutubeSearchv3, params);

      let updatedData = await pushData(
        {
          timestamp: new Date().getTime(),
          data: response,
        },
        "videos",
        eachQuery
      );

      let { redisClient } = redisConnection;
      // we remove this key so, new data can be fetched from DB
      redisClient.del(eachQuery);
      console.log(`CLEARED CACHE for keyword = ${eachQuery}`);
    } catch (error) {
      console.log(error);
    }
  });
};
// 5 *, means every 30 minute, we ignore seconds *
var job = new CronJob("*/30 * * * *", task, null, true, "Asia/Kolkata");
