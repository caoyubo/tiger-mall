/**
 * Created by ljm on 2015/10/12.
 */

module.exports = function (bfw , router ) {

    router.get('/detail', function(req, res, next) {

        res.render("detail",{});
    });

}