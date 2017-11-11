# happner-cluster-capacity-tests

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
// Server Count
.es(index=cluster-capacity, timefield='timestamp', metric='avg:group.servers').lines(width=1.5).color('orange').label('Server Count')

// Client Count
.es(index=cluster-capacity, timefield='timestamp', metric='avg:group.clients').lines(width=1.5).color('green').label('Client Count')

// Methods Per Second
.es(index=cluster-capacity, timefield='timestamp', metric='avg:methods_called').lines(width=1.5).color('green').label('Methods Called') .es(index=cluster-capacity, timefield='timestamp', metric='avg:methods_handled').lines(width=1.5).color('blue').label('Methods Handled') .es(index=cluster-capacity, timefield='timestamp', metric='avg:methods_replied').lines(width=1.5).color('red').label('Methods Replied')

// Method Errors Per Second
.es(index=cluster-capacity, timefield='timestamp', metric='avg:methods_errored').lines(width=1.5).color('red').label('Methods Errored')

// Method Durations (ms)
.es(index=cluster-capacity, timefield='timestamp', metric='avg:methods_requesttime').lines(width=1.5).color('green').label('Request Time')
.es(index=cluster-capacity, timefield='timestamp', metric='avg:methods_replytime').lines(width=1.5).color('blue').label('Reply Time')
.es(index=cluster-capacity, timefield='timestamp', metric='avg:methods_totaltime').lines(width=1.5).color('red').label('Total Time')


```

