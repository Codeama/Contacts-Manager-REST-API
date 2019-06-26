    
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const JWT_SECRET = process.env.JWT_SECRET;
const TEST_USER=process.env.TEST_USER;
const TEST_PASSWORD=process.env.TEST_PASSWORD;
const SENDGRID_API_KEY=process.env.SENDGRID_API_KEY;

module.exports = {
    MONGO_URL,
    JWT_SECRET,
    TEST_USER,
    TEST_PASSWORD,
    SENDGRID_API_KEY
};