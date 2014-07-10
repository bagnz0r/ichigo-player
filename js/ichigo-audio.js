var ffi = require('ffi');
var ref = require('ref');
var wchar_t = require('ref-wchar');
var wchar_string = wchar_t.string;

var ichigoAudio = ffi.Library('ichigo-audio', {
	'ig_initialize': ['bool', ['int', 'int']],
	'ig_create_stream': ['void', [ wchar_string ]],
	'ig_play': ['void', []],
	'ig_pause': ['void', []],
	'ig_stop': ['void', []],
	'ig_get_pos': ['double', []],
	'ig_get_len': ['double', []],
	'ig_set_pos': ['void', ['double']],
	'ig_get_volume': ['float', []],
	'ig_set_volume': ['void', ['float']],
	'ig_is_stream_active': ['bool', []],
	'ig_is_paused': ['bool', []]
});

// Initialize device.
// TODO: Allow user to choose device and sampling frequency.
ichigoAudio.ig_initialize(-1, 44100);