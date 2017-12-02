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



// Test 01 - Ws requests per second
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_called').lines(width=1.5).color('green').label('Called') .es(index=capacity-stats, timefield='timestamp', metric='avg:ws_handled').lines(width=1.5).color('blue').label('Handled') .es(index=capacity-stats, timefield='timestamp', metric='avg:ws_replied').lines(width=1.5).color('red').label('Replied')

// Test 01 - Ws request durations
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_requesttime').lines(width=1.5).color('green').label('Request Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_replytime').lines(width=1.5).color('blue').label('Reply Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_totaltime').lines(width=1.5).color('red').label('Total Time')

// Test 01 - Ws requests waiting
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_waiting').lines(width=1.5).color('green').label('Requests Waiting')



// Test 02 - uws requests per second
.es(index=capacity-stats, timefield='timestamp', metric='avg:uws_called').lines(width=1.5).color('green').label('Called') .es(index=capacity-stats, timefield='timestamp', metric='avg:uws_handled').lines(width=1.5).color('blue').label('Handled') .es(index=capacity-stats, timefield='timestamp', metric='avg:uws_replied').lines(width=1.5).color('red').label('Replied')

// Test 02 - uws request durations
.es(index=capacity-stats, timefield='timestamp', metric='avg:uws_requesttime').lines(width=1.5).color('green').label('Request Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:uws_replytime').lines(width=1.5).color('blue').label('Reply Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:uws_totaltime').lines(width=1.5).color('red').label('Total Time')

// Test 02 - uws requests waiting
.es(index=capacity-stats, timefield='timestamp', metric='avg:uws_waiting').lines(width=1.5).color('green').label('Requests Waiting')




// Test 10 - Methods Per Second
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_called').lines(width=1.5).color('green').label('Methods Called') .es(index=capacity-stats, timefield='timestamp', metric='avg:methods_handled').lines(width=1.5).color('blue').label('Methods Handled') .es(index=capacity-stats, timefield='timestamp', metric='avg:methods_replied').lines(width=1.5).color('red').label('Methods Replied')

// Test 10 - Method Errors Per Second
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_errored').lines(width=1.5).color('red').label('Methods Errored')

// Test 10 - Method Durations (ms)
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_requesttime').lines(width=1.5).color('green').label('Request Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_replytime').lines(width=1.5).color('blue').label('Reply Time')
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_totaltime').lines(width=1.5).color('red').label('Total Time')
```

