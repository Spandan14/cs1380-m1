const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');
const os = require('os');
const events = require('events');
const stream = require('stream');
const util = require('util');
const querystring = require('querystring');
const zlib = require('zlib');
const buffer = require('buffer');
const childProcess = require('child_process');
const cluster = require('cluster');
const dgram = require('dgram');
const dns = require('dns');
const http2 = require('http2');
const v8 = require('v8');

const LIBRARIES = [
  fs, http, https, url, path, os, events, stream, util, querystring, zlib,
  buffer, childProcess, cluster, dgram, dns, http2, v8, globalThis, console,
];

function generateNativeFunctionMap() {
  var functionMap = new Map();
  for (let i = 0; i < LIBRARIES.length; i++) {
    traverseLibrary(LIBRARIES[i], functionMap);
  }
  return functionMap;
}

function traverseLibrary(library, functionMap) {
  var keys = Reflect.ownKeys(library);
  console.assert(Array.isArray(keys));
  for (let i = 0; i < keys.length; i++) {
    var value = library[keys[i]];
    if (typeof value === 'function') {
      functionMap.set(library[keys[i]], `<native ${functionMap.size}>`);
    }
    // } else if (typeof value === 'object') {
    //   if (value !== null) {
    //     traverseLibrary(library[keys[i]], functionMap);
    //   }
    // }
  }
}

module.exports = {
  generateNativeFunctionMap: generateNativeFunctionMap,
};
