function createEnemies() {
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)){
        bumper = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . f f f f f f . . . . . .
            . . . f 7 2 7 7 7 2 f . . . . .
            . . f 7 7 7 2 7 2 7 7 f . . . .
            . . f 7 7 7 7 7 7 7 7 7 f . . .
            . f 7 7 7 2 7 7 7 2 7 7 f . . .
            . f 7 7 7 2 7 7 7 2 7 7 7 f . .
            . f 7 7 7 7 7 7 7 7 7 7 7 7 f .
            . f 7 7 7 7 2 2 2 7 7 7 7 7 f .
            . . f 7 7 2 2 7 2 7 7 7 7 7 f .
            . . f 7 7 2 7 7 2 2 7 7 7 7 f .
            . . . f 7 7 7 7 7 2 2 7 7 7 f .
            . . . . f f 7 7 7 7 7 7 7 f . .
            . . . . . . f f f f f f f . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)){
        bumper.vx = Math.randomRange(30, 60)
    } else {
        bumper.vx = Math.randomRange(-60, -30)
    }
    }
    for (let value6 of tiles.getTilesByType(assets.tile`tile7`)) {
        flier = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
        // animation.attachAnimation(flier, flierFlying)
        // animation.attachAnimation(flier, flierIdle)
        animation.runImageAnimation(flier, flierImgs, 50, true)
    }
}
function attemptJump () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters

    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        if (hero.vy >= 40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
        animateJumps(hero)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function intializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
}
function spawnGoals() {
    for (let value of tiles.getTilesByType(assets.tile`tile5`)){
        coin = sprites.create(coinImgs[0])
        tiles.placeOnTile(coin, value)
        animation.runImageAnimation(coin, coinImgs, 50, true)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    controller.moveSprite(player2, 100, 0)
    scene.cameraFollowSprite(player2)
    player2.z = 5
    info.setScore(0)
    info.setLife(3)
}
function animateJumps(sprite: Sprite){
    if (sprite.vx > 0){
        animation.runImageAnimation(
        sprite,
        heroJumpRightImgs,
        150,
        false
        )
        sprite.setImage(heroIdleRightImg)
    }
    else {
        animation.runImageAnimation(
        sprite,
        heroJumpLeftImgs,
        150,
        false
        )
        sprite.setImage(heroIdleLeftImg)
    }
}
 hero = sprites.create(heroIdleRightImg, SpriteKind.Player)
createPlayer(hero)
intializeLevel(currentLevel)
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
function initializeFlierAnimations () {
 let flierFlying = animation.createAnimation(ActionKind.Flying, 100)
    flierFlying.addAnimationFrame(flierImgs[1])
    flierFlying.addAnimationFrame(flierImgs[2])
    flierFlying.addAnimationFrame(flierImgs[3])
 let flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(flierImgs[1])
}