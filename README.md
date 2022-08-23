XPerf-JS
========

[XPerf](https://github.com/lrh2000/xperf) uses a binary format to record TCP internal parameters. Here is a JavaScript library that deserializes that binary format.

Build
-------

 1. Download dependencies and build
```
npm install
```
 3. (Optional) Run tests
```
npm test
````

Usage
---------
First, import the library
```js
const xperf = require('xperf-js');
```

Then, initialize the deserialize
```js
const chunks = [];

const deserializer = new xperf.Deserializer(xperf.TCP_DATA, (data) => {
    chunks.push(data);
});
```
where the first argument specifies the data type (for now, only one data format `TCP_DATA` that represents the TCP internal indicators is supported), and the second argument specifies a callback function that will be invoked when some data become ready.

Next, feed some binary data into the deserialize (for TCP internal indicators, the data come from the file `kdat` produced by `xperf_client`)
```js
deserializer.feed(
    Buffer.from([
        0x08, 0x05, 0x00, 0x00, 0x78, 0x1d, 0xdf, 0x2a, 0x16, 0xb3, 0x0d, 0x17,
        0xa2, 0x01, 0x00, 0x00, 0x1b, 0x5a, 0x00, 0x00, 0xfe, 0xcb, 0x01, 0x00,
    ])
);
```

Now, it is expected to have the callback invoked with some deserialized TCP internal indicators. More specifically, `chunks` should be
```js
[
    {
        bltBw: 72.32299041748047, // bottleneck bandwidth (Mbps)
        cwnd: 0.538384, // congestion window (MiB)
        minRtt: 23.067, // minimum RTT (ms)
        stamp: 1661180745359, // UNIX timestamp (ms)
    },
]
```

See also `index.test.js` for full sources of this example.
