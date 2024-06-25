# Quake Log Parser

Quake Log Parser is a Nod project to parse kill data from a Quake log game.
An example output from the log file `qgames.log` can be found on `report.json`


## Example Output

```
  "game_1": {
    "total_kills": 4,
    "players": [
      "Mocinha",
      "Isgalamido",
      "Zeh",
      "Dono da Bola"
    ],
    "kills": {
      "Isgalamido": 1,
      "Zeh": -2,
      "Dono da Bola": -1
    },
    "kills_by_means": {
      "MOD_ROCKET": 1,
      "MOD_TRIGGER_HURT": 2,
      "MOD_FALLING": 1
    }
  }

  ```

## Running the project 

You can run the project using Node.js directly or through Docker, using the provided Makefile.

## Running with Node.js

```
# Dev mode 
  npm run start <logFile> <jsonOutpuFile>

# Prod 
  npm run start:prod <logFile> <jsonOutpuFile>

# Unit tests
  npm run test
```

### Running with docker through Makefile 

```
# Build image
make build 

# Run dev 
 make start logFile=<logFilePath> jsonFile=<JsonOutputPath>

# Run prod 
   make start:prod logFile=<logFilePath> jsonFile=<JsonOutputPath>

# Run tests 
  make test  
```

### Running with Docker without Makefile 

```
docker build -t quake-log-parser .

docker run -v .:/usr/src/app quake-log-parser <cmd> <logFile> <jsonFile>

``` 

Replace <cmd> with the command you want to run (npm run start:prod, or npm run test), and provide the appropriate file paths for <logFile> and <jsonFile>.


## Project Structure
* src/: Contains the source code for the project
* adapters/: Contains adapters for reading log files and writing reports
* useCases/GenerateReports.ts: The use case for generating reports from the log file
* entities/: Contains entity definitions such as KillData and MeansOfDeath
* interfaces/: Contains interface definitions for the project components
* tests/: Contains unit tests for the project
* Makefile: Provides commands for building, running, and testing the project using Docker


## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

