const Command = require('command');

module.exports = function InspectDungeonClears(dispatch) {
    const command = Command(dispatch);
    
    const DungeonNames = {
        9950: "HH20",
        9935: "RKHM",
        9970: "RMHM",
        9710: "BP",
        9716: "SCNM",
        9735: "RKNM",
        9770: "RMNM",
        9969: "LKHM",
        9994: "TRHM",
        9760: "KD",
        9769: "LKNM",
        9794: "TRNM",
        9055: "RG",
        9766: "SF",
        9860: "KC",
        9809: "MC",
        9808: "SA",
        9025: "BT",
        9026: "ACNM",
        9727: "MCNM",
    };
    
    let playerId,
    targetName;
    
    dispatch.hook('S_LOGIN', 10, (event) => {
        playerId = event.playerId;
    });
    
    dispatch.hook('C_DUNGEON_CLEAR_COUNT_LIST', 1, (event) => {
        targetName = event.name;
    });
        
    dispatch.hook('S_DUNGEON_CLEAR_COUNT_LIST', 1, (event) => {
        if (playerId === event.pid) return;
        
        command.message(' ' + targetName + '\'s Dungeon Clears...');
        for (let i = 0; i < event.dungeons.length; i++) {
            if (DungeonNames[event.dungeons[i].id]) {
                command.message(' ' + DungeonNames[event.dungeons[i].id] + '\t\t' + event.dungeons[i].clears);
            }
        }
    });
}
