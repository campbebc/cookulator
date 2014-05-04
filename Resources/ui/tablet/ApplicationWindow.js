function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white',
		navBarHidden:true,
	});

	return self;
};

module.exports = ApplicationWindow;

