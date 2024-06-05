const { db } = require('./db');

const getAllTransportRequests = (callback) => {
  const query = 'SELECT * FROM TransportRequests';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao consultar todas as solicitações de transporte:', err);
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const getTransportRequestById = (id, callback) => {
  const query = 'SELECT * FROM TransportRequests WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao consultar solicitação de transporte por ID:', err);
      return callback(err, null);
    }
    return callback(null, results[0]);
  });
};

const getTransportRequestsByMaqueiroId = (maqueiro_id, callback) => {
  const query = 'SELECT * FROM TransportRequests WHERE maqueiro_id = ?';
  db.query(query, [maqueiro_id], (err, results) => {
    if (err) {
      console.error('Erro ao consultar solicitações de transporte por ID do maqueiro:', err);
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const insertTransportRequest = (data, callback) => {
  const query = `
      INSERT INTO TransportRequests (patient_name, data, initial_point, destination_point, maqueiro_id, priority)
      VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [data.patient_name, data.data, data.initial_point, data.destination_point, data.maqueiro_id, data.priority];
  db.query(query, params, (err, result) => {
      if (err) {
          console.error('Erro ao inserir solicitação de transporte:', err);
          return callback(err);
      }
      return callback(null, result.insertId);
  });
};

const updateTransportRequest = (id, data, callback) => {
  const fields = ['patient_name', 'status', 'priority', 'data', 'initial_point', 'destination_point', 'maqueiro_id'];
  let updates = [];
  let params = [];

  fields.forEach(field => {
    if (data.hasOwnProperty(field) && data[field] !== undefined) {
      updates.push(`${field} = ?`);
      params.push(data[field]);
    }
  });

  if (updates.length === 0) {
    return callback(new Error("Sem campos validos para atualizar"), null);
  }
  params.push(id);

  const query = `UPDATE TransportRequests SET ${updates.join(', ')} WHERE id = ?`;

  db.query(query, params, (err) => {
    if (err) {
      console.error('Erro ao atualizar solicitação de transporte:', err);
      return callback(err);
    }
    return callback(null);
  });
};


const deleteTransportRequest = (id, callback) => {
  const query = 'DELETE FROM TransportRequests WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erro ao deletar solicitação de transporte:', err);
      return callback(err);
    }
    return callback(null);
  });
};

const updateTransportRequestPriority = (id, priority, callback) => {
  const query = 'UPDATE TransportRequests SET priority = ? WHERE id = ?';
  db.query(query, [priority, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar a prioridade da solicitação de transporte:', err);
      return callback(err);
    }
    return callback(null);
  });
};

const updateTransportRequestStatus = (id, request_status, callback) => {
  const sql = `UPDATE transportrequests SET request_status = ? WHERE id = ?`;
  db.query(sql, [request_status, id], callback);
};

const updateTransportStatus = (id, status, callback) => {
  const sql = `UPDATE transportrequests SET status = ? WHERE id = ?`;
  db.query(sql, [status, id], callback);
};

module.exports = {
  getAllTransportRequests,
  getTransportRequestById,
  getTransportRequestsByMaqueiroId,
  insertTransportRequest,
  updateTransportRequest,
  deleteTransportRequest,
  updateTransportRequestPriority,
  updateTransportRequestStatus,
  updateTransportStatus,
};