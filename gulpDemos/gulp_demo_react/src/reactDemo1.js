var CheckLink = React.createClass({
    render: function() {
        // 这样会把 CheckList 所有的 props 复制到 <a>
        return <a {...this.props}>{"√" + this.props.children}</a>;
    }
});

ReactDOM.render(
    <CheckLink href="/checked.html" data-bb="aaaa">
    Click here!
    </CheckLink>,
    document.getElementById('container')
);
