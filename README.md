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

3. Uncomment `elasticsearch.url` in config.
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


// start over if any errors (byebye data too tho)
curl -X DELETE localhost:9200/cluster-capacity

```

3. set `cluster-capacity` as index pattern and `timestamp` as "time filter field" (possible because it was set to "date" in _mapping above).
4. [http://localhost:5601](http://localhost:5601)