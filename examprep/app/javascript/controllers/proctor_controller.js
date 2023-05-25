import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "question",
    "answer",
    "wrong",
    "correct",
    "incorrect",
    "results"
  ]

  static classes = [
    "found",
    "oops"
  ]


  initialize() {
    this.correctcount = 0
    this.wrongcount = 0
    this.questions = this.questionTargets
  }

  connect() {
    
  }

  updateScore() {
    let result = ((this.correctcount / this.questions.length) * 100).toFixed(0)
    this.resultsTarget.innerText = `${result}%`
    this.correctTarget.innerText = this.correctcount
    this.incorrectTarget.innerText = this.wrongcount

  }

  wrong(e) {
    this.wrongcount++
    e.currentTarget.classList.add(...this.oopsClasses)
    this.updateScore()
  }

  answer(e) {
    this.correctcount++
    e.currentTarget.classList.add(...this.foundClasses)
    this.updateScore()
  }

  
}
