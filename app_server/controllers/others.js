'use strict';

function about(req, res){
	res.render('others-about', {title: 'About'});
}

module.exports = {
	about: about,
};