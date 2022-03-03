import { Auth0Provider } from '@bcwdev/auth0provider'
import { packagesService } from '../services/PackagesService'
import BaseController from '../utils/BaseController'

// TODO Write the Controller

export class PackagesController extends BaseController {
  constructor() {
    super('api/packages')
    this.router
      .get('', this.getAll)
      // NOTE unassigned needs to come first cause otherwise get by id will confuse it for an id
      .get('/unassigned', this.getUnassigned)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.deliver)
  }

  async getAll(req, res, next) {
    try {
      const packages = await packagesService.getAll(req.query)
      return res.send(packages)
    } catch (error) {
      next(error)
    }
  }

  async getUnassigned(req, res, next) {
    try {
      const packages = await packagesService.getAll({ shipId: null })
      return res.send(packages)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const onePackage = await packagesService.getById(req.params.id)
      return res.send(onePackage)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.delivered = false
      const newPackage = await packagesService.create(req.body)
      return res.send(newPackage)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      // NOTE could do this but checks on original basically do the same thing
      // delete req.body.delivered
      const editedPackage = await packagesService.update(req.body)
      return res.send(editedPackage)
    } catch (error) {
      next(error)
    }
  }

  // NOTE soft delete
  async deliver(req, res, next) {
    try {
      const message = await packagesService.deliver(req.params.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
