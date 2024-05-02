/*!
 * acTiny JavaScript Library v0.1.0
 * https://github.com/anoniji/acTiny
 *
 * Released under the MIT license
 * https://github.com/anoniji/acTiny/LICENSE
 *
 * Date: 2024-05-22
 */

"use strict";


/* FUNCTIONS */
function isInList(list, value) {
	return list.indexOf(value) !== -1;
}

function fetchSimplify(typeRequete, url, header={}, body, isJson=true) {
	return new Promise((resolve, reject) => {
		try {
			if (body && typeof body !== 'string') {
				if (isJson) {
					header['Content-Type'] = 'application/json';
				} else {
					header['Content-Type'] = 'application/x-www-form-urlencoded';
				}
			}

			const options = {
				method: typeRequete,
				headers: header,
				body: body,
			};

			fetch(url, options).then(response => {
				if (isJson) {
					return response.json();
				} else {
					return response.text();
				}
			}).then(data => {
          		resolve(data);
        	}).catch(error => {
				console.error(error);
				reject(error);
			});
		} catch (error) {
			console.error(error);
			reject(error);
		}
	});
}

function animateSimplify(element, animation, duration=1000, delay=0) {
	return new Promise((resolve, reject) => { 
		element.style.animationDuration = `${duration}ms`;
		element.style.animationDelay = `${delay}ms`;

		// Add Animate.css class and trigger animation
		element.classList.add('animate__animated', `animate__${animation}`);

		// Remove initial styles after animation ends
		const animationEndHandler = () => {
			if(animation.includes("In")) {
				element.style.display = '';
				element.style.opacity = '';
			} else {
				element.style.display = 'none';
				element.style.opacity = '0';
			}			
			element.style.animationDuration = '';
			element.style.animationDelay = '';
			element.classList.remove('animate__animated', `animate__${animation}`);
			element.removeEventListener('animationend', animationEndHandler);
			resolve(this);
		};
		element.addEventListener('animationend', animationEndHandler);
	});
}

function checkAnimateImport() {
	for (const stylesheet of document.styleSheets) {
		const href = stylesheet.href;
		if (href.includes("animate")) {
			return true;
		}
	}
	return false;
}

/* LIST */
const effectList = [
	'bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat'
];
const animateList = [
	'backInDown', 'backInLeft', 'backInRight', 'backInUp', 'Back exits', 'backOutDown', 'backOutLeft', 'backOutRight', 'backOutUp',
	'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'Bouncing exits', 'bounceOut', 'bounceOutDown',
	'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig',
	'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeInTopLeft', 'fadeInTopRight', 'fadeInBottomLeft',
	'fadeInBottomRight', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig',
	'fadeOutUp', 'fadeOutUpBig', 'fadeOutTopLeft', 'fadeOutTopRight', 'fadeOutBottomRight', 'fadeOutBottomLeft', 'flip', 'flipInX',
	'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedInRight', 'lightSpeedInLeft', 'lightSpeedOutRight', 'lightSpeedOutLeft', 'rotateIn',
	'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'Rotating exits', 'rotateOut', 'rotateOutDownLeft',
	'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown',
	'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'slideInDown',
	'slideInLeft', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp'
];
const eventList = [
	'click', 'dblclick',
	'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout',
	'keydown', 'keyup','keypress', 
	'submit', 'change', 'input', 'load', 'resize', 'scroll', 'beforeunload', 'unload',
	'DOMContentLoaded', 'readystatechange', 
];
const directionFadeList = [
	'Down', 'Left', 'Right', 'Up',
	'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
	'DownBig', 'LeftBig', 'RightBig', 'UpBig'
];
const directionSlideList = ['Down', 'Left', 'Right', 'Up'];
const fetchList = {
	get: (url, header = {}, body) => {
		return fetchSimplify('GET', url, header, body, false);
	},
	getJSON: (url, header = {}, body) => {
		return fetchSimplify('GET', url, header, body, true);
	},
	post: (url, header = {}, body) => {
		return fetchSimplify('POST', url, header, body, false);
	},
	postJSON: (url, header = {}, body) => {
		return fetchSimplify('POST', url, header, body, true);
	},
	put: (url, header = {}, body) => {
		return fetchSimplify('PUT', url, header, body, false);
	},
	putJSON: (url, header = {}, body) => {
		return fetchSimplify('PUT', url, header, body, true);
	},
	delete: (url, header = {}, body) => {
		return fetchSimplify('DELETE', url, header, body, false);
	},
	deleteJSON: (url, header = {}, body) => {
		return fetchSimplify('DELETE', url, header, body, true);
	},
	options: (url, header = {}, body) => {
		return fetchSimplify('OPTIONS', url, header, body, false);
	},
	optionsJSON: (url, header = {}, body) => {
		return fetchSimplify('OPTIONS', url, header, body, true);
	},
};

/* $() */
function acTiny(selector) {
	let element;

	if (!selector) {
		console.error('No selector to specify, please specify one');
		return null;
	}

	if (selector.startsWith("#")) {
		const id = selector.slice(1);
		element = document.getElementById(id);
	} else if (selector.startsWith(".")) {
		const className = selector.slice(1);
		element = document.getElementsByClassName(className)[0];
	} else {
		element = document.querySelector(selector);
	}

	if (!element) {
		console.error(`Element not found with selector: ${selector}`);
		return null;
	}

	return {
		html: function(content=false) {
			if(content) {
				element.innerHTML = content;
				return this;
			}
			return element.innerHTML;
		},
		text: function(content=false) {
			if(content) {
				element.textContent = content;
				return this;
			} 
			return element.textContent;
		},
		val: function(content=false) {
			if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
				if(content) {
					element.value = content;
					return this;
				} else {
					return element.value;
				}
			} else {
				if(content) {
					element.textContent = content;
					return this;
				} else {
					return element.textContent;
				}
			}
		},
		after: function(elm, content) {
			const newContent = document.createElement(elm);
			newContent.textContent = content;

			if (!element.nextElementSibling) {
				return null;
			}
			element.parentNode.insertBefore(newContent, element.nextElementSibling);
			return this;
		},
		before: function(elm, content) {
			const newContent = document.createElement(elm);
			newContent.textContent = content;

			if (!element.nextElementSibling) {
				return null;
			}
			element.parentNode.insertAfter(newContent, element.nextElementSibling);
			return this;
		},
		prepend: function(content) {
			element.insertAdjacentHTML('afterbegin', content);
			return this;
		},
		append: function(content) {
			element.insertAdjacentHTML('beforeend', content);
			return this;
		},
		empty: function() {
			element.parentNode.removeChild(element);
			return this;
		},
		attr: function(attribute, content) {
			element.setAttribute(attribute, content);
			return this;
		},
		removeAttr: function(attribute) {
			element.removeAttribute(attribute);
			return this;
		},
		addClass: function(className) {
			element.classList.add(className);
			return this;
		},
		removeClass: function(className) {
			element.classList.remove(className);
			return this;
		},
		toggleClass: function(className) {
			element.classList.toggle(className);
			return this;
		},
		hasClass: function(className) {
			if(element.classList.contains(className)) {
				return this
			}
			return false;
		},
		css: function() {
			const styles = {};
			const computedStyles = window.getComputedStyle(element);
			for (const property in computedStyles) {
				if (computedStyles.hasOwnProperty(property)) {
					styles[property] = computedStyles[property];
				}
			}
			return styles;
		},
		position: function() {
			const rect = element.getBoundingClientRect();
			return {
				x: rect.left + window.scrollX,
				y: rect.top + window.scrollY
			};
		},
		width: function() {
			return element.offsetWidth;
		},
		height: function() {
			return element.offsetHeight;
		},
		prop: function(attribute, set) {
			if(set) {
				element.setAttribute(attribute);
			} else {
				element.removeAttribute(attribute);	
			}
			return this;
		},
		click: function(funct) {
			element.addEventListener('click', function() {
				funct();
			});
			return this;
		},
		dblclick: function(funct) {
			element.addEventListener('dblclick', function() {
				funct();
			});
			return this;
		},
		keydown: function(funct) {
			element.addEventListener('keydown', function() {
				funct();
			});
			return this;
		},
		keyup: function(funct) {
			element.addEventListener('keyup', function() {
				funct();
			});
			return this;
		},
		keypress: function(funct) {
			element.addEventListener('keypress', function() {
				funct();
			});
			return this;
		},
		change: function(funct) {
			element.addEventListener('change', function() {
				funct();
			});
			return this;
		},
		submit: function(funct) {
			element.addEventListener('submit', function() {
				funct();
			});
			return this;
		},
		hover: function(funct) {
			element.addEventListener('mouseenter', function() {
				funct();
			});
			element.addEventListener('mouseleave', function() {
				funct();
			});
			return this;
		},
		on: function(event, funct) {
			if(isInList(eventList, event)) {
				return element.addEventListener(event, function() {
					funct();
				});
			} else {
				console.error(`Event not exist: ${event}`);
				console.error(`Event list     : ${eventList.join(', ')}`);
				return null;
			}
		},
		off: function(event, handler) {
			if(isInList(eventList, event)) {
				element.removeEventListener(event, handler);
				return this;
			} else {
				console.error(`Event not exist: ${event}`);
				console.error(`Event list     : ${eventList.join(', ')}`);
				return null;
			}
		},
		effect: function(effect, duration, delay) {
			if(isInList(effectList, effect)) {
				return animateSimplify(element, effect, duration, delay);
			} else {
				console.error(`Effect not exist: ${effect}`);
				console.error(`Effect list     : ${effectList.join(', ')}`);
				return null;
			}
		},
		animate: function(animation, duration, delay) {
			if(isInList(animateList, animation)) {
				return animateSimplify(element, animation, duration, delay);
			} else {
				console.error(`Animate not exist: ${animation}`);
				console.error(`Animate list     : ${animateList.join(', ')}`);
				return null;
			}
		},
		show: function(duration, delay) {
			return animateSimplify(element, 'fadeIn', duration, delay);
		},
		hide: function(duration, delay) {
			return animateSimplify(element, 'fadeOut', duration, delay);
		},
		fadeIn: function(direction, duration, delay) {
			if(isInList(directionFadeList, direction)) {
				return animateSimplify(element, `fadeIn${direction}`, duration, delay);
			} else {
				console.error(`Direction not exist: ${direction}`);
				console.error(`Direction list     : ${directionFadeList.join(', ')}`);
				return null;
			}
		},
		fadeOut: function(direction, duration, delay) {
			if(isInList(directionFadeList, direction)) {
				return animateSimplify(element, `fadeOut${direction}`, duration, delay);
			} else {
				console.error(`Direction not exist: ${direction}`);
				console.error(`Direction list     : ${directionFadeList.join(', ')}`);
				return null;
			}
		},
		slideUp: function(direction, duration, delay) {
			if(isInList(directionSlideList, direction)) {
				return animateSimplify(element, `slideIn${direction}`, duration, delay);
			} else {
				console.error(`Direction not exist: ${direction}`);
				console.error(`Direction list     : ${directionSlideList.join(', ')}`);
				return null;
			}
		},
		slideDown: function(direction, duration, delay) {
			if(isInList(directionSlideList, direction)) {
				return animateSimplify(element, `slideOut${direction}`, duration, delay);
			} else {
				console.error(`Direction not exist: ${direction}`);
				console.error(`Direction list     : ${directionSlideList.join(', ')}`);
				return null;
			}
		},
		delay: function(ms) {
			return new Promise(resolve => setTimeout(resolve, ms))
		},
		parent: function() {
			element = element.parentElement;
			return this;
		},
		find: function(serachItems) {
			return element.querySelectorAll(serachItems);
		},
		eq: function(index) {
			if (index >= 0 && index < element.children.length) {
				return element.children[index];
			} else {
				console.error('Invalid index:', index);
				return null;
			}
		},
		then: function(funct) {
			funct();
			return this;
		},
	};
}

acTiny.get		= (url, header, body) => { return fetchList.get(url, header, body) };
acTiny.post		= (url, header, body) => { return fetchList.post(url, header, body) };
acTiny.put		= (url, header, body) => { return fetchList.put(url, header, body) };
acTiny.delete		= (url, header, body) => { return fetchList.delete(url, header, body) };
acTiny.options		= (url, header, body) => { return fetchList.options(url, header, body) };

acTiny.getJSON		= (url, header, body) => { return fetchList.getJSON(url, header, body) };
acTiny.postJSON		= (url, header, body) => { return fetchList.postJSON(url, header, body) };
acTiny.putJSON		= (url, header, body) => { return fetchList.putJSON(url, header, body) };
acTiny.deleteJSON	= (url, header, body) => { return fetchList.deleteJSON(url, header, body) };
acTiny.optionsJSON	= (url, header, body) => { return fetchList.optionsJSON(url, header, body) };

/* INIT */
if(!checkAnimateImport()) {
	alert('Animate stylesheet is not loaded');
}
window.$ = acTiny;
