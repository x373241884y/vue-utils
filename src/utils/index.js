import Base64 from './base64';
import {addCookice, getCookie, deleteCookie} from './cookie';
import {parseDate,formatDate, changeDate, diffYearValue,isBetweenDate,firstDay,lastDay} from './date';
import jsonp from './jsonp';

export default {
	Base64: Base64,
	addCookice: addCookice,
	getCookie: getCookie,
	deleteCookie: deleteCookie,
	parseDate: parseDate,
	formatDate: formatDate,
	changeDate: changeDate,
	diffYearValue: diffYearValue,
	isBetweenDate: isBetweenDate,
	firstDay: firstDay,
	lastDay: lastDay,
	jsonp: jsonp,
};