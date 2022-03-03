import { ProxyState } from '../AppState.js'
import { Package } from '../Models/Package.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PackagesService {
  async getPackages(query = '') {
    const res = await api.get('api/packages' + query)
    logger.log('[packages]', res.data)
    ProxyState.packages = res.data.map(p => new Package(p))
  }

  async assignPackage(packageId, shipId) {
    const res = await api.put('api/packages/' + packageId, { shipId: shipId })
    logger.log('[update package]', res.data)
    const index = ProxyState.packages.findIndex(p => p.id === packageId)
    ProxyState.packages.splice(index, 1, new Package(res.data))
    // eslint-disable-next-line no-self-assign
    ProxyState.packages = ProxyState.packages
  }
// TODO Write all the service
}

export const packagesService = new PackagesService()
