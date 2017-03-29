var Vue = require('vue');

Vue.component('player', {
    props: ['player'],
    template: '<p>{{ player.fields.name }}</p><p>{{ player.fields.site }}</p><p>{{ player.fields.description }}</p>'
});

var vm = new Vue({
    el: '#app',
    data: {
        message: 'hello world lol',
        players: []
    }
});

var socket = new WebSocket('ws://localhost:8000');
socket.onopen = function(event) {
    console.log(event);
}

socket.onmessage = function(e) {
    console.log('Server: ' + e.data);
    players = JSON.parse(e.data);
    vm.players = players;
};
