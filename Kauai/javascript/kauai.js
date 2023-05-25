//first call in driver.js initializes our vDom and manifest
export function init() {
	return new vDom();
}

//used in fragments.js to generate DomEls
export function dom_el(type,style="",text="") {
	return new DomEl(type, -1, -1,style,text);
}

//used in fragments.js as a container for DomEls so we can build components
//children are DomEls that will be appended to the fragment root
export function fragment(type,style="",...children) {
	return new Fragment(type,style,...children);
}

class vDom {
	constructor() {
		this.manifest = new IDgen;
		this.root = new DomEl('body',0,'html');
		this.manifest.add();

		this.root_element = document.getElementById("0");
	}

	//log the DomEl with 'id'
	log(id) {
		console.log(this.root.dig(id));
	}

	// true/false
	has(id) {
		return this.manifest.has(id);
	}

	// true/false for success
	remove(id) {
		// if its in the manifest and removed from it
		if(this.manifest.remove(id)) {
			//dig for the DomEL with 'id' and remove it from it's parent
			let parent_id = this.root.dig(id).parent;
			this.root.dig(parent_id).removeChild(id);
			document.getElementById(id).remove();
			return true;
		}
		return false;
	}

	//returns DomEl or false, checks all descendants with dig()
	get(id) {
		if(id === 0) {
			return this.root;
		}
		if(this.manifest.has(id)) {
			return this.root.dig(id);
		}
		return false;
	}

	//this returns the new DomEl's id for reference later
	//DomEl's with text get a nested TextNode generated in draw() that isn't a DomEl
	add(type,parent,style="",text="") {
		let found = this.get(parent);
		if(found === false) {
			return false;
		}
		let newID = this.manifest.add();
		found.addChild(new DomEl(type,newID,parent,style,text));
		return newID;
	}

	//append a DomEl to a parent, DomEl must already have parent assigned
	append(el) {
		let found = this.get(el.parent);
		if(found === false) {
			return false;
		}
		found.addChild(el);
		return true;
	}

	//draw all elements again, starting at the root
	draw() {
		this.root.draw();
	}

	//integrate a fragment into the vDom, optionally specify a parent id to nest within a vDom descendant
	render(fragment,parent = 0) {
		fragment.root.parent = parent;
		fragment.assignIds(this.manifest);
		this.root.dig(parent).addChild(fragment.root);
	}
}

class DomEl {
	//style is a string of classnames separated by spaces
	//both this and text are optional
	//when constructor is called inside a fragment, the vDom.render call will 
	//assign id and parent, so set these to -1
	constructor(type, id, parent, style = "", text = "",css = "") {
		this.type = type;
		this.id = id;
		this.parent = parent;
		this.children = [];
		if(this.style !== "")
			this.style = style.split(' ');
		this.text = text;
		this.css = css;

		// events branch //
		this.listeners = [];
	}
	
	//this makes sure objects are DomEls before adding them to this.children
	//return true/false for success check
	addChild(el) {
		if(!el instanceof DomEl)
			return false;
		this.children.push(el);
		return true;
	} 

	//this takes children with 'id' out of the children array
	//return true/false for success check
	removeChild(id) {
		for(let i = 0; i < this.children.length; i++) {
			if(this.children[i].id === id) {
				if(i === 0) {
					this.children.shift();
					return true;
				}
				if(i === this.children.length - 1) {
					this.children.pop();
					return true;
				}
				this.children = this.children.slice(0,i).concat(this.children.slice(i+1));
				return true;
			}
		}
		return false;
	}

	// events branch //
	// render() will need to instantiate these listeners
	addListener(type,callback) {
		let item = {type,callback};
		this.listeners.push(item);
	}

	//returns a DomEl or false, checks all descendant children
	dig(id) {
		if(id === this.id)
			return this;
		for(let item of this.children) {
			if(item.id === id) {
				return item;
			} else {
				let subdig = item.dig(id);
				if(subdig !== false) {
					return subdig;
				}
			}
		}
		return false;
	}

	//createElement for all descendant DomEls, I call this on the root element
	//since it's the only one that is in the html by default
	draw() {
		let parent = document.getElementById(this.id);
		
		for(let item of this.children) {
			let child = document.createElement(item.type);


			if(item.style !== "") {
				for(let css_class of item.style) {
					child.classList.add(css_class);
				}
			}
			child.id = item.id;
			if(item.text !== "") {
				child.appendChild(document.createTextNode(item.text));
			}
			parent.appendChild(child);

			// events branch //
			for(let ear of item.listeners) {
				child.addEventListener(ear.type,ear.callback);
			}

			if(item.css !== "") {
				child.style = item.css;
			}

			item.draw();
		}
	}

	set_css(text) {
		this.css = text;
	}
}

class Fragment {
	//vDom.render will assign the id and parent, vDom.manifest needs to be visible to assign correct IDs
	//events branch // for type == 'button', pass in text for the button instead of ...children
	constructor(type,style, ...children) {
		if(type === 'button') {
			this.root = new DomEl(type,-1,-1,style,children[0]);
		} else {
			this.root = new DomEl(type,-1,-1,style);
			for(let item of children) {
				this.root.addChild(item);
			}
		}
	}

	//add DomEl to fragment, default parent is root but a different DomEl
	//can be designated if you want
	add(new_el,dom_el = this.root) {
		dom_el.addChild(new_el);
	}

	//vDom.render will call this to assign id and parent for all elements in 
	//the fragment, we pass in manifest to have access to it from the call
	//in the js driver file
	assignIds(manifest) {
		const assignChildren = function(domel,manifest) {
			for(let child of domel.children) {
				child.id = manifest.add();
				child.parent = domel.id;
				assignChildren(child,manifest);
			}
		}
		this.root.id = manifest.add();
		assignChildren(this.root,manifest);
	}
}

//unique id generator to label all our elements
class IDgen {
	constructor() {
		this.list = [];
	}

	has(val) {
		for(let item of this.list) {
			if(item === val)
				return true;
		}
		return false;
	}

	//generate a unique id, store in this.list and return it
	add() {
		let i = 0;
		while(this.has(i)) {
			i++;
		}
		this.list.push(i);
		return i;
	}

	remove(id) {
		for(let i = 0; i < this.list.length; i++) {
			if(this.list[i] === id) {
				if(i === 0) {
					this.list.shift();
					return true;
				}
				if(i === this.list.length - 1) {
					this.list.pop();
					return true;
				}
				this.list = this.list.slice(0,i).concat(this.list.slice(i+1));
				return true;
			}
		}
		return false;
	}
}