const EventEmitter = require('events');

var ideas = [];

const store = new EventEmitter();

const storedIdeas = localStorage.getItem('ideas');
if (storedIdeas) { ideas = JSON.parse(storedIdeas); }

store.all = () => ideas.concat([]);


module.exports = store;
