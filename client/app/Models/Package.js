import { ProxyState } from '../AppState.js'

export class Package {
  constructor(data) {
    this.id = data.id
    this.recipient = data.recipient
    this.address = data.address
    this.delivered = data.delivered
    this.priority = data.priority
    this.weight = data.weight
    this.shipId = data.shipId
    this.ship = data.ship
  }

  get Template() {
    return `
    <div class="col-12 p-2 my-1 bg-white shadow rounded">
    <div class="row">
      <h6 class="col-md-6">${this.recipient}</h6>
      <div class="col-md-6"> ${this.address}</div>
      <div class="col-md-6">${this.priority}</div>
      <div class="col-md-6">${this.weight}</div>
      <div class="col-md-6 d-flex justify-content-end offset-md-6">
        <div class="dropdown ">
          <button class="btn btn-primary dropdown-toggle" type="button" id="triggerId"
            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           assign to ship
          </button>
          <div class="dropdown-menu" aria-labelledby="triggerId">
            ${this.shipList}
          </div>
        </div>
      </div>
      <div class="col-12"> ${this.ship ? this.ship.name : 'package unassigned'}</div>
      <div class="col-12"> ${this.delivered ? 'delivered' : 'enroute'}</div>
    </div>
  </div>
    `
  }

  get shipList() {
    const ships = ProxyState.ships
    let template = ''
    ships.forEach(s => { template += `<div class="dropdown-item selectable" onclick="app.packagesController.assignPackage('${this.id}','${s.id}')">${s.name}</div>` })
    return template
  }
}
