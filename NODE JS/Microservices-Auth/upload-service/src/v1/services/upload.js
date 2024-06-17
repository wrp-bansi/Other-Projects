const path = require('path');
const fs = require('fs');

async function moveFileToFolder(files, folderName) {
  const finalPaths = [];
  for (const file of files) {
    const fileName = path.basename(file);
    const sourceFilePath = path.join(__dirname, '..', '..', 'v1', 'uploads', 'temp', fileName);
    const targetFolderPath = path.join(__dirname, '..', '..', 'v1', 'uploads', folderName);

    // Check if the source file exists
    if (!fs.existsSync(sourceFilePath)) {
      throw new Error(`File '${fileName}' not found in the source folder`);
    }

    // Ensure the target folder exists, if not, create it
    if (!fs.existsSync(targetFolderPath)) {
      fs.mkdirSync(targetFolderPath, {recursive: true});
    }

    // Check if the image file exists in the source folder
    if (!fs.existsSync(sourceFilePath)) {
      throw new Error(`Image '${fileName}' not found in the source folder`);
    }
    const finalFilePath = path.join(targetFolderPath, fileName);
    // Move the file to the target folder
    try {
      await fs.promises.rename(sourceFilePath, finalFilePath);
      finalPaths.push(finalFilePath);
    } catch (error) {
      throw new Error(`Error moving file '${fileName}': ${error.message}`);
    }
  }
  return finalPaths;
}


module.exports = {moveFileToFolder};
