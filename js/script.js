let formEl = document.getElementById("form");
let generatedBoxEl = document.getElementById("generatedBox");
let makeEMailEl = document.getElementById("makeEMail");
let textareaEl = document.getElementById("generatedText");
let infoEl = document.getElementById("info");

let editBtnEl = document.getElementById("edit");
let copyBtnEl = document.getElementById("copy");

let internettPrices = {50: 399, 100: 599, 300: 799, 500: 999};
let dekoderPrice = 399;
let wifiExtPrice = 499;


function formatList(l) {
	if (l.length > 1) { return l.slice(0, -1).join(", ") + " og " + l.slice(-1); }
	else if (l.length == 1) { return l.join(); }
}
function formSubmit(e) {
	e.preventDefault();
	let fData = new FormData(formEl);

	let monthlyPurchases = [];
	let monthlyPurchasesPrices = [];
	let onetimePurchases = [];
	let onetimePurchasesPrices = [];

	if (fData.get("internett") != 0) {
		monthlyPurchases.push("Internett " + fData.get("internett") + "mbit");
		monthlyPurchasesPrices.push(internettPrices[fData.get("internett")]);
	}

	if (fData.get("TV") != 0) {
		onetimePurchases.push("Ekstra TV-dekoder(x" + fData.get("TV") + ")");
		onetimePurchasesPrices.push(fData.get("TV")*dekoderPrice);
	}
	if (fData.get("WIFI-ext") != 0) {
		onetimePurchases.push("Wifi-extender(x" + fData.get("WIFI-ext") + ")");
		onetimePurchasesPrices.push(fData.get("WIFI-ext")*wifiExtPrice);
	}


	let purchases = [...monthlyPurchases, ...onetimePurchases];
	let prices = [...monthlyPurchasesPrices, ...onetimePurchasesPrices];

	if (purchases.length == 0 || fData.get("kunde") == "" || fData.get("selger") == "") {
		infoEl.innerHTML = "Nokk detaljer ble ikke sendt med.";
		return;
	}
	infoEl.innerHTML = "";


	let text = `Hei ${fData.get("kunde")} og takk for en hyggelig telefonsamtale.\nSender deg som avtalt tilbud på ${formatList(purchases)}.\n\nPrisen vil da bli\n`;
	
	text += `-`.repeat(50);
	for (let i = 0; i < purchases.length; i++) {
		let space = 40-(purchases[i].length+prices[i].toString().length);
		text += `\n${purchases[i]} ${".".repeat(space)} ${prices[i]},00 kr`;
	}
	text += "\n"+`-`.repeat(50);

	let monthlySum = monthlyPurchasesPrices.reduce((a,n)=>(a+n), 0);
	let onetimeSum = onetimePurchasesPrices.reduce((a,n)=>(a+n), 0);

	let monthlyRabattKr = 0;
	let onetimeRabattKr = 0;

	let sumRabatt = 0;
	if (monthlyPurchases.length > 0){
		if (fData.get("maanedlig") != 0){
			text += `\nMånedlig pris uten rabatt er ${monthlySum}kr.`;
			monthlyRabattKr = Math.round((fData.get("maanedlig")/100)*monthlySum*100)/100;
			text += `\nMånedlig rabatt ${+fData.get("maanedlig")}% ${-monthlyRabattKr}kr i måneden`;
			sumRabatt += monthlyRabattKr;
		}
		text += `\nTotal månedlig pris er ${Math.round((monthlySum-monthlyRabattKr)*100)/100}kr.\n`;
	}
	if (onetimePurchases.length > 0){
		if (fData.get("engang") != 0){
			text += `\nEngangsprisen uten rabatt er ${onetimeSum}kr.`;
			onetimeRabattKr = Math.round((fData.get("engang")/100)*onetimeSum*100)/100;
			text += `\nEngangs-rabatt ${+fData.get("engang")}% ${-onetimeRabattKr}kr`;
			sumRabatt += onetimeRabattKr;
		}
		text += `\nTotal engangspris er ${Math.round((onetimeSum-onetimeRabattKr)*100)/100}kr.\n`;
	}

	text += `-`.repeat(50);

	if(monthlyPurchases.length > 0 && onetimePurchases.length > 0){
		let sum = monthlySum + onetimeSum;

		text += `\nTotalt ${Math.round((sum-sumRabatt)*100)/100}kr nå (ink. denne måneden)`;
		if(monthlyPurchases.length > 0){text += `, og ${Math.round((monthlySum-monthlyRabattKr)*100)/100}kr i måneden etter det`;}
		text += ".\n";
	}
	text += `\nDet er bare å svare på denne eposten hvis du har noen spørsmål.\nMed vennlig hilsen ${fData.get("selger")}.`;

	console.log(text);
	textareaEl.value = text;

	formEl.style.display = "none";
	generatedBoxEl.style.display = "flex";
}

formEl.addEventListener("submit", formSubmit);
copyBtnEl.addEventListener("click", function (e) {
	navigator.clipboard.writeText(textareaEl.value);
});
editBtnEl.addEventListener("click", function (e) {
	generatedBoxEl.style.display = "none";
	formEl.style.display = "flex";
});