const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const createZipFile = async (files) => {
  const zipPath = path.join(__dirname, '..', `backup_${Date.now()}.zip`);
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  for (const { data, name } of files) {
    if (typeof data === 'string') {
      archive.append(data, { name });
    } else {
      throw new Error(`Invalid data type for file: ${name}`);
    }
  }

  await archive.finalize();

  return zipPath;
}

module.exports = { createZipFile };
