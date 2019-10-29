
currentTreecount = +0;
function getData(){
  $.ajax({url: 'https://teamtrees.org/', success: function(data){
      lastTreecount = currentTreecount
      currentTreecount = data.split('data-count="')[1].split('">0</div>')[0];
      currentTreecountFormatted = currentTreecount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      treecountDifference = currentTreecount - lastTreecount;
      percentageComplete = Math.floor(currentTreecount/20000000*10000)/100
      latestDonator = data.split('<strong class="">')[1].split('</strong>')[0];
      latestAmount = data.split('text-uppercase">')[6].split('</span>')[0];
      latestImage = data.split('src="images/')[16].split('.svg">')[0];
      sendData();
  }});
}

function sendData(){
$.ajax({
	url: "https://discordapp.com/api/webhooks/638109717075460118/_thOrTr99hFEfnWE7o6sjlyTvc_SnZt0vV9hMnRK6ILeKwAE7GuDxQNPvzok9Wo3hrDE",
	type: "POST",
	contentType: "application/json;charset=utf-8",
	origen: "localhost",
	data:                
		`{
			"username":"Teamtrees",
			"avatar_url":"https://raw.githubusercontent.com/ItsBrian/random/master/teamtrees/main.png",
			"embeds": [
				{
					"color": 9090879,
					"thumbnail": {
					"url": "https://raw.githubusercontent.com/ItsBrian/random/master/teamtrees/`+latestImage+`.png"
					},
					"fields": [
						{
						"name": "Total tree count:",
						"value": "\`\`\`glsl\\n`+currentTreecountFormatted+` (+`+treecountDifference+`)\`\`\`",
						"inline": true
						},
						{
						"name": "Percentage complete:",
						"value": "\`\`\`fix\\n`+percentageComplete+`% complete\`\`\`",
						"inline": true
						},
						{
						"name": "Latest donator:",
						"value": "\``+latestDonator+` donated `+latestAmount+`\`"
						}
					]
				}
		]
		}`
});
}

function temp(){
	  html = "";
      html += currentTreecountFormatted + "<br>"
      html += latestDonator + "<br>"
      html += latestAmount + "<br>"
      html += latestImage + "<br><br>"
      html += "+" + treecountDifference;
      document.getElementById("out").innerHTML = (html);
}

setInterval(function() {
   getData();
}, 20000);

getData();
