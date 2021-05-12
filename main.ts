namespace SpriteKind {
    export const bossmissile = SpriteKind.create()
    export const split = SpriteKind.create()
    export const point = SpriteKind.create()
    export const playerbucket = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(mySprite, 40, 40)
    heart.setFlag(SpriteFlag.Invisible, false)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.playerbucket, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    if (statusbar.value - Damage == 0) {
        if (++bossLv == 7) {
            myEnemy.destroy(effects.fire, 500)
            pause(2500)
            game.over(true)
        } else {
            statusbar.value = 100
            if (bossLv == 1) {
                mx = 3
                ay = 30
                offset = 0
            } else if (bossLv == 2) {
                mx = 3
                ax = -10
                ay = -35
                shoottime = 600
                offset = 0
            } else if (bossLv == 3) {
                mx = 4
                shoottime = 1000
                ax = ay = 0
            } else if (bossLv == 4) {
                mx = 4
                offset = 30
                acc = 10
                shoottime = 500
                special = (s: Sprite)=>{
                    s.follow(mySprite, 60, 30)
                }
            } else if (bossLv == 5) {
                mx = 8
                acc = 0
                special = (s: Sprite)=>{
                    let invis = setInterval(function() {
                        s.setFlag(SpriteFlag.Invisible, true)
                        setTimeout(function() {
                            s.setFlag(SpriteFlag.Invisible, false)
                        }, 400)
                    }, 500) 
                    setTimeout(function() {
                        clearTimeout(invis)
                    }, 5000)
                }
            } else if (bossLv == 6) {
                mx = 1
                shoottime = 1000
                bossmove = 0
                tr = 0
                for (let index = 0; index < 3; index++) {
                    myEnemy2 = sprites.create(img`
                        . . f f f . . . . . . . . f f f 
                        . f f c c . . . . . . f c b b c 
                        f f c c . . . . . . f c b b c . 
                        f c f c . . . . . . f b c c c . 
                        f f f c c . c c . f c b b c c . 
                        f f c 3 c c 3 c c f b c b b c . 
                        f f b 3 b c 3 b c f b c c b c . 
                        . c b b b b b b c b b c c c . . 
                        . c 1 b b b 1 b b c c c c . . . 
                        c b b b b b b b b b c c . . . . 
                        c b c b b b c b b b b f . . . . 
                        f b 1 f f f 1 b b b b f c . . . 
                        f b b b b b b b b b b f c c . . 
                        . f b b b b b b b b c f . . . . 
                        . . f b b b b b b c f . . . . . 
                        . . . f f f f f f f . . . . . . 
                        `, SpriteKind.split)
                    animation.runImageAnimation(
                    myEnemy2,
                    [img`
                        . . f f f . . . . . . . . f f f 
                        . f f c c . . . . . . f c b b c 
                        f f c c . . . . . . f c b b c . 
                        f c f c . . . . . . f b c c c . 
                        f f f c c . c c . f c b b c c . 
                        f f c 3 c c 3 c c f b c b b c . 
                        f f b 3 b c 3 b c f b c c b c . 
                        . c b b b b b b c b b c c c . . 
                        . c 1 b b b 1 b b c c c c . . . 
                        c b b b b b b b b b c c . . . . 
                        c b c b b b c b b b b f . . . . 
                        f b 1 f f f 1 b b b b f c . . . 
                        f b b b b b b b b b b f c c . . 
                        . f b b b b b b b b c f . . . . 
                        . . f b b b b b b c f . . . . . 
                        . . . f f f f f f f . . . . . . 
                        `,img`
                        . . f f f . . . . . . . . . . . 
                        f f f c c . . . . . . . . f f f 
                        f f c c . . c c . . . f c b b c 
                        f f c 3 c c 3 c c f f b b b c . 
                        f f b 3 b c 3 b c f b b c c c . 
                        . c b b b b b b c f b c b c c . 
                        . c b b b b b b c b b c b b c . 
                        c b 1 b b b 1 b b b c c c b c . 
                        c b b b b b b b b c c c c c . . 
                        f b c b b b c b b b b f c . . . 
                        f b 1 f f f 1 b b b b f c c . . 
                        . f b b b b b b b b c f . . . . 
                        . . f b b b b b b c f . . . . . 
                        . . . f f f f f f f . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . c c . . c c . . . . . . . . 
                        . . c 3 c c 3 c c c . . . . . . 
                        . c b 3 b c 3 b c c c . . . . . 
                        . c b b b b b b b b f f . . . . 
                        c c b b b b b b b b f f . . . . 
                        c b 1 b b b 1 b b c f f f . . . 
                        c b b b b b b b b f f f f . . . 
                        f b c b b b c b c c b b b . . . 
                        f b 1 f f f 1 b f c c c c . . . 
                        . f b b b b b b f b b c c . . . 
                        c c f b b b b b c c b b c . . . 
                        c c c f f f f f f c c b b c . . 
                        . c c c . . . . . . c c c c c . 
                        . . c c c . . . . . . . c c c c 
                        . . . . . . . . . . . . . . . . 
                        `,img`
                        . f f f . . . . . . . . f f f . 
                        f f c . . . . . . . f c b b c . 
                        f c c . . . . . . f c b b c . . 
                        c f . . . . . . . f b c c c . . 
                        c f f . . . . . f f b b c c . . 
                        f f f c c . c c f b c b b c . . 
                        f f f c c c c c f b c c b c . . 
                        . f c 3 c c 3 b c b c c c . . . 
                        . c b 3 b c 3 b b c c c c . . . 
                        c c b b b b b b b b c c . . . . 
                        c b 1 b b b 1 b b b b f c . . . 
                        f b b b b b b b b b b f c c . . 
                        f b c b b b c b b b b f . . . . 
                        . f 1 f f f 1 b b b c f . . . . 
                        . . f b b b b b b c f . . . . . 
                        . . . f f f f f f f . . . . . . 
                        `],
                    100,
                    true
                    )
                    myEnemy2.setFlag(SpriteFlag.AutoDestroy, false)
                    myEnemy2.setPosition(80 + 30 * Math.cos(tr / 57.3), 20 + 30 * Math.sin(tr / 57.3))
                    myEnemy2.setVelocity(curv * Math.cos((tr + 90) / 57.3), curv * Math.sin((tr + 90) / 57.3))
                    splits.push(myEnemy2)
                    tr += 120
                }
            }
        }
    } else {
        statusbar.value -= Damage
    }
})
sprites.onOverlap(SpriteKind.point, SpriteKind.bossmissile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    scene.cameraShake(4, 200)
    info.changeLifeBy(-1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 3 1 3 2 . . . . . . 
        . . . . . 3 1 1 1 3 . . . . . . 
        . . . . . 3 1 1 1 3 . . . . . . 
        . . . . . 3 1 1 1 3 . . . . . . 
        . . . . . 3 1 1 1 2 . . . . . . 
        . . . . . 2 1 1 1 2 . . . . . . 
        . . . . . 2 3 1 3 2 . . . . . . 
        . . . . . . 3 1 3 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -200)
    projectile.setKind(SpriteKind.playerbucket)
})
function shoot (speed: number, angel: number, sprite: Sprite) {
    for (let index22 = 0; index22 <= mx; index22++) {
        tang = (index22 * angel + offset) / 57.3
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . 7 . . . . 
            . . . . . . . . . . 7 7 . . . . 
            . . . . . . . c e 7 7 . . . . . 
            . . . . . . c c 2 7 5 e . . . . 
            . . . . . c c 2 2 5 5 2 e . . . 
            . . . . . c 2 2 2 2 2 2 e . . . 
            . . . . . e 2 2 2 2 2 2 e . . . 
            . . . . . e 2 2 2 2 2 2 e . . . 
            . . . . . . e 2 2 2 2 e e . . . 
            . . . . . . . e e e e . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, sprite, speed * Math.cos(tang), speed * Math.sin(tang))
        projectile.setKind(SpriteKind.bossmissile)
        projectile.ax = ax
        projectile.ay = ay
        speed += acc
    }
}
function moveto (sprite: Sprite, desx: number, desy: number, time: number) {
    if (bossmove == 0) {
        sprite.setVelocity((80 - sprite.x) / time, (20 - sprite.y) / time)
    } else {
        sprite.setVelocity((desx - sprite.x) / time, (desy - sprite.y) / time)
    }
}
sprites.onOverlap(SpriteKind.point, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 200)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.point, SpriteKind.split, function (sprite, otherSprite) {
    scene.cameraShake(4, 200)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.split, SpriteKind.playerbucket, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 200)
})
function shortshoot (speed: number, angel: number, sprite: Sprite, life: number) {
    for (let index23 = 0; index23 <= mx; index23++) {
        tang = (index23 * angel + offset) / 57.3
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . 7 . . . . 
            . . . . . . . . . . 7 7 . . . . 
            . . . . . . . c e 7 7 . . . . . 
            . . . . . . c c 2 7 5 e . . . . 
            . . . . . c c 2 2 5 5 2 e . . . 
            . . . . . c 2 2 2 2 2 2 e . . . 
            . . . . . e 2 2 2 2 2 2 e . . . 
            . . . . . e 2 2 2 2 2 2 e . . . 
            . . . . . . e 2 2 2 2 e e . . . 
            . . . . . . . e e e e . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, sprite, speed * Math.cos(tang), speed * Math.sin(tang))
        projectile.setKind(SpriteKind.bossmissile)
        projectile.lifespan = 5000
        special(projectile)
    }
}
function splitshoot (值: Sprite, n: number) {
    s = n * 15
    offset = 57.3 * Math.atan2(mySprite.y - 值.y, mySprite.x - 值.x)
    for (let index = 0; index < n; index++) {
        shoot(s, 0, 值)
        s += 5
    }
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    controller.moveSprite(mySprite, 100, 100)
    heart.setFlag(SpriteFlag.Invisible, true)
})
let speed = 0
let myEnemy2: Sprite = null
let tr = 0
let acc = 0
let myEnemy: Sprite = null
let heart: Sprite = null
let mx = 0
let curv = 0
let bossmove = 0
let splits: Sprite[] = []
let shoottime = 0
let bossLv = 0
let ax = 0
let ay = 0
let Damage = 0
let statusbar: StatusBarSprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
let special = (s: Sprite)=>{}
shoottime = 1000
splits = []
bossLv = 0
let s: number
let tang: number
let offset: number
bossmove = 1
curv = 30
let curk = curv * curv / 10
offset = 10
mx = 8
Damage = 10
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.value = 100
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f e e e e f f . . . . 
    . . . f e e e f f e e e f . . . 
    . . f f f f f 2 2 f f f f f . . 
    . . f f e 2 e 2 2 e 2 e f f . . 
    . . f e 2 f 2 f f 2 f 2 e f . . 
    . . f f f 2 2 e e 2 2 f f f . . 
    . f f e f 2 f e e f 2 f e f f . 
    . f e e f f e e e e f e e e f . 
    . . f e e e e e e e e e e f . . 
    . . . f e e e e e e e e f . . . 
    . . e 4 f f f f f f f f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
heart = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 1 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.point)
heart.setFlag(SpriteFlag.Invisible, true)
heart.follow(mySprite, 500)
controller.moveSprite(mySprite, 100, 100)
info.setLife(99)
mySprite.setStayInScreen(true)
myEnemy = sprites.create(img`
    . . f f f . . . . . . . . f f f 
    . f f c c . . . . . . f c b b c 
    f f c c . . . . . . f c b b c . 
    f c f c . . . . . . f b c c c . 
    f f f c c . c c . f c b b c c . 
    f f c 3 c c 3 c c f b c b b c . 
    f f b 3 b c 3 b c f b c c b c . 
    . c b b b b b b c b b c c c . . 
    . c 1 b b b 1 b b c c c c . . . 
    c b b b b b b b b b c c . . . . 
    c b c b b b c b b b b f . . . . 
    f b 1 f f f 1 b b b b f c . . . 
    f b b b b b b b b b b f c c . . 
    . f b b b b b b b b c f . . . . 
    . . f b b b b b b c f . . . . . 
    . . . f f f f f f f . . . . . . 
    `, SpriteKind.Enemy)
animation.runImageAnimation(
myEnemy,
[img`
    . . f f f . . . . . . . . f f f 
    . f f c c . . . . . . f c b b c 
    f f c c . . . . . . f c b b c . 
    f c f c . . . . . . f b c c c . 
    f f f c c . c c . f c b b c c . 
    f f c 3 c c 3 c c f b c b b c . 
    f f b 3 b c 3 b c f b c c b c . 
    . c b b b b b b c b b c c c . . 
    . c 1 b b b 1 b b c c c c . . . 
    c b b b b b b b b b c c . . . . 
    c b c b b b c b b b b f . . . . 
    f b 1 f f f 1 b b b b f c . . . 
    f b b b b b b b b b b f c c . . 
    . f b b b b b b b b c f . . . . 
    . . f b b b b b b c f . . . . . 
    . . . f f f f f f f . . . . . . 
    `,img`
    . . f f f . . . . . . . . . . . 
    f f f c c . . . . . . . . f f f 
    f f c c . . c c . . . f c b b c 
    f f c 3 c c 3 c c f f b b b c . 
    f f b 3 b c 3 b c f b b c c c . 
    . c b b b b b b c f b c b c c . 
    . c b b b b b b c b b c b b c . 
    c b 1 b b b 1 b b b c c c b c . 
    c b b b b b b b b c c c c c . . 
    f b c b b b c b b b b f c . . . 
    f b 1 f f f 1 b b b b f c c . . 
    . f b b b b b b b b c f . . . . 
    . . f b b b b b b c f . . . . . 
    . . . f f f f f f f . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . c c . . c c . . . . . . . . 
    . . c 3 c c 3 c c c . . . . . . 
    . c b 3 b c 3 b c c c . . . . . 
    . c b b b b b b b b f f . . . . 
    c c b b b b b b b b f f . . . . 
    c b 1 b b b 1 b b c f f f . . . 
    c b b b b b b b b f f f f . . . 
    f b c b b b c b c c b b b . . . 
    f b 1 f f f 1 b f c c c c . . . 
    . f b b b b b b f b b c c . . . 
    c c f b b b b b c c b b c . . . 
    c c c f f f f f f c c b b c . . 
    . c c c . . . . . . c c c c c . 
    . . c c c . . . . . . . c c c c 
    . . . . . . . . . . . . . . . . 
    `,img`
    . f f f . . . . . . . . f f f . 
    f f c . . . . . . . f c b b c . 
    f c c . . . . . . f c b b c . . 
    c f . . . . . . . f b c c c . . 
    c f f . . . . . f f b b c c . . 
    f f f c c . c c f b c b b c . . 
    f f f c c c c c f b c c b c . . 
    . f c 3 c c 3 b c b c c c . . . 
    . c b 3 b c 3 b b c c c c . . . 
    c c b b b b b b b b c c . . . . 
    c b 1 b b b 1 b b b b f c . . . 
    f b b b b b b b b b b f c c . . 
    f b c b b b c b b b b f . . . . 
    . f 1 f f f 1 b b b c f . . . . 
    . . f b b b b b b c f . . . . . 
    . . . f f f f f f f . . . . . . 
    `],
100,
true
)
myEnemy.setPosition(80, 20)
myEnemy.setStayInScreen(true)
statusbar.attachToSprite(myEnemy, -25, 0)
game.onUpdateInterval(shoottime, function () {
    if (bossLv == 0) {
        shoot(50, 45, myEnemy)
        if (Math.percentChance(50)) {
            mx = 3
            ax = 10
            ay = 10
            if (Math.percentChance(50)) {
                shoot(50, 20, myEnemy)
                offset = (offset + 90) % 180
            }
            shoot(25, 20, myEnemy)
            ax= ay = 0
mx = 8
        }
    } else if (bossLv == 1) {
        s = 30
        for (let index = 0; index < 2; index++) {
            shoot(s, 30, myEnemy)
            s += 10
            offset = (offset + 25) % 270
        }
    } else if (bossLv == 2) {
        s = 75
        for (let index = 0; index < 2; index++) {
            ay = randint(-35, 5)
            for (let index = 0; index < 2; index++) {
                shoot(s, 20, myEnemy)
                offset = (offset + 90) % 180
                ax = 0 - ax
            }
            s = 50
        }
        offset += 10
    } else if (bossLv == 3) {
        offset = 10
        s = 50
        for (let index = 0; index < 4; index++) {
            shoot(s, 55, myEnemy)
            s += 10
        }
        if (Math.percentChance(50)) {
            mx = 18
            shoot(20, 20, myEnemy)
            mx = 4
        }
        offset = (offset + 10) % 180
    } else if (bossLv == 4) {
        if (offset > 90) {
            s = 120
            acc = -10
        } else {
            s = 80
            acc = 10
        }
        for (let index = 0; index < 4; index++) {
            shoot(s, 10, myEnemy)
            s += 10
        }
        mx = 1
        if (Math.percentChance(55)) {
            shortshoot(70, 30, myEnemy, 5000)
        }
        mx = 4
        offset = Math.max(30, (offset + 15) % 120)
    } else if (bossLv == 5) {
        shoot(s, 45, myEnemy)
        s = 20
        mx = 4
        for (let index = 0; index < 3; index++) {
            shortshoot(s, 90, myEnemy, 5000)
            s += 15
            offset = (offset + 27) % 360
        }
        offset = Math.max(30, (offset + 10) % 120)
        mx = 8
    } else if (bossLv == 6) {
        for (let 值 of splits) {
            splitshoot(值, 2)
            mx = 3
            shoot(120, 120, 值)
            mx = 1
            offset = (offset + 10) % 180
        }
        splitshoot(myEnemy, 3)
    }
    moveto(myEnemy, randint(5, 150), randint(5, 35), randint(1, 5))
})
game.onUpdateInterval(1, function () {
    if (splits.length != 0) {
        for (let 值2 of splits) {
            tang = Math.PI / 2 + Math.atan2(值2.vy, 值2.vx)
            值2.ax = curk * Math.cos(tang)
            值2.ay = curk * Math.sin(tang)
        }
    }
})
