'use strict';

function index(req, res){
	res.render('index', {title: 'Expressy'});
}

module.exports = {
	index: index,
};