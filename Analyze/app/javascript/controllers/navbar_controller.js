import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [ "maindrop" ];

  initialize() {
  }

  connect() {
  }

  showDrop() {
    this.maindropTarget.classList.remove("hidden");
  }

  hideDrop() {
    this.maindropTarget.classList.add("hidden");
  }

}