var Vue = require('vue');

Vue.component('player', {
    props: ['player'],
    template: '<div><p>{{ player.name }}</p><p>{{ player.site }}</p><p>{{ player.description }}</p></div>'
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
    message = JSON.parse(e.data);
    if (message.type === 'add') {
        vm.players = vm.players.concat(message.players);
    } else if (message.type === 'delete') {
        for (i=0; i<vm.players.length; i++) {
            if (vm.players[i].pk == message.player) {
                vm.players.splice(i, 1);
            }
        }
    } else if (message.type === 'initial') {
        vm.players = JSON.parse(message.players);
    }
};
