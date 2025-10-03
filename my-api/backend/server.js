import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:123a@localhost:5433/clinicbeauty_db',
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});


app.get('/api/appointments', async (req, res) => {
    try {
        console.log('Полный запрос к appointments...');
        
       
        const simpleResult = await pool.query('SELECT COUNT(*) FROM appointments');
        console.log(`Всего записей: ${simpleResult.rows[0].count}`);

       
        const result = await pool.query(`
            SELECT 
                a.appointment_id,
                a.user_id,
                a.service_id,
                a.appointment_date,
                a.appointment_time,
                a.status,
                a.notes,
                a.created_at
            FROM appointments a
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `);

        console.log(`Результат: ${result.rows.length} записей`);
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка полного запроса:', error);
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                user_id,
                email,
                first_name,
                last_name,
                phone,
                role_id,
                created_at
            FROM users
            ORDER BY created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/services', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                service_id,
                name,
                description,
                duration_minutes,
                price,
                is_active,
                created_at
            FROM services
            ORDER BY created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении услуг:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/payments', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                payment_id,
                user_id,
                appointment_id,
                amount,
                payment_method,
                status,
                transaction_id,
                created_at
            FROM payments
            ORDER BY created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении платежей:', error);
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/roles', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                role_id,
                role_name,
                description
            FROM roles
            ORDER BY role_id ASC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка при получении ролей:', error);
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Тестовые endpoints:');
    console.log(`1) http://localhost:${PORT}/api/test`);
    console.log(`2) http://localhost:${PORT}/api/appointments`);
    console.log(`3) http://localhost:${PORT}/api/users`);
    console.log(`4) http://localhost:${PORT}/api/services`);
    console.log(`5) http://localhost:${PORT}/api/payments`);
    console.log(`6) http://localhost:${PORT}/api/roles`);
});

app.get('/', (req, res) => {
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>API</title>
        </head>
        <body>   
        </body>
        </html>
    `);
});