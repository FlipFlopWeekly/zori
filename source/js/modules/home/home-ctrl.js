/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module', 'jquery', 'jquery-ui', './home-directives', 'firebase-simple-login', '../../config'], function(controllers, $, tooltips) {
    'use strict';

    controllers.controller('HomeController', ['$scope', 'fireRef', 'FB_URL',
        function HomeController($scope, fireRef, FB_URL) {
            // Global variables initialisation
            $scope.fb_url           = FB_URL;
            $scope.newLink          = '';
            $scope.newLinkComment   = '';
            $scope.newUserEmail     = '';
            $scope.newUserPassword  = '';
            $scope.nbLinks          = 0;
          	$scope.activeTab		= null;
            
            // Functional labels initialisation
            $scope.log_link_title      = 'Connexion';

            $scope.$watch('links', function() {
                $scope.nbLinks = $scope.links.$getIndex().length;

                // Resize the list width, fits to the content size.
                $('.link-list').css('width', $scope.nbLinks * 9 + 'px');
            }, true);

			// Add link form action
            $scope.addLink = function() {
                var newLink         = $scope.newLink.trim();
                var newLinkComment  = $scope.newLinkComment.trim();
                
                if (!newLink.length) {
                    return;
                }
                
                var regexp = new RegExp("^((http|https):\/\/){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)");
                
                // Check if the URL is a valid one
                if ( !regexp.test(newLink)) {
                    return;
                }

                var unix = Math.round(+new Date()/1000);

                // Insert the new link in the firebase database
                $scope.links.$add({
                    submitTime: unix,
                    url: newLink,
                    nbClick: 0,
                    comment: newLinkComment
                });

                // Clean the form
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

            $scope.disconnect = function() {
                if (typeof $scope.user !== "undefined" ) {
                    // Logout the firebase user
                    auth.logout();
                    
                    // Remove scope varaible relative to the user
                    delete $scope.user;
                    delete $scope.visitedLinks;
                    
                    // Do not display the login tab automatically
                    $('#tab-login').hide();
                    
                    // Change the tooltip text
                    $('.ui-tooltip-content').html('Connexion');
                    $('#log-link').attr('title', 'Connexion');
                    $scope.log_link_title = 'Connexion';
                    
                    // Switch on the list
                    $scope.activeTab = $(this).attr('href');
                }
            }
            
            $("#main-menu a").click(function() {
            	if ($scope.activeTab == $(this).attr('href')) {
              		$scope.activeTab = null; 
              	} else {
                	$scope.activeTab = $(this).attr('href');
              	}
            });
            
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
// -- If we need to display a tab if the user is anonymous !! --
/*                        $("#member-create-account").dialog({ 
                            draggable: false,
                            closeText: "",
                            create: function( event, ui ) {
								$(this).parent().attr('id', 'registration-modal');
                            }
                        });*/

                    } else if (user.provider == 'password') {

                        // Save the logged in user in the scope to display the left toolbar.
                        $scope.user             = user;
                        $scope.newUserEmail     = '';
                        $scope.newUserPassword  = '';
                        
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
                        
                        // Remove validation classes
                        $('.ng-dirty').addClass('ng-pristine').removeClass('ng-dirty');
                        $('form').removeClass('ng-valid-email');
                        
                        if (typeof $scope.user !== "undefined" ) {
                            console.log("change to decon");
                            $('#log-link').attr('title', 'Déconnexion');
                            $scope.log_link_title = 'Déconnexion';
                        }
                        
                        // Re-initialize the active tab
                        $scope.activeTab = null;
                        
                        // Close the create account popin
                        $('#tab-login').hide();
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
                      	$scope.activeTab = null;
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
