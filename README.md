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

