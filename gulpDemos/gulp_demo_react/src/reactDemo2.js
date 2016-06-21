var FancyCheckbox = React.createClass({
    render: function() {
        var fancyClass = this.props.checked ? 'FancyChecked' : 'FancyUnchecked';
        return (
            <div className={fancyClass} onClick={this.props.onClick}>
        {this.props.children}
            </div>
            );
    }
});
React.render(
    <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
    Hello world!
    </FancyCheckbox>,
    document.body
);