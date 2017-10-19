# Node-Reverse-Proxy

Simple http reverse proxy cli tool

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
### get configs
get all configs
```shell
$ nrp-cli get
```

get specific config
```shell
$ nrp-cli get HOSTNAME
```

### set config
```shell
$ nrp-cli set HOSTNAME PORT
```

### delete config
```shell
$ nrp-cli del HOSTNAME
```

## Default

when the host is IP, you can set the DEFAULT port as the server.

### set default
```shell
$ nrp-cli setDefault PORT
```

## Author
[daixinye](https://github.com/daixinye)