# Node-Reverse-Proxy

Simple local http reverse proxy cli tool

## Install

```shell
$ npm install nrp-cli -g
```

## Usage

### start proxy
need sudo
```shell
$ sudo nrp-cli start
```

## Config Commands
### list configs
list all configs
```shell
$ nrp-cli ls
```

### add config
```shell
$ nrp-cli add <hostname> <port>
```

### set config
```shell
$ nrp-cli set <hostname> <port>
```

### delete config
```shell
$ nrp-cli del <hostname> <port>
```


## Author
[daixinye](https://github.com/daixinye)