import { dbContext } from '../db/DbContext'

class PackagesService {
  async getAll(query = {}) {
    const packages = await dbContext.Packages.find(query).populate('ship', 'name captain')
    return packages
  }

  async getById(id) {
    const onePackage = await dbContext.Packages.findById(id).populate('ship', 'name captain')
    return onePackage
  }

  async create(body) {
    const newPackage = await dbContext.Packages.create(body)
    await newPackage.populate('ship', 'name captain')
    return newPackage
  }

  async update(update) {
    const original = await dbContext.Packages.findById(update.id)
    original.recipient = update.recipient ? update.recipient : original.recipient
    original.address = update.address ? update.address : original.address
    original.weight = update.weight != null ? update.weight : original.weight
    // NOTE we don't allow them to change out soft delete value through our edit
    // original.delivered = update.delivered != null ? update.delivered : original.delivered
    original.shipId = update.shipId !== '' ? update.shipId : original.shipId
    await original.save()
    await original.populate('ship', 'name captain')
    return original
  }

  async deliver(id) {
    const original = await dbContext.Packages.findById(id)
    original.delivered = !original.delivered
    await original.save()
    return original.delivered ? 'Delivered' : 'returned to storage'
  }
}
export const packagesService = new PackagesService()
