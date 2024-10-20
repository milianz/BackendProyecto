import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import publicationRoutes from "./routes/publicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use(passport.initialize());

const apiV1Router = express.Router();

apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/publications", publicationRoutes);
apiV1Router.use("/users", userRoutes);
apiV1Router.use("/admin", adminRoutes);
apiV1Router.use("/reports", reportRoutes);

app.use("/api/v1", apiV1Router);

app.use(errorHandler);

export default app;
