export function streamToBuffer(stream: NodeJS.ReadableStream) {
    return new Promise<Buffer>((resolve) => {
        let buffer = Buffer.from([]);

        stream.on('data', (data: Buffer) => {
            buffer = Buffer.concat([buffer, data]);
        });

        stream.on('end', () => {
            resolve(buffer);
        });
    });
}