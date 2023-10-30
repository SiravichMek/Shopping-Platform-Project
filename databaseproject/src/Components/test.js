// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const imagePath = path.join(__dirname, '../imgs/ttt.jpg');

// fs.readFile(imagePath, (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//   } else {
//     console.log(data);
//   }
// });
// // _____________________________________________________________________________________________________
// // below this is change from buffer to image
// const imageBuffer = imagePath // Your LONGBLOB buffer

// // Specify the file path where you want to save the JPG file
// const outputPath = 'output.jpg';

// // Write the buffer data to a JPG file
// fs.writeFile(outputPath, imageBuffer, (err) => {
//   if (err) {
//     console.error('Error writing the image to a file:', err);
//   } else {
//     console.log('Image saved as output.jpg');
//   }
// });