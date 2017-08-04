/*
SLIDER
Created: 01/08/17
Updated: 02/08/17
Courtesy:
	Adonis Vieira
	WIZARDFLY
	http://wfly.esy.es
*/

// MODULE
Wapp.Sld = Wapp.Sld || {};

(function (doc, win, vars) {
	'use strict';

	vars = {
		sld 	: doc.getElementsByClassName('simpleSlider'),
		lock 	: false,
	};

	Wapp.Sld.Init = function () {
		console.log('-- mod: SLIDER --');
		Wapp.Sld.Listen();
		Wapp.Sld.Resize();
	};

	Wapp.Sld.Listen = function (el) {
		win.addEventListener('resize', Wapp.Sld.Resize, true);
    };

    Wapp.Sld.Resize = function () {
		Wapp.Sld.ChangeAmount();
		Wapp.Sld.CreateSlider();
	};

	Wapp.Sld.ChangeAmount = function () {
		var
			el = doc.querySelectorAll('.section.content .simpleSlider')[0];

		if (win.innerWidth < 450) {
			el.dataset.amount = 1;

		} else if (win.innerWidth < 550) {
			el.dataset.amount = 2;

		} else if (win.innerWidth < 650) {
			el.dataset.amount = 3;

		} else {
			el.dataset.amount = 4;
		}
	};

	Wapp.Sld.CreateSlider = function () {
		var
			x = 0,
			el,
			block = '';

        for (x = 0; x < vars.sld.length; x++) {
            el = vars.sld[x];

            // reset config
            block = el.getElementsByTagName('ul')[0];
            block.style.marginLeft = 0;
            Wapp.Sld.Controls(el);

            Wapp.Sld.SetWidth(el);
        }
	};

	Wapp.Sld.SetWidth = function (el) {
		var
			slide = el,
			amount = slide.dataset.amount,
			base = slide.getElementsByTagName('ul')[0],
			len = slide.getElementsByTagName('li'),
			grid = slide.parentElement,
			x = 0;

		// slider
		if (amount === '1') {
			for (x = 0; x < len.length; x++) {
	            el = len[x];
	            el.style.width = grid.offsetWidth + 'px';
	        }

			base.style.width = grid.offsetWidth * len.length + 'px';

		// carrossel
		} else {
			for (x = 0; x < len.length; x++) {
	            el = len[x];
	            el.style.width = grid.offsetWidth / amount + 'px';
	        }

			base.style.width = (grid.offsetWidth / amount) * len.length + 'px';
		}
	};

	Wapp.Sld.Controls = function (el) {
		var
			nav = '',
			div = '',
			btn = '';

		// create controls
		nav = el.getElementsByClassName('nav')[0];

        // remove (for resize)
        if (nav) {
            nav.remove();
        }

        div = doc.createElement('div');
        div.className = 'nav';

        // left [PREV]
        btn = doc.createElement('span');
        btn.className = 'prev ' + el.dataset.left;
        btn.addEventListener('click', function () {
    		Wapp.Sld.SetPrev(el);
    	}, true);

        div.append(btn);

        // right [NEXT]
        btn = doc.createElement('span');
        btn.className = 'next ' + el.dataset.right;
        btn.addEventListener('click', function () {
    		Wapp.Sld.SetNext(el);
    	}, true);

        div.append(btn);
        el.append(div);
	};

	Wapp.Sld.SetPrev = function (el) {
		if (vars.lock === false) {
			Wapp.Sld.Prev(el);
		}

		vars.lock = true;
	};

	Wapp.Sld.Prev = function (el) {
		var
			block = el.getElementsByTagName('ul')[0],
			style = block.currentStyle || win.getComputedStyle(block),
			marginLeft = style.marginLeft.replace('px', '').replace('-', ''),
			list = el.getElementsByTagName('li'),
			len = list.length,
			margin = list[0].offsetWidth,
			limit = (len - el.dataset.amount) * margin;

		margin = parseFloat(marginLeft) - parseFloat(margin);

		// for animation
		setTimeout(function () {
			vars.lock = false;
		}, 400);

		if (parseFloat(marginLeft) <= 0) {
			return false;

		} else {
			block.style.marginLeft = -margin + 'px';
		}
	};

	Wapp.Sld.SetNext = function (el) {
		if (vars.lock === false) {
			Wapp.Sld.Next(el);
		}

		vars.lock = true;
	};

	Wapp.Sld.Next = function (el) {
		var
			block = el.getElementsByTagName('ul')[0],
			style = block.currentStyle || win.getComputedStyle(block),
			marginLeft = style.marginLeft.replace('px', '').replace('-', ''),
			list = el.getElementsByTagName('li'),
			len = list.length,
			margin = list[0].offsetWidth,
			limit = (len - el.dataset.amount) * margin;

		margin = parseFloat(marginLeft) + parseFloat(margin);

		// for animation
		setTimeout(function () {
			vars.lock = false;
		}, 400);

		if (margin > limit) {
			return false;

		} else {
			block.style.marginLeft = -margin + 'px';
		}
	};

	// init
	//doc.addEventListener('DOMContentLoaded', Wapp.Sld.Init, true);
	// INIT in population JSON [1.default.js]

}(document, window, 'Private'));