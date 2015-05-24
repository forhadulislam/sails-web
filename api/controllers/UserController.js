/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    show: function(req, res){
        return res.send("You will be good");
    },
	'index': function(req, res){
        User.find(function(err, users){
        
            res.view({
                users: users
            });
        
        });
        
	},
	'create': function(req, res){
        User.create( req.params.all(), function(err, user){
            if(err){
                req.session.flash = {
                    err: err
                }
                res.redirect('/people/register');
            } 

            res.json(user);
        });
	},
    'edit': function(req, res){
        User.findOne( req.param('id'), function(err, user){
            if(err){
                req.session.flash = {
                    err: err
                }
                res.redirect('/people/register');
            } 

            res.view({
                user:user
            });
        });
	},
	'destroy': function(req, res, next){
        User.findOne(req.param('id'), function foundUser(err, user){
            if(err) return next(err);
            
            if(!user) return next("No user found");
            
            User.destroy(req.param('id'), function destroyUser(err){
                if(err) return next(err);
            })
            
            res.redirect('/user');
        })
	}
};

