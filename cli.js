#!/usr/bin/env node
import chalk from 'chalk';
import readFile from './index.js';
import fs from 'fs';
import validation from './http-request.js';

const cli = process.argv;

// Checks the path forwarded in the terminal
export default async function verifyPathType(path) {
   try {
      if (fs.statSync(path).isDirectory()) {
         printResult(chalk.yellow(`The argument sended is a directory! Please replace to a file.`));
      } else if (fs.statSync(path).isFile()) {
         sendPath(`${path}`);
      }
   } catch (error) {
      if (error.code === 'ENOENT') {
         console.log(chalk.red(error.code, `File or Directory inexistent!`))
      } else {
         console.log(chalk.red(error.code, ` / Please, send a path to files into console!`));
      }
   }
}

// Calls the function to read the transferred file
async function sendPath(path) {
   const sendedFile = await readFile(path);
   printResult(sendedFile);
}

// Prints result in terminal
export async function printResult(argument) {
   const valid = cli[3] === '--valid';
   if (valid) {
      const validNow = await validation(argument);
      // console.log(validNow);
   } else {
      console.log(argument);
   }
}
verifyPathType(cli[2]);
