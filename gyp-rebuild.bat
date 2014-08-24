@echo off
cd node_modules
cd ffi
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
cd ..\..