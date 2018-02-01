import React from 'react';
import s from './index.scss';

class IndexPage extends React.Component {
	constructor(){
		super();
	}

	render() {
	    return (
			<div className={s.container}>
				Hello World
			</div>
	    );
	}
}

module.exports = IndexPage;