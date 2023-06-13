//This program reads a blkXXXXXX.dat file from bitcoin blockchain

/* And returns its info in the following format:
{
  magicNumber: 3652501241,
  blockSize: 1407019,
  version: 566018048,
  previousBlockHash: 'be46993c376ae104f8ac832092984b558e834c8150b604000000000000000000',
  merkleRootHash: 'f20fe18ecdb43955db807b190838c1176dc4ecde35300e188e222cabcabdd1b2',
  timestamp: 1686600818,
  difficultyTarget: 386236009,
  nonce: 3273299081
}
*/

//Pls place this program outside of the block folder
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Enter the block number to read a particular block
rl.question('Enter block no.: ', (num) => {
  const filename = `blk${num}.dat`;
  console.log(`Filename: ${filename}`);
  const filePath = `block/${filename}`;
  console.log(`Filepath: ${filePath}\n`);

  /* Read the binary file as raw data */
  const rawData = fs.readFileSync(filePath);

  /* Convert the raw data to a buffer */
  const buffer = Buffer.from(rawData);

  /* Parse the buffer into a Bitcoin block object */
  const block = parseBitcoinBlock(buffer);

  /* Print the block object to the console */
  console.log(block);

  rl.close();
});

/* Function to parse a Bitcoin block buffer into an object */
function parseBitcoinBlock(buffer) {
  const block = {};

  // Parse block header
  block.magicNumber = buffer.readUInt32LE(0);
  block.blockSize = buffer.readUInt32LE(4);
  block.version = buffer.readUInt32LE(8);
  block.previousBlockHash = buffer.slice(12, 44).toString('hex');
  block.merkleRootHash = buffer.slice(44, 76).toString('hex');
  block.timestamp = buffer.readUInt32LE(76);
  block.difficultyTarget = buffer.readUInt32LE(80);
  block.nonce = buffer.readUInt32LE(84);

  // Parse transaction data (skipped in this example)
  return block;
}
