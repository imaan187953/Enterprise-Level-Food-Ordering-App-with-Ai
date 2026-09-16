import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
const startServer = async () => {
    try {
        await connectDB();
        app.listen(env.port, () => {
            console.log(`Happy Hoppy Eats API running on port ${env.port}`);
            console.log(`Health: http://localhost:${env.port}/api/v1/health`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map