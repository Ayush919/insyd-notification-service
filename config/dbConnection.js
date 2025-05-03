require('dotenv').config();
const {Sequelize} = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize({
    database: "postgres",
    username: "ayushmathur",
    password: "Ayush123",
    host: "localhost",
    port: 5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: (sql, queryTime) => {
        const slowThreshold = 1000;
        if (queryTime > slowThreshold) {
            console.warn(`[Slow Query] ${queryTime}ms: ${sql}`);
        }
    },
    dialectModule: require('pg'),
    define: {
        timestamps: true,
        underscored: true
    },
    benchmark: true
});

// Connection and sync function (manual trigger - not automatic)
const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`✅ Database connected successfully`);

        // Only sync if in development
        await sequelize.sync(); // NO FORCE → Safe sync
        console.log('🔄 Database schema synchronized');

    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};

module.exports = {
    sequelize,
    connectDatabase
};

