#!/usr/bin/env node

// Usage: npx create-express-app my-app

const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');
const templateConfig = require('./.template.json');

// The first argument will be the project name.
const projectName = process.argv[2];

// Create a project directory with the project name.
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

const templateDir = path.resolve(__dirname, 'template');
templateConfig.include.forEach(function(include) {
  fs.cpSync(templateDir, projectDir, { recursive: true });
});

const projectPackageJson = require(path.join(projectDir, 'package.json'));

// Update the project's package.json with the new project name
projectPackageJson.name = projectName;
delete projectPackageJson.description;
delete projectPackageJson.scripts;

fs.writeFileSync(
  path.join(projectDir, 'package.json'),
  JSON.stringify(projectPackageJson, null, 2)
);

spawn.sync('npm', ['install'], { stdio: 'inherit' });

console.log(`Created ${projectName} at ${projectDir}`);
