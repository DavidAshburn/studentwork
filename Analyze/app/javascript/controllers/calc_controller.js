import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
static targets = [
  "value",
  "footage",
  "dwelling",
  "erc",
  "homeliability",
  "excessre",
  "coversqft",
  "autoliability",
  "umbrellalimit",
  "numproperties",
  "totalpropvalue",
  "investmentvalue",
  "autoexcessre",
  "excessumbrellaauto",
  "excessumbrellahome",
  "totalexcessumbrella",
  "worklife",
  "deathbenefit",
  "cashvalue",
  "currentannual",
  "dependents",
  "yearsincome",
  "benefiteach"
]

connect() {
  this.formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0,
  });

  this.update();
}

excessREhome(home) {
  if(home >= 0) {
      let excesshome = this.valueTarget.value - parseInt(home);
      this.excessreTarget.innerText = this.formatter.format(excesshome);
    }
  
}

coverPerSqft(feet) {
  if(feet > 0) {
    let sqftout = (this.dwellingTarget.value * this.ercTarget.value) / feet;
    this.coversqftTarget.innerText = this.formatter.format(sqftout);
  }
}

excessREauto(auto) {
  if(auto >= 0) {
    let autoexcess = this.valueTarget.value - auto;
    this.autoexcessreTarget.innerText = this.formatter.format(autoexcess);
  }
}

excessREumbrella(umb, auto, home) {
  if(umb >= 0) {
    let autoumb = parseInt(auto) + parseInt(umb);
    let homeumb = parseInt(home) + parseInt(umb);
    let propval = this.totalpropvalueTarget.value;
    let investval = this.investmentvalueTarget.value;

    autoumb = propval - autoumb;
    homeumb = propval - homeumb;

    this.excessumbrellaautoTarget.innerText = this.formatter.format(autoumb);
    this.excessumbrellahomeTarget.innerText = this.formatter.format(homeumb);

    let worstcase = (parseInt(propval) + parseInt(investval)) - (parseInt(auto) + parseInt(umb));
    this.totalexcessumbrellaTarget.innerText = this.formatter.format(worstcase);
    }
}

lifeCalc(life) {
  if(life >= 0) {
    let yearsleft = life / parseFloat(this.currentannualTarget.value);
    this.yearsincomeTarget.innerText = yearsleft.toFixed(2);

    let remainder = life / parseFloat(this.dependentsTarget.value);

    this.benefiteachTarget.innerText = this.formatter.format(remainder);
  }
}

update() {
  let home = this.homeliabilityTarget.value;
  let feet = this.footageTarget.value;
  let auto = this.autoliabilityTarget.value;
  let umb = this.umbrellalimitTarget.value;
  let life = this.deathbenefitTarget.value;

  this.excessREhome(home);
  this.coverPerSqft(feet);
  this.excessREauto(auto);
  this.excessREumbrella(umb, auto, home);
  this.lifeCalc(life);
  console.log("update");
}

}