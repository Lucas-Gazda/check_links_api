import chalk from 'chalk';
import fs from 'fs';

// Reads file
export default async function readFile(file) {
   const encoding = 'utf-8';
   try {
      const text = await fs.promises.readFile(file, encoding);
      return getLinks(text);
   } catch (error) {
      handleError(error);
      console.log(file);
   }
}

// Handle read error
function handleError(error) {
   throw new Error(chalk.red(error.code, `/ File Not Found!`));
}

// Search for links on file
async function getLinks(text) {
   const regex = /\[([^\]]*)\]\((https?:\/\/[^#$. ]*\.[^ )]*)\)/gm
   const match = Array.from(text.matchAll(regex));
   return match.map((element) => ({ [element[1]]: [element[2]] }));
}
// readFile('./files/text.md');