function dateFactory() {
	let dateReg1 = /^(\d{4})[-\/]?(\d{2})[-\/]?(\d{2})\s(\d{2}):(\d{2}):(\d{2})(\.\d+)?$/;
	let dateReg2 = /^(\d{4})[-\/]?(\d{2})[-\/]?(\d{2})$/;
	return function (dateString) {
		if (dateReg2.test(dateString)) {
			return new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3, 0, 0, 0);
		} else if (dateReg1.test(dateString)) {
			return new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
		} else {
			return dateString;
		}
	}
}

export let parseDate = dateFactory();

export function formatDate(date, style) { //date format util
	let y = date.getFullYear();
	let M = "0" + (date.getMonth() + 1);
	M = M.substring(M.length - 2);
	let d = "0" + date.getDate();
	d = d.substring(d.length - 2);
	let h = "0" + date.getHours();
	h = h.substring(h.length - 2);
	let m = "0" + date.getMinutes();
	m = m.substring(m.length - 2);
	let s = "0" + date.getSeconds();
	s = s.substring(s.length - 2);
	return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('HH', h).replace('mm', m).replace('ss', s);
}

export function firstDay(style, date) {
	if (date && date.getFullYear) {
		date = new Date();
	} else {
		date = new Date();
	}
	let y = date.getFullYear(), m = date.getMonth();
	let firstDay = new Date(y, m, 1);
	if (style) {
		return formatDate(firstDay, style);
	} else {
		return firstDay;
	}
}

export function lastDay(style, date) {
	if (date && date.getFullYear) {
		date = new Date();
	} else {
		date = new Date();
	}
	let y = date.getFullYear(), m = date.getMonth();
	let lastDay = new Date(y, m + 1, 0);
	if (style) {
		return formatDate(lastDay, style);
	} else {
		return lastDay;
	}
}


export function changeDate(days, standardDate) {
	if (days && !standardDate) {
		let group = days.match(/(-?\d+)([dDMmWwYy])/);
		let value = parseInt(group[1], 10),
			type = group[2].toUpperCase();
		if (type === 'D')
			return new Date(new Date().getTime() + (value * 24 * 3600 * 1000));
		else if (type === 'W')
			return new Date(new Date().getTime() + (value * 7 * 24 * 3600 * 1000));
		else if (type === 'M') {
			let date = new Date();
			date.setMonth(date.getMonth() + value);
			return date;
		} else if (type === 'Y') {
			let date = new Date();
			date.setFullYear(date.getFullYear() + value);
			return date;
		}
	} else if (days && standardDate) {
		let group = days.match(/(-?\d+)([dDMmWwYy])/);
		let value = parseInt(group[1], 10),
			type = group[2].toUpperCase();
		if (type === 'D')
			return new Date(standardDate.getTime() + (value * 24 * 3600 * 1000));
		else if (type === 'W')
			return new Date(standardDate.getTime() + (value * 7 * 24 * 3600 * 1000));
		else if (type === 'M') {
			let date = new Date(standardDate);
			date.setMonth(date.getMonth() + value);
			return date;
		} else if (type === 'Y') {
			let date = new Date(standardDate);
			date.setFullYear(date.getFullYear() + value);
			return date;
		}
	} else
		return new Date();
}

export function diffYearValue(startDate, endDate) {
	let diff = new Date(endDate.getTime() - startDate.getTime());
	return (diff.getUTCFullYear() - 1970);
}

export function isBetweenDate(startDate, endDate, interval) {
	let newSdate = changeDate(interval, startDate);
	return endDate > newSdate;
}