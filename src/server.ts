import CONFIG from "./config/environment"
import { logger } from "./utils"
import createServer from "./utils/server"

const app = createServer()
const PORT: number = 4000

app.listen(PORT, () => logger.info(`server running at port ${PORT}`))

export default app
