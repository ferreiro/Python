
/////////////////////
// MODAL VARIABLES
/////////////////////

body = $('body');

readerWrapper = $('#reader-Wrapper'); // Modal box showed each time user click on a note.
reader 		  = $('#reader');
readerContent = $('#reader-Content');
readerContent_Title= $('#reader-Title');
readerContent_Text = $('#reader-Text');
readerLoader  = $('#reader-loader')
readerClose   = $('#reader-close');

writerWrapper = $('#writer-Wrapper'); // Modal box showed each time user click on a note.
writer 		  = $('#writer');
writerContent = $('#writer-Content');
writerContent_Form= $('#writer-Title');
writerLoader  = $('#writer-loader')
writerClose   = $('#writer-close');

writeNoteBtn  = $('#writeNote')
writeNoteHeaderBtn = $('#writeNoteHeaderButton')

/////////////////////////
// UPDATE MODAL CONTENT
/////////////////////////

function deleteSingleNote(NoteID) {
	body.find($('#'+NoteID)).unwrap()
	delete $('#'+NoteID)
	console.log($('#'+NoteID).detach())
}
function updateReader(note) {
	// Use the box ide to get the text of title...
	readerContent_Title.html(note['Title']);
	readerContent_Text.html(note['Content']);
}

/////////////////////
// OPEN MODALS
/////////////////////

writeNoteBtn.click(function() {
	displayWriter();
});

writeNoteHeaderBtn.click(function() {
	displayWriter();
});

function displayWriter() {

	body.css({ overflow:'hidden' }); // Scroll not available
	
	//writer.css({ top: (scrollY + 70) }); // Move modal box from top
	writerWrapper.slideDown('slow', 'easeInOutQuint'); // Show the modal
 	
	return false;
}

function displayReader() {

	body.css({ overflow:'hidden' }); // Scroll not available
	
	reader.css({ top: (scrollY + 100) }); // Move modal box from top
	readerWrapper.fadeIn('slow', 'easeInOutElastic'); // Show the modal
	
	return false;
}

/////////////////////
// CLOSE MODAL
/////////////////////

writerClose.click(function() { hideWriter('0'); });
readerClose.click(function() { hideReader(); });
closeModalsKeyboardPressed();

function hideWriter(time) {
	changeURL('#/');
	writerWrapper.slideUp('slow', 'easeInOutQuint'); // Hide the modal
	body.css({ overflow:'auto' }); // Scroll available again
}

function hideReader() {
	changeURL('#/');
	readerWrapper.slideUp('slow', 'easeInOutElastic'); // Hide the modal
	body.css({ overflow:'auto' }); // Scroll available again
}

// Close the modals when ESC key is pressed

function closeModalsKeyboardPressed() {
	$(document).keyup(function(e) {
	    if (e.keyCode == 27) { // escape key maps to keycode `27`
	        hideWriter('slow');
	        hideReader();
	    }
	});
}

////////////////////////
// AUXILIAR FUNCTIONS
////////////////////////

function changeURL (Permalink) {
	window.location = String(Permalink);
} 

////////////////////////////////////////
// ARRAYS OF OBJECTS TO INTERACT WITH //
// Adding click actions and more
////////////////////////////////////////

$( ".Note-wrapper" ).each(function( index ) {
	
	var Note 	= $(this) // Local variable get from the ARRAY
	  , NoteID 	= $(this).find('.Note').attr('id')
	  , NoteOptions  = Note.find('.Note-Options')
	  , dropdownMenu = Note.find('.Note-Options-dropDown')
	  , dropdownMenuClass = 'Note-Options-dropDown-display'

	/////////////////////////////////////////////////////////
	// ADD actions when click on some layers for the object /
	/////////////////////////////////////////////////////////

	// Open Object: When user clicks on this layer,
	// Opens a modal box with the updated data retrieved
	// from the API.

	$(".Note-link", this).click(function(e) {
		
		API_URL 	= 'api/notes/' + String(NoteID)
		noteTitle 	= Note.find('.Note-Title').html()
		noteContent = Note.find('.Note-Content').html()

		getNoteAndUpdate(API_URL); // Get note from API and update content

		return false;
	});

	// Delete Button: When user clicks this object,
	// A modal box will be opened. If the user acceps
	// it deletes an object.

	$('.Note-Options-delete', this).click(function(e) {
		API_URL = 'api/notes/delete/' + String(NoteID);
		if (confirm("Are you sure you want to delete this note?")) {
			deleteNote(API_URL); // Delete the note given by the url
		}
		return false;
	}); 

	// Show DropdownMenu: when clicks on this layer
	// Opens/Closes a dropdown menu with different options.

	$(".Note-Options-link", this).click(function(e) {
		dropdownMenu.toggleClass(dropdownMenuClass);
		return false;
	});

});

/////////////////////
// API QUERIES
/////////////////////

// Get the note via api
// process the form
$('form#createNewNote').submit(function(event) {
	event.preventDefault();
	note = $("#createNewNote").serialize();
	createNoteViaAPI(note,'/api/notes/create');
	return false;
});


function createNoteViaAPI(note, url) {

	writerLoader.fadeIn(100);

    // We pass a POST petition to /contacta
    // with the data "dataForm"
    $.ajax({
        type        : 'POST',       // define the type of HTTP verb we want to use (POST for our form)
        url         : url, // the url where we want to POST
        data        : note,     // our data object
        dataType    : 'json',       // what type of data do we expect back from the server
        encode      : true
    })
    .done(function(response) {  

    	message = '<p>'+ response['message'] +'</p>';

    	// create the notification
    	notification = new NotificationFx({
    		message : message,
    		layout : 'growl',
    		effect : 'genie',
    		type : 'notice', // notice, warning or error
    		onClose : function() {
    			//bttn.disabled = false;
    		}
    	});

    	notification.show();

    	        // Done means the page could connect to the url to make the query.    
        if (!response['error']) {
        	hideWriter(0)
        	setTimeout(function(){
        	   location.reload();
        	}, 2000);
        }
    
     })
    .fail(function(response) {
        alert("Problems creating your note... Try later")
    })
    .always(function(response) {
       writerLoader.fadeOut(200);
    });
   
}


// Get the note via api

function getNoteAndUpdate(apiUrl) {

	readerContent.hide(0);
	readerLoader.fadeIn(200);

	$.getJSON( apiUrl, function( note ) {
		if (note['valid'] == "true") {	

			newUrl  = "#/";
			newUrl += note['Permalink'];
			newUrl += "/";
			newUrl += note['NoteID'];

			updateReader(note); // Update reader data with the returned object
			changeURL(newUrl);
			displayReader(); // Show specific reader for this object
		}
		else{
			message = '<p>'+ note['status'] +'</p>';

			// create the notification
			notification = new NotificationFx({
				message : message,
				layout : 'growl',
				effect : 'genie',
				type : 'notice', // notice, warning or error
				onClose : function() {
					//bttn.disabled = false;
				}
			});

			notification.show();
		}
		

	})
	.error(function() {
		message = '<p>Sorry... We couldn\'t retrieve information for that note... Try later</p>';

		// create the notification
		notification = new NotificationFx({
			message : message,
			layout : 'growl',
			effect : 'genie',
			type : 'notice', // notice, warning or error
			onClose : function() {
				//bttn.disabled = false;
			}
		});

		notification.show(); 
	})
	.complete(function() { 
		readerLoader.fadeOut(0);
		readerContent.fadeIn(200);
	});
}


function deleteNote(apiUrl) {

	readerContent.hide(0);
	readerLoader.fadeIn(200);

	console.log(apiUrl)

	$.getJSON( apiUrl, function( note ) {
		var message = note['status']
		  , deleted = note['deleted'];

		 console.log(note)
		message = '<p>'+ note['status'] +'</p>';

		// create the notification
		notification = new NotificationFx({
			message : message,
			layout : 'growl',
			effect : 'genie',
			type : 'notice', // notice, warning or error
			onClose : function() {
				//bttn.disabled = false;
			}
		});
		notification.show();

		if (deleted == "true") { 
			deleteSingleNote(note['NoteID']);
		}
		

	})
	.error(function() {
		//alert("Sorry... We couldn't delete that note... Try later")
	})
	.complete(function() { 
		readerLoader.fadeOut(200);
		readerContent.fadeIn(200);
	});
}
