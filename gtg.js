//longrest only sets hit dice to full at end off the rest
//you must manually spend hit dice or use healing spells


on('ready',()=>{
	var gtglongrest = function(msg) {
		var charname = msg.content.substring(msg.content.indexOf(" ") + 1);
		var character = findObjs({name: charname, type: "character"}, {caseInsensitive: true})[0];
		if(!character) {
			log("NO CHARACTER BY THAT NAME FOUND");
		}
		else {
			// SPELL SLOTS
			for (var i = 1; i < 10; i++) {
				var charslotmax = findObjs({type: 'attribute', characterid: character.id, name: "lvl" + i + "_slots_total"}, {caseInsensitive: true})[0];
				if(!charslotmax) {
					charslotmax = createObj("attribute", {name: "lvl" + i + "_slots_total", current: "0", max: "", characterid: character.id});
				}
				var charslot = findObjs({type: 'attribute', characterid: character.id, name: "lvl" + i + "_slots_expended"}, {caseInsensitive: true})[0];
				if(!charslot) {
					charslot = createObj("attribute", {name: "lvl" + i + "_slots_expended", current: charslotmax.get("current"), max: "", characterid: character.id});
				}
				else {
					charslot.set({current: charslotmax.get("current")});
				}
			};
			
			// HIT DICE
			var hit_dice = findObjs({type: 'attribute', characterid: character.id, name: "hit_dice"}, {caseInsensitive: true})[0];
			var max_hd = parseInt(hit_dice.get("max"),10);

			hit_dice.set({current: max_hd});
		}
	};

  on('chat:message',msg=>{
    if('api'===msg.type && /^!gtglongrest(\b\s|$)/i.test(msg.content)){
      gtglongrest(msg);
	  sendChat(msg.who, msg.content.substring(msg.content.indexOf(" ") + 1) + " long rested")
    }
  });
});

