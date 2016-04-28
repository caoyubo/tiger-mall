/**
 *  过滤器demo
 * @module bfw
 * @author marlowe
 * @date 20151113
 * @version 1.0.0
 */
module.exports = function (req, res ,next) {
    BLog.debug('这是一个过滤器');
    next();
};
