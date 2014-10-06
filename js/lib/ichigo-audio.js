var isWindowsRelease = true;

var ffi = require('ffi');
var ref = require('ref');
var wchar_t = require('ref-wchar');
var wchar_string = wchar_t.string;

var ichigoAudio = ffi.Library(isWindowsRelease ? 'ichigo-audio.dll' : 'ichigo-audio.dylib', {

	//
	// Initializes the Ichigo Audio library
	//
	'ig_initialize': ['bool', [ 'int', 'int' ]],

	//
	// Returns count of available devices
	//
	'ig_get_device_count': ['int', []],

	//
	// Returns selected device name
	//
	'ig_get_device_name': ['string', [ 'int' ]],

	//
	// Creates an audio stream from file
	//
	'ig_create_stream': ['int', [ isWindowsRelease ? wchar_string : 'string' ]],

	//
	// Creates an audio stream from URL
	//
	'ig_create_stream_from_url': ['void', [ 'string' ]],

	//
	// Plays the currently loaded stream
	//
	'ig_play': ['void', []],

	//
	// Pauses the currently loaded stream
	//
	'ig_pause': ['void', []],

	//
	// Stops the currently loaded stream
	//
	'ig_stop': ['void', []],

	//
	// Returns the current position in the stream (seconds)
	//
	'ig_get_pos': ['double', []],

	//
	// Returns the total length of the stream (seconds)
	//
	'ig_get_len': ['double', []],

	//
	// Sets the stream position, must pass seconds
	//
	'ig_set_pos': ['void', [ 'double' ]],

	//
	// Gets volume
	//
	'ig_get_volume': ['float', []],

	//
	// Sets volume, value must be between 0 and 1
	//
	'ig_set_volume': ['void', [ 'float' ]],

	//
	// Determines whether the stream is active or not
	//
	'ig_is_stream_active': ['bool', []],

	//
	// Determines whether the stream is paused or not
	//
	'ig_is_paused': ['bool', []],

	//
	// Reads tags on a current stream using the expression provided in tag_format
	// Encapsulate your expression in %UTF8(expression_here) in order to get UTF8 encoded output
	//
	// For more information on expression format, please see tags-readme.txt in ../ichigo-audio/dependencies/{OS}/tags
	//
	'ig_read_tag_from_current_stream': ['string', [ 'string' ]],

	//
	// Creates a dummy stream and reads tags using the expression provided in tag_format
	// Encapsulate your expression in %UTF8(expression_here) in order to get UTF8 encoded output
	//
	// For more information on expression format, please see tags-readme.txt in ../ichigo-audio/dependencies/{OS}/tags
	//
	// Arguments: file_name, tag_format
	//
	'ig_read_tag_from_file': ['string', [ isWindowsRelease ? wchar_string : 'string', 'string' ]],

	//
	// Grabs current stream's FFT data (up to 1024 values, or 2048 samples).
	//
	// value_count: 128 || 256 || 512 || 1024
	//
	'ig_get_fft': ['float[]', [ 'int' ]],

	//
	// Grabs current stream's FFT data (up to 1024 values, or 2048 samples)
	// and calculates an average.
	//
	// value_count: 128 || 256 || 512 || 1024
	//
	'ig_get_fft_avg': ['float', [ 'int' ]],

	//
	// Enables the equalizer
	//
	'ig_enable_equalizer': ['void', []],

	//
	// Disables the equalizer
	//
	'ig_disable_equalizer': ['void', []],

	//
	// Sets gain value on the specified equalizer band
	//
	// band: 0..n
	// quality: 0..2
	// freq: 1...n
	// gain 0..n
	//
	// Arguments: band, freq, gain
	//
	'ig_set_equalizer': ['void', [ 'int', 'float', 'float' ]]
	
});

// Initialize device.
// TODO: Allow user to choose device and sampling frequency.
console.log('Core library is in ' + (isWindowsRelease ? 'Windows' : 'OS X') + ' release mode');
console.log('Core library initialization status: ' + ichigoAudio.ig_initialize(-1, 44100));
