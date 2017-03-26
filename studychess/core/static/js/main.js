var Vue = require('vue');

Vue.component('player', {
    props: ['player'],
    template: '<p>{{ player.name }}</p>'
});

var vm = new Vue({
    el: '#app',
    data: {
        message: 'hello world lol',
        players: [
            { name: 'Mufasa' },
            { name: 'Simba' },
            { name: 'Nala' },
            { name: 'Summit1G' }
        ]
    }
});
