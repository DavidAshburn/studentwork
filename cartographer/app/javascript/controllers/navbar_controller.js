import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [ "maindrop", "altdrop" ];

  connect() {
  }

  showDrop() {
    this.maindropTarget.classList.toggle("hidden", false);
  }

  showDropAlt() {
    this.altdropTarget.classList.toggle("hidden", false);
  }

  hideDrop() {
    this.maindropTarget.classList.toggle("hidden", true);
  }

  hideDropAlt() {
    this.altdropTarget.classList.toggle("hidden", true);
  }

}