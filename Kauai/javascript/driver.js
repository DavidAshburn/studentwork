import * as Kauai from './kauai.js';
import * as Fragments from './fragments.js';

const vDom = Kauai.init();

let header = "Kauai.js";
let tagline = "Take a vacation.";
vDom.render(Fragments.title(header,tagline));

const demolish = val => vDom.remove(val);
vDom.render(Fragments.button(demolish, 5));

vDom.draw();