// [チャンネル名, チャンネル説明, チャンネル画像]
class ChannelObject {
	constructor(img, description, url) {
		this.img = img;
		this.description = description;
		this.url = url
	}
}

const channels = [
	new ChannelObject("img/KLeIn.png", "インフラ関係の技術について分かりやすく説明してくれるチャンネル.", "https://www.youtube.com/channel/UCI2HUZx-Ch6oc96o7BQ9JLQ"),
	new ChannelObject("img/TECHWORLD.png", "メガベンチャーに勤務するエンジニアがVlogやオススメの参考書を紹介してくれるチャンネル.", "https://www.youtube.com/c/TECHWORLD111/videos"),
	new ChannelObject("img/sapu.png", "Pythonを学ぶならこのチャンネルというくらい内容が充実しているチャンネル.", "https://www.youtube.com/channel/UC5Kgc_HNzx4GJ-w4QMeeKiQ/videos"),
	new ChannelObject("img/sasshii.png", "海外留学をした元MicrosoftのエンジニアがCSや海外技術について語ってくれるチャンネル.", "https://www.youtube.com/channel/UClxDs-wxR4dOZjbrI5V-1uA/videos"),
	new ChannelObject("img/lowLayerGirls.png", "Googleの女性エンジニア2名が低レイヤーの技術に関して生配信するチャンネル.", "https://www.youtube.com/channel/UCMsstGhINXdpMqo9tsElCMQ/videos"),
]

// ボタンセクション作成
function getHtmlButtonSection(channels) {
	let btnSection = '';

	for (let i = 0; i < channels.length; i++) {
		btnSection +=
		`
			<div class="d-flex justify-content-center align-items-center btn btn-size bg-white m-2" value="${i}" id="${i}" onclick="sliderJump(${i})">${i + 1}</div>
		`
	}

	return btnSection;
}

// スライダーセクション作成
function getHtmlSliderSection(channels) {
	let sliderSection = '<div class="slider-data d-none">';

	for (let i = 0; i < channels.length; i++) {
		sliderSection += 
		`	
			<div class="slider-item">
				<img src=${channels[i].img} class="picture-size">
				<h5 class="font-bold py-4">${channels[i].description}</h5>
				<a href=${channels[i].url} class="btn btn-primary">チャンネルを見てみる</a>
			</div>
		`
	}

	sliderSection += '</div>'

	return sliderSection
}

// スライド変更関数
function sliderJump(id) {
	let clickBtn = document.getElementById(id);
	let value = clickBtn.getAttribute("value");
	let currentElement = sliderItems[currentValue];
	let nextElement = sliderItems[value];

	if (value > currentValue) {
		animateMain(currentElement, nextElement, "right");
	} else if (value < currentValue) {
		animateMain(currentElement, nextElement, "left");
	}

	currentValue = value;
}

// スライドアニメーション関数
function animateMain(currentElement, nextElement, animationType) {
	main.innerHTML = ""; // innerHTMLをしないと、複数のスライドが移動してしまう
	main.append(nextElement);
	extra.innerHTML = "";
	extra.append(currentElement);

	main.classList.add("expand-animation");
	extra.classList.add("deplete-animation");

	sliderShow.innerHTML = "";
	if (animationType === "right") {
		sliderShow.append(extra);
		sliderShow.append(main);
	} else if (animationType === "left") {
		sliderShow.append(main);
		sliderShow.append(extra);
	}
}

// HTML作成
document.getElementById("btnSection").innerHTML = getHtmlButtonSection(channels);
document.getElementById("sliderSection").innerHTML = getHtmlSliderSection(channels);

// スライドショー作成
const sliderSection = document.getElementById("sliderSection");
const sliderItems = document.querySelectorAll("#sliderSection .slider-data .slider-item");
let currentValue;
let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.classList.add("d-flex", "justify-content-center", "align-items-center");
main.classList.add("main");
extra.classList.add("extra");

main.append(sliderItems[0]);

sliderShow.append(main);
sliderShow.append(extra);
sliderSection.append(sliderShow);

currentValue = 0;