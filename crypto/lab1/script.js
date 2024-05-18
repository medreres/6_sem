// * Реалізувати алгоритм обчислення контрольної суми (CRC) 

// * https://docs.google.com/document/d/15W1qytW8aSiksW3BoFma-Y8gzLKSalDQ/edit

function crc32(data) {
  const table = new Uint32Array(256);
  let crc = 0 ^ -1;

  for (let i = 0; i < 256; i++) {
    let temp = i;
    
    for (let j = 0; j < 8; j++) {
      if (temp & 1) {
        temp = (temp >>> 1) ^ 0xEDB88320;
      } else {
        temp >>>= 1;
      }
    }
    table[i] = temp;
  }

  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xFF];
  }

  return (crc ^ -1) >>> 0;
}

const testData = "Hello, world!";
const checksum = crc32(new TextEncoder().encode(testData));
console.log("CRC32 Checksum:", checksum.toString(16));