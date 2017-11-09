# happner-cluster-capacity-tests

Distributed capacity tests for HappnerCluster.

A work in progress.

* Uses [startle](https://github.com/nomilous/startle) to distribute the server and client processes across multiple hosts.
* Uses [netrix](https://github.com/nomilous/netrix) to accumulate runtime metrics.
* Uses ES6 features. Requires node >=8

### To run locally.

1. Run 3 startle servers as follows.

```
node_modules/.bin/startle run-server -p . -t XXX -g clients -P 50001 -d
node_modules/.bin/startle run-server -p . -t XXX -g servers -P 50002 -d
node_modules/.bin/startle run-server -p . -t XXX -g metrics -P 50003 -d
```

2. Copy  `exampleConfig.js` to `config.js`.
3. Run test scripts.




### To view metrics on workstation.

1. Pull docker images for kibana and elasticsearch.

```
docker pull docker.elastic.co/elasticsearch/elasticsearch:5.6.3
docker pull docker.elastic.co/kibana/kibana:5.6.3
```

2. Start them using docker-compose (from root of repo, where the docker-compose.yml file is)

```
docker-compose up
```

3. Uncomment `elasticsearch.url` in config (do not run tests until step 4 is done).
4. Create index and type in elasticsearch (do this before sending in any data by running tests)

```
// create index

curl -H 'Content-Type: application/json' -X PUT -d '{
  "settings": {}
}' http://localhost:9200/cluster-capacity

// create type definition

curl -H 'Content-Type: application/json' -X PUT -d '{
  "properties": {
    "name": {
      "type": "text"
    },
    "value": {
      "type": "double"
    },
    "timestamp": {
      "type": "date"
    },
    "type": {
      "type": "keyword"
    }
  }
}' http://localhost:9200/cluster-capacity/_mapping/stats

```

5. [http://localhost:5601](http://localhost:5601)
6. Set `cluster-capacity` as index pattern and `timestamp` as "time filter field"
7. Create graphs in timelion/dashboard

```
// server count
.es(index=cluster-capacity, timefield='timestamp', metric='avg:server.count').lines(width=1.5).color('orange').label('Server Count')

// client count
.es(index=cluster-capacity, timefield='timestamp', metric='avg:client.count').lines(width=1.5).color('green').label('Client Count')

// methods per second
.es(index=cluster-capacity, timefield='timestamp', metric='avg:methods.called').lines(width=1.5).color('green').label('Methods Called') .es(index=cluster-capacity, timefield='timestamp', metric='avg:methods.handled').lines(width=1.5).color('blue').label('Methods Handled') .es(index=cluster-capacity, timefield='timestamp', metric='avg:methods.replied').lines(width=1.5).color('red').label('Methods Replied')

// methods duration miliseconds
.es(index=cluster-capacity, timefield='timestamp', metric='avg:methods.inlag').lines(width=1.5).color('green').label('Request Lag')
.es(index=cluster-capacity, timefield='timestamp', metric='avg:methods.outlag').lines(width=1.5).color('blue').label('Response Lag')
.es(index=cluster-capacity, timefield='timestamp', metric='avg:methods.lag').lines(width=1.5).color('red').label('Total')


```

