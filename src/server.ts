import createServer from "./utils/server"
import { logger } from "./utils"

const app = createServer()
const PORT: number = 4000

app.listen(PORT, () => logger.info(`server running at port ${PORT}`))

export default app