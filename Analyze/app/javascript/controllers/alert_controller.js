import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [ 
  "alert" 
  ]

  initialize() {
  }

  connect() {
  }

  close() {
    this.element.remove()
  }
}