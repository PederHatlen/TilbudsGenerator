let formEl = document.getElementById("form");
let generatedBoxEl = document.getElementById("generatedBox");
let makeEMailEl = document.getElementById("makeEMail");
let textareaEl = document.getElementById("generatedText");
let infoEl = document.getElementById("info");

let editBtnEl = document.getElementById("edit");
let copyBtnEl = document.getElementById("copy");

let internettPrices = {50: 399, 100: 599, 300: 799, 500: 999}
let dekoderPrice = 399;
let wifiExtPrice = 499;



function formatList(l) {
	if (l.length > 1) { return l.slice(0, -1).join(", ") + " og " + l.slice(-1); }
	else if (l.length == 1) { return l.join(); }
}
function formSubmit(e) {
	e.preventDefault();
	let fData = new FormData(formEl);
	let products = [];
	let prices = [];

	if (fData.get("internett") != 0) {
		products.push("Internett " + fData.get("internett") + "mbit");
		prices.push(internettPrices[fData.get("internett")]);
	}
	if (fData.get("TV") != 0) {
		products.push("Ekstra TV-dekoder(x" + fData.get("TV") + ")");
		prices.push(fData.get("TV")*dekoderPrice);
	}
	if (fData.get("WIFI-ext") != 0) {
		products.push("Wifi-extender(x" + fData.get("WIFI-ext") + ")");
		prices.push(fData.get("WIFI-ext")*wifiExtPrice);
	}

	if (products.length == 0 || fData.get("kunde") == "" || fData.get("selger") == "") {
		infoEl.innerHTML = "Nokk detaljer ble ikke sendt med.";
		return;
	}
	infoEl.innerHTML = "";


	let text = `Hei ${fData.get("kunde")} og takk for en hyggelig telefonsamtale.\nSender deg som avtalt tilbud på ${formatList(products)}\n\nPrisen vil da bli\n`;
	text += `-`.repeat(50);
	for (let i = 0; i < products.length; i++) {
		let space = 40-(products[i].length+prices[i].toString().length);
		text += `\n${products[i]} ${".".repeat(space)} ${prices[i]},00 kr`;
	}

	let sum = prices.reduce((a,n)=>(a+n));
	let rabattKr = Math.round((fData.get("rabatt")/100)*sum*100)/100;

	if(fData.get("rabatt")>0){text += `\nRabatt ${fData.get("rabatt")}% ${rabattKr}kr`;}
	text += `\nTotalt ${sum-rabattKr}kr`;
	text += `\nDet er bare å svare på denne eposten hvis du har noen spørsmål.\nMed vennlig hilsen ${fData.get("selger")}`


	// Hei <navn på kunde> og takk for en hyggelig telefonsamtale.
	// Sender deg som avtalt tilbud på <produkt1> (og <produktx>).
	// Prisen vil da bli
	// <produkt1> <pris produkt 1> kr
	// <produkt2> <pris produkt 2> kr
	// osv
	// Rabatt <rabatt %> <rabatt> kr
	// Totalt <sum> kr
	// Det er bare å svare på denne eposten hvis du har noen spørsmål.
	// Med vennlig hilsen <navn>

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