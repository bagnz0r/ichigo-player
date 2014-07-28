#!/bin/bash
rm -rf node_modules/nodewebkit
mkdir install
cd install
npm install nodewebkit@0.8.6
npm -g install node-gyp
npm -g install nw-gyp
mv node_modules/* ../node_modules/
cd ..
cd node_modules/ffi
nw-gyp rebuild --target=0.8.6
cd ..
cd iconv
nw-gyp rebuild --target=0.8.6
cd ..
cd ref
nw-gyp rebuild --target=0.8.6
cd ..
cd ref-struct
nw-gyp rebuild --target=0.8.6
cd ..
cd ref-wchar
nw-gyp rebuild --target=0.8.6
cd ..
cd bindings
nw-gyp rebuild --target=0.8.6
cd ..
rm -rf install