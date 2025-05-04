require('dotenv').config();
const { Sequelize } = require('sequelize');

// Check if DATABASE_URL is available (Production/Hosted)
const DATABASE_URL = process.env.DATABASE_URL;

// Decide the sequelize connection config based on environment
const sequelize = DATABASE_URL
    ? new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: (sql, queryTime) => {
            const slowThreshold = 1000;
            if (queryTime > slowThreshold) {
                console.warn(`[Slow Query] ${queryTime}ms: ${sql}`);
            }
        },
        define: {
            timestamps: true,
            underscored: true,
        },
        benchmark: true,
    })
    : new Sequelize({
        database: "postgres",
        username: "ayushmathur",
        password: "Ayush123",
        host: "localhost",
        port: 5432,
        dialect: 'postgres',
        logging: (sql, queryTime) => {
            const slowThreshold = 1000;
            if (queryTime > slowThreshold) {
                console.warn(`[Slow Query] ${queryTime}ms: ${sql}`);
            }
        },
        define: {
            timestamps: true,
            underscored: true,
        },
        benchmark: true,
    });

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`✅ Database connected successfully`);

        await sequelize.sync();
        console.log('🔄 Database schema synchronized');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};

module.exports = {
    sequelize,
    connectDatabase,
};
