const EventEmitter = require('events');

var ideas = [];

const store = new EventEmitter();

const storedIdeas = localStorage.getItem('ideas');
if (storedIdeas) { ideas = JSON.parse(storedIdeas); }

store.all = () => ideas.concat([]);

store.create+ ({ title, body }) => {
  ideas= ideas.concat({ title, body, active: false, id: Date.now() });
  store.emit('change', ideas);
};





module.exports = store;
