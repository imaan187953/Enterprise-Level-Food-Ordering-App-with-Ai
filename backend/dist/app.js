import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import imageRoutes from "./routes/image.routes.js";
import foodRoutes from "./routes/food.routes.js";
import foodOptionRoutes from "./routes/foodOption.routes.js";
import addressRoutes from "./routes/address.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/v1/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Happy Hoppy Eats API is running",
    });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/images", imageRoutes);
app.use("/api/v1/foods", foodRoutes);
app.use("/api/v1/food-options", foodOptionRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use(errorMiddleware);
export default app;
//# sourceMappingURL=app.js.map