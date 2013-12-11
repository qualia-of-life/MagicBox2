
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Welcome to the Super Magic Box' });
};

exports.magicboxadd = function(req, res){
	res.render('magicboxadd', { title: 'What would you like to put inside the box'});
};

exports.magicboxreplace = function(req, res){
    res.render('magicboxreplace', { title: 'Replace or Remove'});
};


exports.boxcontents = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('boxcontents', {
                "boxcontents" : docs
            });
        });
    };
};

exports.additem = function(db) {
    return function(req, res) {


        var item = req.body.item;
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "item" : item,
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding data");
            }
            else {
                res.location("boxcontents");
                res.redirect("boxcontents");
            }
        });

    }
}

exports.edititem = function(db) {
    return function(req, res) {

        var item = req.body.search;
        var item2= req.body.replace;
        var collection = db.get('usercollection');

        if(item2==="replacement box" || item2===""){

            collection.remove({"item":item}, function (err, doc) {
            if (err) {
                res.send("There was a problem removing data");
            }
            else {
                res.location("boxcontents");
                res.redirect("boxcontents");
            }
        });

        } else {

            collection.update({"item":item},{"item":item2},{upsert:true}, function (err, doc) {
            if (err) {
                res.send("There was a problem editing data");
            }
            else {
                res.location("boxcontents");
                res.redirect("boxcontents");
            }
        });
        }

    }
}