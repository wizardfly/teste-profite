/*
FULLY FUNCTIONS [default]
Created: 01/08/17
Updated: 02/08/17
Courtesy:
	Adonis Vieira
	WIZARDFLY
	http://wfly.esy.es
*/

// MODULE
Wapp.Fully = Wapp.Fully || {};

(function (doc, win, vars) {
	'use strict';

	vars = {
		urlSlider 	: 'api/slides.json',
		urlProduct 	: 'api/products.json',
	};

	Wapp.Fully.Init = function () {
		console.log('-- mod: FULLY FUNCTIONS --');

		// example loader connection [in production remove setTimeout]
		setTimeout(function () {
			Wapp.Fully.GetInfo(vars.urlSlider, 'slider');
		}, 1000);
	};

	Wapp.Fully.GetInfo = function (url, type) {
		var
			request = new XMLHttpRequest();

		request.open('GET', url, true);

		request.onreadystatechange = function() {
			if (request.readyState === 4) {
				if(request.status == 200) {
					if (type === 'product') {
						Wapp.Fully.PopulateProducts(JSON.parse(request.responseText));

					} else if (type === 'slider') {
						Wapp.Fully.PopulateSlides(JSON.parse(request.responseText));
					}
				}
			}
		};

		request.send(null);
	};

	Wapp.Fully.PopulateProducts = function (obj) {
		var
			key,
			key2,
			info,
			block = doc.querySelectorAll('.section.content .grid .simpleSlider .block')[0],
			loader = doc.querySelectorAll('.section.content .grid .loader')[0],
			ul = doc.createElement('ul'),
			li = '',
			figure = '',
			div = '',
			rating = '',
			a = '',
			buy = '',
			img = '',
			figcaption = '',
			p = '',
			span = '',
			strong = '',
			economy = '',
			em = '',
			i = '';

		for(key in obj) {
			for(key2 in obj[key]) {
				info = obj[key][key2];

				img = doc.createElement('img');
				img.src = info.img;
				img.alt = info.name;

				a = doc.createElement('a');
				a.title = info.name;
				a.href = info.href;
				a.append(img);

				// ----

				div = doc.createElement('div');
				div.append(a);

				// ----

				a = doc.createElement('a');
				a.title = info.name;
				a.href = info.href;
				a.text = info.name;

				figcaption = doc.createElement('figcaption');
				figcaption.append(a);

				// ----

				span = doc.createElement('span');
				span.style.width = info.rating;

				rating = doc.createElement('div');
				rating.classList.add('rating');
				rating.append(span);

				// ----

				span = doc.createElement('span');
				span.textContent = info.oldPrice;

				strong = doc.createElement('strong');
				strong.textContent = info.newPrice;

				em = doc.createElement('em');
				em.textContent = info.parcel;

				p = doc.createElement('p');
				p.append(span, strong, em);

				// ----

				i = doc.createElement('i');
				i.className = 'spr cart';

				// ----

				buy = doc.createElement('a');
				buy.title = 'Comprar';
				buy.text = 'Comprar';
				buy.href = info.href;
				buy.classList.add('buy');

				buy.append(i);

				// ----

				economy = doc.createElement('strong');
				economy.textContent = info.info;
				economy.classList.add('economy');

				// ----

				figure = doc.createElement('figure');
				figure.append(div, figcaption, rating, p, buy, economy);

				// ----

				li = doc.createElement('li');
				li.append(figure);

				// ----

				ul.append(li);
			}
		}

		loader.remove();
		block.append(ul);

		// module SLIDER
		Wapp.Sld.Init();
	};

	Wapp.Fully.PopulateSlides = function (obj) {
		var
			key,
			key2,
			info,
			block = doc.querySelectorAll('.section.slider .grid .simpleSlider .block')[0],
			loader = doc.querySelectorAll('.section.slider .grid .loader')[0],
			ul = doc.createElement('ul'),
			li = '',
			a = '',
			img = '';

		for(key in obj) {
			for(key2 in obj[key]) {
				info = obj[key][key2];

				img = doc.createElement('img');
				img.src = info.img;
				img.alt = info.name;

				a = doc.createElement('a');
				a.title = info.name;
				a.href = info.href;
				a.append(img);

				// ----

				li = doc.createElement('li');
				li.append(a);

				// ----

				ul.append(li);
			}
		}

		loader.remove();
		block.append(ul);

		// populate PRODUCTS
		Wapp.Fully.GetInfo(vars.urlProduct, 'product');
	};

	// init
	doc.addEventListener('DOMContentLoaded', Wapp.Fully.Init, true);

}(document, window, 'Private'));