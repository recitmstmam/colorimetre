// Lorsqu'on appuie sur A, on peut faire la calibration de l'appareil avec un cuvette remplie d'eau et on débute par la suite la saisie de données.
input.onButtonPressed(Button.A, function () {
    Cal = input.lightLevel()
    basic.pause(100)
    Debut = 2
})
// En appuyant sur B, on fait la mise à zéro du programme.
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
// changer la couleur de la DEL
input.onButtonPressed(Button.B, function () {
    nombre += 1
    if (nombre == 1) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else if (nombre == 2) {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else if (nombre == 3) {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
    } else if (nombre == 4) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 1)
    } else if (nombre >= 5) {
        nombre = 0
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
})
let Moyenne = 0
let Lecture = 0
let Compteur = 0
let nombre = 0
let Cal = 0
let Debut = 0
Debut = 0
basic.forever(function () {
    while (Debut == 0) {
        serial.writeValue("I", input.lightLevel())
        basic.pause(1000)
    }
    // Permet la saisie de données et la communication de l'absorbance via le port série.
    while (Debut == 2) {
        Compteur = 1
        Lecture = input.lightLevel()
        basic.pause(20)
        for (let index = 0; index < 9; index++) {
            Compteur += 1
            Lecture = Math.round(Lecture + input.lightLevel())
            basic.pause(20)
        }
        Moyenne = Lecture / Compteur
        serial.writeValue("Absorbance", Math.round((100 - Moyenne * 100 / Cal) * 10) / 10)
        basic.pause(1000)
    }
})
