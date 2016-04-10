/** ChoiScene.jsx **/
AccountsUIWrapper = React.createClass({
	componentDidMount() {
	    //Use Meteor Blaze to render login Buttons
	    this.view = Blaze.render(Template.loginButtons, React.findDOMNode(this.refs.container));  
	},
	componentWillUnmount() {
	    //Clean up Blaze view
	    Blaze.remove(this.view); 
	},
	render(){
		//just render a placeholder container that will be filled in
		return
	}				
})