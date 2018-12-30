import Vue from 'vue'
import App from './renderer/App.vue'

var app = new Vue({
	el: '#app',
	render(builder) {
		return builder(App);
	}
});