// Lorsqu'on appuie sur A, on peut faire la calibration de l'appareil avec un cuvette remplie d'eau et on débute par la suite la saisie de données.
input.onButtonPressed(Button.A, function () {
    Cal = input.lightLevel()
    basic.pause(100)
    Debut = 2
})
// En appuyant sur B, on fait la mise à zéro du programme.
input.onButtonPressed(Button.B, function () {
    control.reset()
})
let Moyenne = 0
let Lecture = 0
let Compteur = 0
let Cal = 0
let Debut = 0
Debut = 0
pins.analogWritePin(AnalogPin.P1, 1023)
basic.forever(function () {
    while (Debut == 0) {
        serial.writeValue("I", input.lightLevel())
        basic.pause(1000)
    }
    // Permet la saisie de données et la communication de l'absorbance via le port série.
    while (Debut == 2) {
        Compteur = 1
        Lecture = input.lightLevel()
        basic.pause(50)
        for (let index = 0; index < 49; index++) {
            Compteur += 1
            Lecture = Math.round(Lecture + input.lightLevel())
            basic.pause(50)
        }
        Moyenne = Lecture / Compteur
        serial.writeValue("Absorbance", 100 - Math.round(Moyenne * 100 / Cal))
        basic.pause(1000)
    }
})
