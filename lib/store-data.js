const EventEmitter = require('events');

let grudges = [];

const store = new EventEmitter();
const storedGrudges = localStorage.getItem('grudges');
if (storedGrudges) { grudges = JSON.parse(storedGrudges); }
store.all = () => grudges.concat([]);

store.create = ({ title, body, status }) => {
  grudges = grudges.concat({ title, body, status, id: Date.now() });
  store.emit('change', grudges);
};

store.destroy = (id) => {
  grudges = grudges.filter(grudge => grudge.id !== id);
  store.emit('change', grudges);
};

store.update = (id, status) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) { return grudge }
    if (status === 'Kill??') {
      status = 'Save';
      return Object.assign(grudge, { status: status })
    } else {
      status = 'Kill??';
      return Object.assign(grudge, { status: status })
    }
  });
  store.emit('change', grudges)
}

store.statusKill = (grudges) => {
  grudges = grudges.filter(grudge => {
    return grudge.status === 'Kill??'
  })
  return grudges
}

store.statusSave = (grudges) => {
  grudges = grudges.filter(grudge => {
    return grudge.status === 'Save'
  })
  return grudges
}

store.on('change', () => {
  localStorage.setItem('grudges', JSON.stringify(grudges));
});


module.exports = store;
