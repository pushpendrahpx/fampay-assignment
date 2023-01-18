# fampay-assignment
Fampay Assignment


To Execute it on your machine ? 
1. ``` docker compose up ```

Made with ❤️ by Pushpendra Vishwakarma.

Frontend App - https://fampay.pushpendrahpx.me/

API Server - https://fampay-apis.pushpendrahpx.me/

There are 5 sections of this application
1. cron-engine
2. apiserver
3. reactserver
4. app ( React application code )
5. Redis ( Redis Cache as a Docker Container )

Services USed
1. EC2 Instance of Amazon Web Services
2. MongoDB Cloud 
3. Redis ( In Memory Cache ) 
4. Inside Docker

### 1. Cron-engine
Cron-Engine's task is to execute and pull Videos of Specefic Keywords at each specefic Interval.

### 2. API SErver
This server serves the API Request from the React app, and checks if data exists in cache or not, if not we move to MongoDB and fetch it and cache it.
And if again requests come for same query and new vdieos have not been loaded, then we serve data from cache

Redis is used for Caching.

### 3. reactserver
THis server serves the static content. It serves the production build of react application.

Wanna Know more ?
I'll update more descriptive expaination of this project in few hours in notion.
Visit - https://pushpendrahpx.notion.site/Fampay-Assignment-945feb9a1e7144c58deb6e4a942055dc
