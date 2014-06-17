/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module', 'jquery', 'jquery-ui', './home-directives', 'firebase-simple-login', '../../config'], function(controllers, $, tooltips) {
    'use strict';

    controllers.controller('HomeController', ['$scope', 'fireRef', 'FB_URL',
        function HomeController($scope, fireRef, FB_URL) {
            $scope.fb_url           = FB_URL;
            $scope.newLink          = '';
            $scope.newLinkComment   = '';
            $scope.nbLinks          = 0;

            $scope.$watch('links', function() {
                $scope.nbLinks = $scope.links.$getIndex().length;

                // Resize the list width, fits to the content size.
                $('.link-list').css('width', $scope.nbLinks * 9 + 'px');
            }, true);

			/**
			 * Adds the link
			 */
            $scope.addLink = function() {
                var newLink = $scope.newLink.trim();
                var newLinkComment = $scope.newLinkComment.trim();
                
                if (!newLink.length) {
                    return;
                }
                
                var regexp = new RegExp("^((http|https):\/\/){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)");
                
                if ( !regexp.test(newLink)) {
                    return;
                }

                var unix = Math.round(+new Date()/1000);

                $scope.links.$add({
                    submitTime: unix,
                    url: newLink,
                    nbClick: 0,
                    comment: newLinkComment
                });

                $scope.newLink          = '';
                $scope.newLinkComment   = '';
            };

            $scope.incrementClick = function(id) {
                // Check if the attribute exists. Default value is 0.
                if ($scope.links[id].nbClick === undefined) {
                    $scope.links[id].nbClick = 0;
                }

                $scope.links[id].nbClick++;
                $scope.links.$save();
            };
            
            $scope.createAccount = function() {
                /*var user     = $scope.newUser.trim();*/
                var email    = $scope.newUserEmail.trim();
                var password = $scope.newUserPassword.trim();
                
                auth.createUser(email, password, function(error, user) {
                    if (!error) {
                        $('#main-menu').tabs({
                            hide: true
                        });
                    }
                    
                    // If the create account failed, due to an existing user, try to log in it.
                    auth.login('password', {
                        email: email,
                        password: password,
                        rememberMe: true
                    });

                });
            };
            
            $scope.links = fireRef.links();

            var appref = new Firebase(FB_URL);
            var auth = new FirebaseSimpleLogin(appref, function(error, user) {
                if (error) {
                    // An error occurred while attempting login
                    // TODO: error handler
                    console.log(error);
                } else if (user) {
                    // User authenticated with Firebase
                    if (user.provider == 'anonymous') {

                        // Check if the anonymous user is not a registered one (possible ?)
                        // Open the create account popin.
                        $("#member-create-account").dialog({ 
                            /*width: 700,*/
                            draggable: false,
                            closeText: "",
                            create: function( event, ui ) {
								$(this).parent().attr('id', 'registration-modal');
                            }
                        });

                    } else if (user.provider == 'password') {

                        // Save the logged in user in the scope to display the left toolbar.
                        $scope.user = user;
                        
// -- If we need to initialize a member data structure !! --
                        /*// Check if the member/{user.id} firebase data structure exists.
                        var memberRef = new Firebase(FB_URL + "member/" + user.id);
                        memberRef.once('value', function(data) {
                            // If it does not exist
                            if (data.val() === null) {
                                // Get the parent node.
                                memberRef = new Firebase(FB_URL + "member/");
                                // Create a temporary data in the member/{user.id} new child.
                                memberRef.child(user.id).set({ref : user.id});
                            }
                        });*/
                        
                        // Retrieve informations about links relative to the user (once)
                        var memberRef = new Firebase(FB_URL + "member/" + user.id + "/visitedLinks");
                        memberRef.once('value', function(data) {
                            // If there is no visited links information
                            if (data.val() === null) {
                                // Create the node with temporary data.
                                memberRef.child(user.id).child("visitedLinks").set({0 : 0});
                                // Save the temporary data into the visited links array stored in the scope.
                                $scope.visitedLinks = [];
                            } else {
                                // Store in the scope the informations about links relative to the user.
                                $scope.visitedLinks = data.val();
                            }
                        });
                        
                        // Close the create account popin
                        if ($("#member-create-account").dialog( "isOpen" ) === true) {
                            $("#member-create-account").dialog( "close" );
                        }
                        
                    }
                } else {

                    // Create an anomymous session.
                    auth.login('anonymous', {
                        rememberMe: true
                    });

                }
            });
            
            /**
             * Generic tooltips
             */
            $scope.tooltips = function() {
                $(document).tooltip({
                    position: {
                        my: "center bottom-16",
                        at: "center+8 top",
                        using: function(position, feedback) {
                            $(this).css(position);
                            $("<div>")
                                .addClass("arrow")
                                .addClass(feedback.vertical)
                                .addClass(feedback.horizontal)
                                .appendTo(this);
                        }
                    }
                });
            };
            
            /**
             * Main menu tabs
             */
            $scope.mainMenuTabs = function() {
                $('#toolbar-panel').tabs({
                    collapsible: true,
                    active: false
                });
                
                // If the user click outside the tab, hide it
                $('body').on('click', function(event){
                    var target = $(event.target);

                    if(target.parents('#toolbar-panel').length === 0){
                        $("#toolbar-panel").tabs('option', 'active', false);
                    }
                });
            };
            
            /**
             * Init some stuff
             */
            $scope.tooltips();
            $scope.mainMenuTabs();
        }
    ]);
});
