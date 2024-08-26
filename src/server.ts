import "../src/utils/prisma"
import { logger } from "./utils/logger"
import createServer from "./utils/server"

const app = createServer()
const PORT: number = 4000

app.listen(PORT, () => logger.info(`server running at port ${PORT}`))
