import { Request, Response } from "express"
import { logger } from "../utils/logger"
import { MutationUpdateValidation, MutationValidation } from "../validation/mutation.validation"
import { v4 as uuidV4 } from "uuid"
import { MutationType } from "../types/mutation.type"
import MutationService from "../services/mutation.service"

export class MutationController {
  private mutationService: MutationService

  constructor() {
    this.mutationService = new MutationService()
    this.GetAll = this.GetAll.bind(this)
    this.GetById = this.GetById.bind(this)
    this.Store = this.Store.bind(this)
    this.Update = this.Update.bind(this)
    this.Destroy = this.Destroy.bind(this)
  }

  public async GetAll(req: Request, res: Response) {
    const query = req.query as unknown as MutationType

    query.page = parseInt(req.query.page as string) || 1
    query.limit = parseInt(req.query.limit as string) || 10

    const data = await this.mutationService.GetAll(query)

    logger.info("Success get all mutation")
    return res.status(200).json({ status: true, statusCode: 200, data: data })
  }

  public async GetById(req: Request, res: Response) {
    const {
      params: { id }
    } = req
    const mutation = await this.mutationService.GetById(parseInt(id))

    if (!mutation) {
      return res.status(404).json({ success: false, statusCode: 404, message: "Mutation not found", data: {} })
    }

    logger.info("Success get mutation by id")
    return res.status(200).json({ success: false, statusCode: 200, data: mutation })
  }

  public async Store(req: Request, res: Response) {
    req.body.mutation_id = uuidV4()
    const { error, value } = MutationValidation(req.body)

    if (error) {
      logger.error(`ERR: mutation - mutation create = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") })
    }

    try {
      await this.mutationService.Store(value)

      logger.info("Success create mutation")
      return res.status(201).send({ status: true, statusCode: 201, message: "Success create mutation" })
    } catch (error: any) {
      logger.error(`ERR: mutation - create = ${error}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message })
    }
  }

  public async Update(req: Request, res: Response) {
    const {
      params: { id }
    } = req

    const { error, value } = MutationUpdateValidation(req.body)

    if (error) {
      logger.error(`ERR: mutation - update = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error.message.replace(/\"/g, "") })
    }

    try {
      const mutation = await this.mutationService.GetById(parseInt(id))
      if (!mutation) {
        return res.status(404).json({ status: false, statusCode: 404, data: "Mutation not found" })
      }

      const data = await this.mutationService.Update(parseInt(id), value)

      if (data) {
        logger.info("Success update mutation")
        return res.status(200).json({ status: true, statusCode: 200, message: "Success update mutation" })
      }
    } catch (error: any) {
      logger.error(`ERR: mutation - update = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error?.message })
    }
  }

  public async Destroy(req: Request, res: Response) {
    const {
      params: { id }
    } = req

    try {
      const mutation = await this.mutationService.GetById(parseInt(id))
      if (!mutation) return res.status(404).json({ status: false, statusCode: 404, data: "Mutation not found" })

      const data = await this.mutationService.Destroy(parseInt(id))
      if (data) {
        logger.info("Success delete mutation")
        return res.status(200).json({ status: true, statusCode: 200, message: "Success delete mutation" })
      }
    } catch (error: any) {
      logger.error(`ERR: user - delete = ${error.message}`)
      return res.status(422).send({ status: false, statusCode: 422, message: error?.message })
    }
  }
}