# capacity-tests

Distributed capacity tests for HappnerCluster.

A work in progress.

* Uses [startle](https://github.com/nomilous/startle) to distribute the server and client processes across multiple hosts.
* Uses ES6 features. Requires node >=8

### To run locally.

1. Run 3 startle servers as follows.

```
node_modules/.bin/startle run-server -p . -t XXX -g clients -P 50001 -d
node_modules/.bin/startle run-server -p . -t XXX -g servers -P 50002 -d
```

2. Copy  `exampleConfig.js` to `config.js`.
3. Run test scripts.




### To view metrics on workstation.

1. Pull docker images for kibana and elasticsearch.

```
docker-compose create
```

2. Start them using docker-compose (from root of repo, where the docker-compose.yml file is)

```
docker-compose up
```

5. Set `capacity-stats` as index pattern and `timestamp` as "time filter field"
6. Create graphs in timelion/dashboard

```
// Server Count
.es(index=capacity-stats, timefield='timestamp', metric='avg:group.servers').lines(width=1.5).color('orange').label('Server Count')

// Client Count
.es(index=capacity-stats, timefield='timestamp', metric='avg:group.clients').lines(width=1.5).color('green').label('Client Count')

// Test 01 - Methods Per Second
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_called').lines(width=1.5).color('green').label('Methods Called') .es(index=capacity-stats, timefield='timestamp', metric='avg:methods_handled').lines(width=1.5).color('blue').label('Methods Handled') .es(index=capacity-stats, timefield='timestamp', metric='avg:methods_replied').lines(width=1.5).color('red').label('Methods Replied')

// Test 01 - Method Errors Per Second
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_errored').lines(width=1.5).color('red').label('Methods Errored')

// Test 01 - Method Durations (ms)
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_requesttime').lines(width=1.5).color('green').label('Request Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_replytime').lines(width=1.5).color('blue').label('Reply Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_totaltime').lines(width=1.5).color('red').label('Total Time')

// Test 02 - Ws requests per second
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_called').lines(width=1.5).color('green').label('Ws Called') .es(index=capacity-stats, timefield='timestamp', metric='avg:ws_handled').lines(width=1.5).color('blue').label('Ws Handled') .es(index=capacity-stats, timefield='timestamp', metric='avg:ws_replied').lines(width=1.5).color('red').label('Ws Replied')

// Test 02 - Ws request durations
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_requesttime').lines(width=1.5).color('green').label('Request Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_replytime').lines(width=1.5).color('blue').label('Reply Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_totaltime').lines(width=1.5).color('red').label('Total Time')
```

