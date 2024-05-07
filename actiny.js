/*!
 * acTiny JavaScript Library v0.3.3
 * https://github.com/anoniji/acTiny
 *
 * Released under the MIT license
 * https://github.com/anoniji/acTiny/LICENSE
 *
 * Date: 2024-05-07
 */

"use strict";


/* FUNCTIONS */
function isInList(list, value) {
	return list.indexOf(value) !== -1;
}

function escapeBasicHTML(htmlString) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&apos;"
	};
	return htmlString.replace(/[&<>"']/g, char => map[char]);
}

function fetchSimplify(typeRequete, url, header = {}, body, isJson = true) {
	return new Promise((resolve, reject) => {
		try {
			if (body && typeof body !== "string") {
				if (isJson) {
					header["Content-Type"] = "application/json";
				} else {
					header["Content-Type"] = "application/x-www-form-urlencoded";
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
				}
				return response.text();
			}).then(data => {
				if (isJson) {
					resolve(data);
				}
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

function animateSimplify(element, animation, duration = 1000, delay = 0) {
	return new Promise((resolve) => { 
		element.style.animationDuration = `${duration}ms`;
		element.style.animationDelay = `${delay}ms`;

		// Add Animate.css class and trigger animation
		element.classList.add("animate__animated", `animate__${animation}`);

		// Reset style
		if (isInList(animateList, animation) && animation.includes("In")) {
			element.style.display = "";
			element.style.opacity = "";
		}

		// Remove initial styles after animation ends
		const animationEndHandler = () => {
			if (isInList(animateList, animation)) {
				if (animation.includes("In")) {
					element.style.display = "";
					element.style.opacity = "";
				} else {
					element.style.display = "none";
					element.style.opacity = "0";
				}
			}
			element.style.animationDuration = "";
			element.style.animationDelay = "";
			element.classList.remove("animate__animated", `animate__${animation}`);
			element.removeEventListener("animationend", animationEndHandler);
			resolve(element);
		};
		element.addEventListener("animationend", animationEndHandler);
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

function returnErrorWithList(title, set, list) {
	console.error(`${title} not exist: ${set}`);
	console.error(`${title} list     : ${list.join(", ")}`);
	return null;
}

/* LIST */
const effectList = [
	"bounce", "flash", "pulse", "rubberBand", "shakeX", "shakeY", "headShake", "swing", "tada", "wobble", "jello", "heartBeat",
	"flip", "hinge", "jackInTheBox"
];
const animateList = [
	"backInDown", "backInLeft", "backInRight", "backInUp", "Back exits", "backOutDown", "backOutLeft", "backOutRight", "backOutUp",
	"bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "Bouncing exits", "bounceOut", "bounceOutDown",
	"bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig",
	"fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeInTopLeft", "fadeInTopRight", "fadeInBottomLeft",
	"fadeInBottomRight", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig",
	"fadeOutUp", "fadeOutUpBig", "fadeOutTopLeft", "fadeOutTopRight", "fadeOutBottomRight", "fadeOutBottomLeft", "flipInX",
	"flipInY", "flipOutX", "flipOutY", "lightSpeedInRight", "lightSpeedInLeft", "lightSpeedOutRight", "lightSpeedOutLeft", "rotateIn",
	"rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "Rotating exits", "rotateOut", "rotateOutDownLeft",
	"rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "rollIn", "rollOut", "zoomIn", "zoomInDown", "zoomInLeft", 
	"zoomInRight", "zoomInUp", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "slideInDown", "slideInLeft",
	"slideInRight", "slideInUp", "slideOutDown", "slideOutLeft", "slideOutRight", "slideOutUp"
];
const eventList = [
	"click", "dblclick",
	"mousedown", "mouseup", "mousemove", "mouseover", "mouseout",
	"keydown", "keyup", "keypress", 
	"submit", "change", "input", "load", "resize", "scroll", "beforeunload", "unload",
	"DOMContentLoaded", "readystatechange", 
];
const directionFadeList = [
	"Down", "Left", "Right", "Up",
	"TopLeft", "TopRight", "BottomLeft", "BottomRight",
	"DownBig", "LeftBig", "RightBig", "UpBig"
];
const directionSlideList = ["Down", "Left", "Right", "Up"];
const fetchList = {
	get: (url, header = {}, body) => {
		return fetchSimplify("GET", url, header, body, false);
	},
	getJSON: (url, header = {}, body) => {
		return fetchSimplify("GET", url, header, body, true);
	},
	post: (url, header = {}, body) => {
		return fetchSimplify("POST", url, header, body, false);
	},
	postJSON: (url, header = {}, body) => {
		return fetchSimplify("POST", url, header, body, true);
	},
	put: (url, header = {}, body) => {
		return fetchSimplify("PUT", url, header, body, false);
	},
	putJSON: (url, header = {}, body) => {
		return fetchSimplify("PUT", url, header, body, true);
	},
	delete: (url, header = {}, body) => {
		return fetchSimplify("DELETE", url, header, body, false);
	},
	deleteJSON: (url, header = {}, body) => {
		return fetchSimplify("DELETE", url, header, body, true);
	},
	options: (url, header = {}, body) => {
		return fetchSimplify("OPTIONS", url, header, body, false);
	},
	optionsJSON: (url, header = {}, body) => {
		return fetchSimplify("OPTIONS", url, header, body, true);
	},
};

/* $() */
function acTiny(selector) {
	let element;

	if (!selector) {
		console.error("No selector to specify, please specify one");
		return null;
	}

	if (typeof selector === "object") {
		element = selector;
		selector = "this";		
	} else if (selector.startsWith("#") && !selector.includes(" ")) {
		const id = selector.slice(1);
		element = document.getElementById(id);
	} else if (selector.startsWith(".") && !selector.includes(" ")) {
		const className = selector.slice(1);
		element = document.getElementsByClassName(className)[0];
	} else {
		element = document.querySelectorAll(selector);
		if (element.length == 1) {
			element = element[0]
		}
	}

	if (!element) {
		console.error(`Element not found with selector: ${selector}`);
	}

	return {
		html: function (content = false) {
			if (!element) return this;
			if (content) {
				element.innerHTML = content;
				return this;
			}
			return element.innerHTML;
		},
		text: function (content = false) {
			if (!element) return this;
			if (content) {
				element.textContent = content;
				return this;
			} 
			return element.textContent;
		},
		val: function (content = false) {
			if (!element) return this;
			if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
				if (content) {
					element.value = content;
					return this;
				} else {
					return element.value;
				}
			} else {
				if (content) {
					element.textContent = content;
					return this;
				} else {
					return element.textContent;
				}
			}
		},
		after: function (elm, content) {
			if (!element || !elm || !content) return this;
			const newContent = document.createElement(elm);
			newContent.textContent = content;

			if (!element.nextElementSibling) {
				return null;
			}
			element.parentNode.appendChild(newContent);
			return this;
		},
		before: function (elm, content) {
			if (!element || !elm || !content) return this;
			const newContent = document.createElement(elm);
			newContent.textContent = content;

			if (!element.nextElementSibling) {
				return null;
			}
			element.parentNode.prepend(newContent);
			return this;
		},
		prepend: function (content) {
			if (!element || !content) return this;
			element.insertAdjacentHTML("afterbegin", content);
			return this;
		},
		append: function (content) {
			if (!element || !content) return this;
			element.insertAdjacentHTML("beforeend", content);
			return this;
		},
		empty: function () {
			if (!element) return this;
			element.parentNode.removeChild(element);
			return this;
		},
		attr: function (attribute, content) {
			if (!element || !attribute || !content) return this;
			element.setAttribute(attribute, content);
			return this;
		},
		removeAttr: function (attribute) {
			if (!element || !attribute) return this;
			element.removeAttribute(attribute);
			return this;
		},
		addClass: function (className) {
			if (!element || !className) return this;
			element.classList.add(className);
			return this;
		},
		removeClass: function (className) {
			if (!element || !className) return this;
			element.classList.remove(className);
			return this;
		},
		toggleClass: function (className) {
			if (!element || !className) return this;
			element.classList.toggle(className);
			return this;
		},
		hasClass: function (className) {
			if (!element || !className) return this;
			if (element.classList.contains(className)) return true;
			return false;
		},
		css: function () {
			if (!element) return this;
			const styles = {};
			const computedStyles = window.getComputedStyle(element);
			for (const property in computedStyles) {
				if (computedStyles.hasOwnProperty(property)) {
					styles[property] = computedStyles[property];
				}
			}
			return styles;
		},
		position: function () {
			if (!element) return this;
			const rect = element.getBoundingClientRect();
			return {
				x: rect.left + window.scrollX,
				y: rect.top + window.scrollY
			};
		},
		width: function () {
			if (!element) return this;
			return element.offsetWidth;
		},
		height: function () {
			if (!element) return this;
			return element.offsetHeight;
		},
		prop: function (attribute, set = null) {
			if (!element || !attribute || !(typeof set === "boolean" || set === null)) return this;
			if (set === null) {
				element.setAttribute(attribute, "");
			} else if (set) {
				element.setAttribute(attribute, set);
			} else {
				element.removeAttribute(attribute);	
			}
			return this;
		},
		click: function (funct) {
			if (!element || typeof funct !== "function") return this;
			element.addEventListener("click", function () {
				funct();
			});
			return this;
		},
		dblclick: function (funct) {
			if (!element || typeof funct !== "function") return this;
			element.addEventListener("dblclick", function () {
				funct();
			});
			return this;
		},
		keydown: function (funct) {
			if (!element || typeof funct !== "function") return this;
			element.addEventListener("keydown", function () {
				funct();
			});
			return this;
		},
		keyup: function (funct) {
			if (!element || typeof funct !== "function") return this;
			element.addEventListener("keyup", function () {
				funct();
			});
			return this;
		},
		keypress: function (funct) {
			if (!element || typeof funct !== "function") return this;
			element.addEventListener("keypress", function () {
				funct();
			});
			return this;
		},
		change: function (funct) {
			if (!element || typeof funct !== "function") return this;
			element.addEventListener("change", function () {
				funct();
			});
			return this;
		},
		submit: function (funct) {
			if (!element || typeof funct !== "function") return this;
			element.addEventListener("submit", function (event) {
				event.preventDefault();
				funct();
			});
			return this;
		},
		hover: function (funct) {
			if (!element || typeof funct !== "function") return this;
			element.addEventListener("mouseenter", function () {
				funct();
			});
			element.addEventListener("mouseleave", function () {
				funct();
			});
			return this;
		},
		on: function (event, funct) {
			if (!element || !event || typeof funct !== "function") return this;
			if (isInList(eventList, event)) {
				element.addEventListener(event, funct);
				return this
			} else return returnErrorWithList("Event", event, eventList);
		},
		off: function (event, funct) {
			if (!element || !event || typeof funct !== "function") return this;
			if (isInList(eventList, event)) {
				element.removeEventListener(event, funct);
				return this;
			} else return returnErrorWithList("Event", event, eventList);
		},
		effect: function (effect, duration, delay) {
			if (!element || !effect) return this;
			if (isInList(effectList, effect)) {
				return animateSimplify(element, effect, duration, delay);
			} else return returnErrorWithList("Effect", effect, effectList);
		},
		animate: function (animation, duration, delay) {
			if (!element || !animation) return this;
			if (isInList(animateList, animation)) {
				return animateSimplify(element, animation, duration, delay);
			} else return returnErrorWithList("Animate", animation, animateList);
		},
		show: function (duration, delay) {
			if (!element) return this;
			return animateSimplify(element, "fadeIn", duration, delay);
		},
		hide: function (duration, delay) {
			if (!element) return this;
			return animateSimplify(element, "fadeOut", duration, delay);
		},
		fadeIn: function (direction = "Up", duration, delay) {
			if (!element) return this;
			if (isInList(directionFadeList, direction)) {
				return animateSimplify(element, `fadeIn${direction}`, duration, delay);
			} else return returnErrorWithList("Direction", direction, directionFadeList);
		},
		fadeOut: function (direction = "Up", duration, delay) {
			if (!element) return this;
			if (isInList(directionFadeList, direction)) {
				return animateSimplify(element, `fadeOut${direction}`, duration, delay);
			} else return returnErrorWithList("Direction", direction, directionFadeList);
		},
		slideUp: function (direction = "Up", duration, delay) {
			if (!element) return this;
			if (isInList(directionSlideList, direction)) {
				return animateSimplify(element, `slideIn${direction}`, duration, delay);
			} else return returnErrorWithList("Direction", direction, directionSlideList);
		},
		slideDown: function (direction = "Up", duration, delay) {
			if (!element) return this;
			if (isInList(directionSlideList, direction)) {
				return animateSimplify(element, `slideOut${direction}`, duration, delay);
			} else return returnErrorWithList("Direction", direction, directionSlideList);
		},
		draggable: function () {
			if (!element) return this;

			let offsetX = 0,
				offsetY = 0,
				isDragging = false;

			element.addEventListener("mousedown", (event) => {
				element.classList.add("drag_on");
				element.classList.remove("drag_off");
				isDragging = true;
				offsetX = event.clientX - element.offsetLeft;
				offsetY = event.clientY - element.offsetTop;
			});
			element.addEventListener("mousemove", (event) => {
				if (isDragging) {
					element.style.left = event.clientX - offsetX + "px";
					element.style.top = event.clientY - offsetY + "px";
				}
			});
			element.addEventListener("mouseup", () => {
				element.classList.add("drag_off");
				element.classList.remove("drag_on");
				isDragging = false;
			});
			element.style.position = "absolute";

			return this;
		},
		//# TODO: Sortable: Enables sorting and reordering of lists or groups of elements.
		resizable: function () {
			if (!element) return this;

			let initialX = 0,
				initialY = 0,
				isResizing = false;

			element.addEventListener("mousedown", (event) => {
				element.classList.add("resize_on");
				element.classList.remove("resize_off");
				isResizing = true;

				const rect = element.getBoundingClientRect();
				const border_width = parseFloat(window.getComputedStyle(element, null).getPropertyValue("border-width"));
				const paddingTop = parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-top"));
				const paddingRight = parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-right"));
				const paddingBottom = parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-bottom"));
				const paddingLeft = parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-left"));

				initialX = rect.left + paddingLeft + paddingRight + border_width;
				initialY = rect.top + paddingTop + paddingBottom + border_width;
			});
			element.addEventListener("mousemove", (event) => {
				if (isResizing) {
					const newWidth = event.clientX - initialX;
					const newHeight = event.clientY - initialY;

					if (newWidth >= 0 && newHeight >= 0) {
						element.style.width = Math.floor(newWidth) + "px";
						element.style.height = Math.floor(newHeight) + "px";
					}
				}
			});
			element.addEventListener("mouseup", () => {
				element.classList.add("resize_off");
				element.classList.remove("resize_on");
				isResizing = false;
			});

			return this;
		},
		//# TODO: Selectable: Enables selecting and manipulating groups of elements.
		//# TODO: Accordion: Creates expandable and collapsible content sections.
		autocomplete: function (suggestions) {
			if (!element || !suggestions || typeof element !== "object" || element.tagName.toLowerCase() !== "input") return this;
			const suggestionsList = document.createElement("ul");
			element.parentNode.appendChild(suggestionsList);

			element.addEventListener("input", () => {
				const term = element.value.toLowerCase();
				const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(term));
				suggestionsList.innerHTML = "";

				filteredSuggestions.forEach(suggestion => {
					const suggestionItem = document.createElement("li");
					suggestionItem.textContent = suggestion;
					suggestionsList.appendChild(suggestionItem);
				});
				suggestionsList.style.display = filteredSuggestions.length > 0 && term.length > 0 ? "block" : "none";

			});
			return this;
		},
		button: function (btn_text, funct = false) {
			if (!element || !btn_text) return this;
			const button = document.createElement("button");
			button.innerHTML = escapeBasicHTML(btn_text);
			if (funct) {
				button.addEventListener("click", function () {
					funct();
				});
			}
			element.appendChild(button);
			return this;
		},
		//# TODO: Date picker: Allows users to select dates from a calendar interface.
		dialog: function (title, content, closeButtonLabel, overlay = false) {
			if (!element || !title || !content || !closeButtonLabel) return this;

			// Check if the modal has already been created
			const element_element = element.querySelector('.modal')
			if (element_element) {
				element_element.style.display = 'block';
				return this;
			}

			// Function to create the modal container
			function createModalContainer() {
				const modalContainer = document.createElement('div');
				modalContainer.classList.add('modal');
				element.appendChild(modalContainer);
				return modalContainer;
			}
			const modalContainer = createModalContainer();

			// Create modal content
			const modalContent = document.createElement('div');
			modalContent.classList.add('modal-content');

			// Create modal title
			const modalTitle = document.createElement('h2');
			modalTitle.textContent = title;
			modalContent.appendChild(modalTitle);

			// Create modal body content
			const modalBody = document.createElement('p');
			modalBody.textContent = content;
			modalContent.appendChild(modalBody);

			// Create close button
			const closeButton = document.createElement('button');
			closeButton.textContent = closeButtonLabel || 'Close';
			closeButton.addEventListener('click', hideModal);
			modalContent.appendChild(closeButton);

			// Append modal content to container
			modalContainer.appendChild(modalContent);

			// Create modal overlay (if createOverlay is true)
			if (overlay) {
				const modalOverlay = document.createElement('div');
				modalOverlay.classList.add('modal-overlay');
				modalContent.parentNode.appendChild(modalOverlay);
			}

			const modal = element.querySelector('.modal');

			// Function to show the modal
			function showModal() {
				modal.style.display = 'block';
			}

			// Function to hide the modal
			function hideModal() {
				modal.style.display = 'none';
			}

			// Add click event listener to the close button
			closeButton.addEventListener('click', hideModal);

			// Add event listener to open the modal from a button or link
			const openModalButton = element.querySelector('.open-modal-button');
			if (openModalButton) {
				openModalButton.addEventListener('click', showModal);
			}

			return this;
		},
		//# TODO: Menu: Provides dropdown and hierarchical menus for navigation.
		progressbar: function (pct = 0) {
			if (!element) return this;
			let element_progress = element.querySelector("progress");
			if (element_progress) {
				element_progress.value = pct;
			} else {
				element.innerHTML = `<progress min="0" value="${pct}" max="100"></progress>`;
			}
			return this;
		},
		//# TODO: Slider: Enables users to select values along a range using a slider control.
		tabs: function (show = false) {
			if (!element) return this;
			const sections = element.querySelectorAll("section");

			// Function to hide all sections
			function hideAllSections() {
				sections.forEach(section => section.style.display = "none");
			}

			// Function to show a specific section
			function showSection(sectionId) {
				const section = document.getElementById(sectionId);
				if (section) {
					hideAllSections();
					section.style.display = "block";
				}
			}

			// Add click event listener to each list item (tab)
			element.querySelectorAll("nav li a").forEach(link => {
				link.addEventListener("click", (event) => {
					event.preventDefault(); // Prevent default anchor link behavior
					const href = link.getAttribute("href");
					const sectionId = href.split("#")[1]; // Extract section ID from href
					showSection(sectionId);
				});
			});

			// Initially hide all sections
			hideAllSections();

			// Initially show section
			if (show) { showSection(show); }

			return this;
		},
		tooltip: function (title, scroll_stop = false) {
			if (!element || !title) return this;
			const InfoBubble = document.createElement("div");
			InfoBubble.textContent = title;
			InfoBubble.style.display = "none";
			element.parentNode.appendChild(InfoBubble);

			element.addEventListener("mouseover", () => {
				InfoBubble.style.display = "block";
				InfoBubble.style.position = "fixed";
				InfoBubble.style.left = `${String(event.clientX)}px`;
				InfoBubble.style.top = `${String(event.clientY)}px`;
			});

			element.addEventListener("mousemove", function (event) {
				InfoBubble.style.left = `${String(event.clientX)}px`;
				InfoBubble.style.top = `${String(event.clientY)}px`;
			});

			element.addEventListener("mouseout", () => {
				InfoBubble.style.display = "none";
			});

			if (scroll_stop) {
				window.addEventListener("scroll", () => {
					InfoBubble.style.display = "none";
				});	
			}
			
			return this;
		},
		delay: function (ms = 300) {
			if (!element) return this;
			return new Promise(resolve => setTimeout(() => { resolve(element) }, ms))
		},
		parent: function () {
			if (!element) return this;
			element = element.parentElement;
			return this;
		},
		find: function (serachItems) {
			if (!element) return this;
			return element.querySelectorAll(serachItems);
		},
		eq: function (index) {
			if (!element || !index || typeof index !== "number") return this;
			if (index >= 0 && index < element.length) {
				return $(element[index]);
			} else {
				console.error("Invalid index:", index);
				return null;
			}
		},
	};
}

acTiny.get = (url, header, body) => { return fetchList.get(url, header, body) };
acTiny.post = (url, header, body) => { return fetchList.post(url, header, body) };
acTiny.put = (url, header, body) => { return fetchList.put(url, header, body) };
acTiny.delete = (url, header, body) => { return fetchList.delete(url, header, body) };
acTiny.options = (url, header, body) => { return fetchList.options(url, header, body) };

acTiny.getJSON = (url, header, body) => { return fetchList.getJSON(url, header, body) };
acTiny.postJSON = (url, header, body) => { return fetchList.postJSON(url, header, body) };
acTiny.putJSON = (url, header, body) => { return fetchList.putJSON(url, header, body) };
acTiny.deleteJSON = (url, header, body) => { return fetchList.deleteJSON(url, header, body) };
acTiny.optionsJSON = (url, header, body) => { return fetchList.optionsJSON(url, header, body) };

/* INIT */
if (!checkAnimateImport()) {
	alert("Animate stylesheet is not loaded");
}
window.$ = acTiny;
