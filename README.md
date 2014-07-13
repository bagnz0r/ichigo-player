ichigo-player
=============

Ichigo is a multiplatform audio player written in HTML5 with custom audio library written in C at its core.


Build instructions
=============
To build, you must first obtain following things:
* node.js v0.10.x
* node-gyp
* nw-gyp
* VS2013 (On Windows)
* g++ or clang (On OSX/Linux)

And of course - ichigo-audio repository. Make sure to have one folder setup for both ichigo-audio and ichigo-player repositories. Structure like this:
/myfolder/ichigo-audio
/myfolder/ichigo-player

Once you have both repositories cloned and everything setup, you must obtain ffi (clone it from its repo into node_modules/ffi folder) and build it for nodewebkit. You can do this by executing:
nw-gyp rebuild --target=0.8.6

In general - I'm a lazy motherfucker and I don't feel like making a proper readme. Bite me. Maybe I'll bother later.