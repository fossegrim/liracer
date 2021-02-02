/* ========= *
 * CONSTANTS *
 * ========= */
const codefield = document.getElementsByClassName("codefield")[0]

/* ========== *
 * GAME STATE *
 * ========== */
let snip = `
package main

import "fmt"

func main() {
	fmt.Println("hello, world!")
}`.trim()
let correctChars = 5
let incorrectChars = 10

/* ========= *
 * FUNCTIONS *
 * ========= */
// renderSnippet renders a snippet snip to the codefield, overwriting any previous text.
const renderCodefield = () => {
	codefield.textContent = ""
	snip.split("").forEach((c, i) => {
		s = document.createElement("span")
		if (c === "\n") {
			s.textContent = "↵\n"
			s.classList.add("codefield-character-newline")
		} else {
			s.textContent = c
		}
		s.classList.add("codefield-character")
		if (i < correctChars) {
			s.classList.add("codefield-character-correct")
		} else if (i < correctChars + incorrectChars) {
			s.classList.add("codefield-character-incorrect")
		} else if (i === correctChars + incorrectChars) {
			s.classList.add("codefield-character-player")
		}

		codefield.appendChild(s)
	})
}

// typeIncorrectChar "types" a incorrect character, that is increments incorrectChars and renders codefield.
const typeIncorrectChar = () => {
	incorrectChars++
	renderCodefield()
}

// deleteIncorrectChar "deletes" a incorrect character, that is it decrements incorrectChars and renders the codefield.
const deleteIncorrectChar = () => {
	incorrectChars--
	renderCodefield()
}

// typeCorrectChar "types" a correct character, that is increments correctChars and renders codefield.
const typeCorrectChar = () => {
	correctChars++
	renderCodefield()
}

// deleteCorrectChar "deletes" a correct character, that is it decrements correctChars and renders the codefield.
const deleteCorrectChar = () => {
	correctChars--
	renderCodefield()
}

// mapKeyToChar maps a key, as in the key field of a KeyboardEvent, to the character it represents.
const mapKeyToChar = key => {
	if(['Shift', 'Meta', 'Alt', 'Control', 'Backspace'].includes(key)){
		return null
	} else if (key === "Enter"){
		return "\n"
	} else if (key === 'Tab') {
		return "\t"
	} else {
		return key
	}
}

/* ============ *
 * ENTRY POINTS *
 * ============ */
renderCodefield(snip, correctChars, incorrectChars)

codefield.addEventListener("keydown", e => {
	if (e.key === "Tab") {
		/* On Safari, pressing tab makes the browser focus the search field. calling e.preventDefault prevents this. */
		e.preventDefault()
	}

	if(e.key === "Backspace") {
		if (incorrectChars > 0) {
			deleteIncorrectChar()
		} else if (correctChars > 0) {
			deleteCorrectChar()
		}
		return
	}

	char = mapKeyToChar(e.key)
	if(char === null) {
		return
	}

	if(incorrectChars > 0) {
		typeIncorrectChar()
		return
	}

	if(char === snip[correctChars]) {
		typeCorrectChar()
	} else {
		typeIncorrectChar()
	}
})
