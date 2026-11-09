const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, '..', 'tasks.json');

function readTasksFile() {
  try {
    if (!fs.existsSync(TASKS_FILE)) {
      fs.writeFileSync(TASKS_FILE, '[]\n', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(TASKS_FILE, 'utf8');
    return raw.trim() ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error al leer tasks.json:', err);
    return [];
  }
}

function writeTasksFile(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2) + '\n', 'utf8');
}

module.exports = function (app) {
  app.get('/api/tasks', (req, res) => {
    const tasks = readTasksFile();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(tasks));
  });

  app.put('/api/tasks', (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        if (!Array.isArray(parsed)) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ error: 'El formato debe ser un arreglo de tareas.' }));
          return;
        }
        writeTasksFile(parsed);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ ok: true, count: parsed.length }));
      } catch (err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: 'JSON inválido.' }));
      }
    });
  });
};
