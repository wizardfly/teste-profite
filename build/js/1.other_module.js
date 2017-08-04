/*
Example [other module]
Created: 01/08/17
Updated: 02/08/17
Courtesy:
	Adonis Vieira
	WIZARDFLY
	http://wfly.esy.es
*/

// MODULE
Wapp.Example = Wapp.Example || {};

(function (doc, win, vars) {
	'use strict';

	Wapp.Example.Init = function () {
		console.log('-- mod: EXAMPLE --');
	};

	// init
	doc.addEventListener('DOMContentLoaded', Wapp.Example.Init, true);

}(document, window, 'Private'));