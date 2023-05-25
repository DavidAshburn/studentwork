import * as Kauai from './kauai.js'

export function title(main,sub) {
	let title = Kauai.dom_el('p','title',main);
	let row = Kauai.dom_el('div','flex-row-even');
	let mdsub = Kauai.dom_el('p','subtitle',sub);

	row.addChild(Kauai.dom_el('p','subtitle',sub));

	return Kauai.fragment('div','flex-col1',title,row);
}

export function button(method, ...params) {
	let frag = Kauai.fragment('button','btn-green','Remove Me');

	frag.root.css = "font-family: 'Aboreto',serif;";
	frag.root.css += "font-size: 30px;";
	frag.root.addListener('click',() => {
		method(...params)
	});
	return frag;
}