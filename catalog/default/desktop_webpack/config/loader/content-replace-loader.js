module.exports = function loader(source) {
    const handleContent = source.replace('domReadyAssets placeholder string', JSON.stringify(this.query.params));
    return handleContent;
};
