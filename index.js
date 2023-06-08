const express = require('express');
const winston = require('winston');

const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  logger.log({
    level: 'info',
    message: `New addition operation requested: ${num1} + ${num2}`,
  });
  const result = Number(num1) + Number(num2);
  res.json({ result });
});

app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;
  logger.log({
    level: 'info',
    message: `New subtraction operation requested: ${num1} - ${num2}`,
  });
  const result = Number(num1) - Number(num2);
  res.json({ result });
});

app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;
  logger.log({
    level: 'info',
    message: `New multiplication operation requested: ${num1} * ${num2}`,
  });
  const result = Number(num1) * Number(num2);
  res.json({ result });
});

app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;
  logger.log({
    level: 'info',
    message: `New division operation requested: ${num1} / ${num2}`,
  });
  if (Number(num2) === 0) {
    logger.log({
      level: 'error',
      message: 'Division by zero is not allowed',
    });
    res.status(400).json({ error: 'Division by zero is not allowed' });
  } else {
    const result = Number(num1) / Number(num2);
    res.json({ result });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
