require('./assets/stylesheets/styles.scss');

class Car {
	manufacturer (car) {
		document.write(`Boom Puniting ${car}`)
	}
}

const tae = new Car;

tae.manufacturer('burnik')