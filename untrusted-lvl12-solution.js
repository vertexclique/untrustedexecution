/*
 * robotNav.js
 *
 * The green key is located in a slightly more
 * complicated room. You'll need to get the robot
 * past these obstacles.
 */

function startLevel(map) {
    // Hint: you can press R or 5 to "rest" and not move the
    // player, while the robot moves around.

    map.placePlayer(0, map.getHeight() - 1);
    var player = map.getPlayer();

    map.defineObject('robot', {
        'type': 'dynamic',
        'symbol': 'R',
        'color': 'gray',
        'onCollision': function (player, me) {
            me.giveItemTo(player, 'greenKey');
        },
        'behavior': function (me) {

    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var namer = "";
    for( var i=0; i < 5; i++ )
        namer += possible.charAt(Math.floor(Math.random() * possible.length));
        
        map.defineObject(namer, 
        {
            'type': 'static',
            'symbol': 'H',
            'color': '#0ff080',
            'onCollision': function (player, game) {
                game.addToInventory('greenKey');
            }
        });
        if(!me.hacked){
            map.placeObject(20, map.getHeight() - 10, namer);
            me.hacked=true;
        } 
        
        }
    });

    map.defineObject('barrier', {
        'symbol': '░',
        'color': 'purple',
        'impassable': true,
        'passableFor': ['robot']
    });

    map.placeObject(map.getWidth() - 1, map.getHeight() - 1, 'exit');
    map.placeObject(1, 1, 'robot');
    map.placeObject(map.getWidth() - 2, 8, 'greenKey');
    map.placeObject(map.getWidth() - 2, 9, 'barrier');

    for (var x = 0; x < map.getWidth(); x++) {
        map.placeObject(x, 0, 'block');
        if (x != map.getWidth() - 2) {
            map.placeObject(x, 9, 'block');
        }
    }

    for (var y = 1; y < 9; y++) {
        map.placeObject(0, y, 'block');
        map.placeObject(map.getWidth() - 1, y, 'block');
    }

    for (var i = 0; i < 4; i++) {
        map.placeObject(20 - i, i + 1, 'block');
        map.placeObject(35 - i, 8 - i, 'block');
    }
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(1, 'robot');
    map.validateAtMostXObjects(1, 'greenKey');
}

function onExit(map) {
    if (!map.getPlayer().hasItem('greenKey')) {
        map.writeStatus("We need to get that key!");
        return false;
    } else {
        return true;
    }
}
 	