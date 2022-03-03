import { ProxyState } from '../AppState.js'
import { packagesService } from '../Services/PackagesService.js'
import { logger } from '../Utils/Logger.js'

function _draw() {
// TODO write Draw
  let template = ''
  // eslint-disable-next-line no-return-assign
  ProxyState.packages.forEach(p => template += p.Template)
  document.getElementById('manifest').innerHTML = template
}
export class PackagesController {
  constructor() {
    this.getPackages()
    ProxyState.on('packages', _draw)
  }

  async getPackages(query = '') {
    try {
      await packagesService.getPackages(query)
    } catch (error) {
      logger.error(error)
    }
  }

  async assignPackage(packageId, shipId) {
    try {
      logger.log(packageId, shipId)
      await packagesService.assignPackage(packageId, shipId)
    } catch (error) {
      logger.error(error)
    }
  }
}
