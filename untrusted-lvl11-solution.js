/*
 * robot.js
 *
 * You'll need three keys in order to unlock the
 * Algorithm: the red key, the green key, and the
 * blue key. Unfortunately, all three of them are
 * behind human-proof barriers.
 *
 * The plan is simple: reprogram the maintenance
 * robots to grab the key and bring it through
 * the barrier to us.
 *
 * Let's try it on the red key first.
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startLevel(map) {
    // Hint: you can press R or 5 to "rest" and not move the
    // player, while the robot moves around.

    map.placePlayer(map.getWidth()-2, map.getHeight()-2);
    var player = map.getPlayer();

    map.defineObject('robot', {
        'type': 'dynamic',
        'symbol': 'R',
        'color': 'gray',
        'onCollision': function (player, me) {
            me.giveItemTo(player, 'redKey');
        },
        'behavior': function (me) {
            // Available commands: me.move(direction)
            //                 and me.canMove(direction)
        var target = me.findNearest("redKey");
        if (target == undefined)
        	target = me.findNearest("player");
        var leftDist = me.getX() - target.x;
        var upDist = me.getY() - target.y;
        
        var direction;
        if (upDist == 0 && leftDist == 0) {
            return;
        } if (upDist > 0 && upDist >= leftDist) {
            direction = 'up';
        } else if (upDist < 0 && upDist < leftDist) {
            direction = 'down';
        } else if (leftDist > 0 && leftDist >= upDist) {
            direction = 'left';
        } else {
            direction = 'right';
        }
        
        if (me.canMove(direction)) {
            me.move(direction);
        }
            
        }
    });

    map.defineObject('barrier', {
        'symbol': '░',
        'color': 'purple',
        'impassable': true,
        'passableFor': ['robot']
    });

    map.placeObject(0, map.getHeight() - 1, 'exit');
    map.placeObject(1, 1, 'robot');
    map.placeObject(map.getWidth() - 2, 8, 'redKey');
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
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(1, 'robot');
    map.validateAtMostXObjects(1, 'redKey');
}

function onExit(map) {
    if (!map.getPlayer().hasItem('redKey')) {
        map.writeStatus("We need to get that key!");
        return false;
    } else {
        return true;
    }
}
 	