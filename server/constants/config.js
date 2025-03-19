const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:5173",
        process.env.CLIENT_URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

const TEST_TOKEN = "test-token";
export { corsOptions, TEST_TOKEN }