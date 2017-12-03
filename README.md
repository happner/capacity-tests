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
.es(index=capacity-stats, timefield='timestamp', metric='avg:group.servers').lines(width=1.5).color('orange').label('server count')

// Client Count
.es(index=capacity-stats, timefield='timestamp', metric='avg:group.clients').lines(width=1.5).color('green').label('client count')



// Test 01 - ws requests per second
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_called').lines(width=1.5).color('green').label('called'), .es(index=capacity-stats, timefield='timestamp', metric='avg:ws_handled').lines(width=1.5).color('blue').label('handled'), .es(index=capacity-stats, timefield='timestamp', metric='avg:ws_replied').lines(width=1.5).color('red').label('replied').title('ws requests per second')

// Test 01 - ws request durations (ms)
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_requesttime').lines(width=1.5).color('green').label('request time'), .es(index=capacity-stats, timefield='timestamp', metric='avg:ws_replytime').lines(width=1.5).color('blue').label('reply time'), .es(index=capacity-stats, timefield='timestamp', metric='avg:ws_totaltime').lines(width=1.5).color('red').label('total time').title('ws request durations')

// Test 01 - ws awaiting reply
.es(index=capacity-stats, timefield='timestamp', metric='avg:ws_waiting').lines(width=1.5).color('green').label('awaiting reply').title('ws awaiting reply')



// Test 02 - uws requests per second
.es(index=capacity-stats, timefield='timestamp', metric='avg:uws_called').lines(width=1.5).color('green').label('called'), .es(index=capacity-stats, timefield='timestamp', metric='avg:uws_handled').lines(width=1.5).color('blue').label('handled'), .es(index=capacity-stats, timefield='timestamp', metric='avg:uws_replied').lines(width=1.5).color('red').label('replied').title('uws requests per second')

// Test 02 - uws request durations (ms)
.es(index=capacity-stats, timefield='timestamp', metric='avg:uws_requesttime').lines(width=1.5).color('green').label('request time'), .es(index=capacity-stats, timefield='timestamp', metric='avg:uws_replytime').lines(width=1.5).color('blue').label('reply time'), .es(index=capacity-stats, timefield='timestamp', metric='avg:uws_totaltime').lines(width=1.5).color('red').label('total time').title('uws request durations')

// Test 02 - uws awaiting reply
.es(index=capacity-stats, timefield='timestamp', metric='avg:uws_waiting').lines(width=1.5).color('green').label('awaiting reply').title('uws awaiting reply')



// Test 03 - primus requests per second
.es(index=capacity-stats, timefield='timestamp', metric='avg:primus_called').lines(width=1.5).color('green').label('called'), .es(index=capacity-stats, timefield='timestamp', metric='avg:primus_handled').lines(width=1.5).color('blue').label('handled'), .es(index=capacity-stats, timefield='timestamp', metric='avg:primus_replied').lines(width=1.5).color('red').label('replied').title('primus requests per second')

// Test 03 - primus request durations (ms)
.es(index=capacity-stats, timefield='timestamp', metric='avg:primus_requesttime').lines(width=1.5).color('green').label('request time'), .es(index=capacity-stats, timefield='timestamp', metric='avg:primus_replytime').lines(width=1.5).color('blue').label('reply time'), .es(index=capacity-stats, timefield='timestamp', metric='avg:primus_totaltime').lines(width=1.5).color('red').label('total time').title('primus request durations')

// Test 03 - primus awaiting reply
.es(index=capacity-stats, timefield='timestamp', metric='avg:primus_waiting').lines(width=1.5).color('green').label('awaiting reply').title('primus awaiting reply')











// Test 10 - happner methods per second
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_called').lines(width=1.5).color('green').label('called'), .es(index=capacity-stats, timefield='timestamp', metric='avg:methods_handled').lines(width=1.5).color('blue').label('handled'), .es(index=capacity-stats, timefield='timestamp', metric='avg:methods_replied').lines(width=1.5).color('red').label('replied')

// Test 10 - happner method errors per second
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_errored').lines(width=1.5).color('red').label('errored')

// Test 10 - happner method durations (ms)
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_requesttime').lines(width=1.5).color('green').label('request time'),
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_replytime').lines(width=1.5).color('blue').label('reply time'),
.es(index=capacity-stats, timefield='timestamp', metric='avg:methods_totaltime').lines(width=1.5).color('red').label('total time')
```

