const {
	toBeDeepCloseTo,
	toMatchCloseTo,
} = require("jest-matcher-deep-close-to");
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

const xperf = require(".");

test("TCP_DATA backend", () => {
	const chunks = [];

	const deserializer = new xperf.Deserializer(xperf.TCP_DATA, (data) => {
		chunks.push(data);
	});

	deserializer.feed(
		Buffer.from([
			0x08, 0x05, 0x00, 0x00, 0x78, 0x1d, 0xdf, 0x2a, 0x16, 0xb3, 0x0d, 0x17,
		])
	);
	expect(chunks).toStrictEqual([]);

	deserializer.feed(
		Buffer.from([
			0xa2, 0x01, 0x00, 0x00, 0x1b, 0x5a, 0x00, 0x00, 0xfe, 0xcb, 0x01, 0x00,
		])
	);
	expect(chunks).toBeDeepCloseTo([
		{
			bltBw: 72.32299041748047, // bottleneck bandwidth (Mbps)
			cwnd: 0.538384, // congestion window (MiB)
			minRtt: 23.067, // minimum RTT (ms)
			stamp: 1661180745359, // UNIX timestamp (ms)
		},
	]);
});
