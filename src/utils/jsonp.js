export default function jsonp(url, callbackName, callbackFnName, callbackFn) {
	let s = document.createElement("script");
	s.src = !callbackName ? url : url + (url.indexOf("?") == -1 ? "?" : "&") + callbackName + "=" + callbackFnName;
	let timer = setInterval(function () {
		if (document.readyState === 'complete') {
			document.body.appendChild(s);
			clearInterval(timer);
		}
	}, 300);
	global[callbackFnName] = callbackFn;
};