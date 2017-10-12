export function addCookice(name, value, expireHours) {
	// TODO 添加函数过程
	let cookieStr = name + "=" + escape(value);
	//是否设置过期时间
	if (expireHours > 0) {
		let date = new Date();
		date.setTime(date.getTime + expireHours * 3600 * 1000);
		cookieStr = cookieStr + ";expires=" + date.toGMTString();
	}
	document.cookie = cookieStr;
}

export function getCookie(name) {

	let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null;

}

export function deleteCookie(name) {
	let exp = new Date();
	exp.setTime(exp.getTime() - 10000);
	let cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}