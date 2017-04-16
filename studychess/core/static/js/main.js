var Vue = require('vue');
var socket = new WebSocket('ws://138.197.105.235');

Vue.component('player', {
    props: ['player'],
    template: '<div>{{ player.name }} {{ player.site }} {{ player.description }}</div>'
});

var vm = new Vue({
    el: '#app',
    data: {
        name: '',
        site: '',
        topic: '',
        message: 'hello world lol',
        players: []
    },
    methods: {
        submit: function (event) {
            event.preventDefault();
            var message = {
                name: this.name,
                site: this.site,
                description: this.topic
            }
            socket.send(JSON.stringify(message));        
            document.getElementById("userform").outerHTML = '';
        }
    }
});

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
