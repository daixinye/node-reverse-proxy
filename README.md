# Node-Reverse-Proxy

Simple http reverse proxy cli tool

## Install

```
npm install nrp-cli -g
```

## Usage

### start proxy
need sudo
```
sudo nrp-cli start
```

## Config Commands
### get configs
get all configs
```
nrp-cli getall
```

get specific config
```
nrp-cli get HOSTNAME
```

### set config
```
nrp-cli set HOSTNAME PORT
```

### delete config
```
nrp-cli del HOSTNAME
```

## Default

when the host is IP, you can set the DEFAULT port as the server.

### set default
```
nrp-cli setDefault PORT
```

## Authors
[daixinye](https://github.com/daixinye)