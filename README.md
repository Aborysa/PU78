[![Studynator Logo](./server/public/assets/images/logo.png)](http://studynator.me)
[![Build Status](http://drone.studynator.me/api/badges/Aborysa/PU78/status.svg)](http://drone.studynator.me/Aborysa/PU78)
[![codecov](https://codecov.io/gh/Aborysa/PU78/branch/master/graph/badge.svg)](https://codecov.io/gh/Aborysa/PU78)

## Requirements:
- [Node 6] (https://nodejs.org)
- npm (included with node 6)

## Setup should be as simple as:
### Run these commands in the terminal in order to set up the project
- git clone git@github.com:Aborysa/PU78.git
- cd PU78
- npm install
- npm install webpack concurrently supervisor -g


### Set up database and dataporten (or facebook/google+) SSO
Set up a mysql database and import db\_schema/all\_of\_studynator.sql
Then acquire a client secret and id at https://dashboard.dataporten.no/
and lastly copy the file server/config-example.json and rename the copy config.json
edit this file and fill in all the fields with correct information.

### Running the server
To run a dev server just use the command:
- npm start
in the root folder of the project (/PU78/)
