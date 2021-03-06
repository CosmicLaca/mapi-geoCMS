function MFrm() {

		this.module = '';
		this.task = '';
		this.obj = '';

		this.request = function( dtype, uri_append ) {
				var action_uri = 'index.php?module=' + this.escape_uri( this.module ) + '&task=' + this.escape_uri( this.task ) + '&object=' + this.escape_id( this.obj );

				action_uri += '&' + uri_append;
				action_uri += '&mapi_csrf=' + this.escape_uri( this.mapi_csrf() );

				$.ajax( { url: action_uri, dataType: dtype } ).done( function( result ) {
						location.reload();
				});
		}

		this.mapi_csrf = function() {
				if ( ! $( '#mapi_csrf' ) || ! $( '#mapi_csrf' ).val() ) return '';

				return $( '#mapi_csrf' ).val();
		}

		this.escape_numeric = function( input ) {
				return input.replace( /[^0-9]/, '' );
		}

		this.escape_id = function( input ) {
				return Math.abs( this.escape_numeric( input.replace( /[^0-9]/, '' ) ) );
		}

		this.escape_uri = function( input ) {
				return encodeURIComponent( input );
		}

}

function MContent() {

		this.module = 'mcontent';

		if ( $( '#content_id' ) && $( '#content_id' ).val() ) {
				this.obj =  $( '#content_id' ).val();
		}

		this.add_category = function() {
				if ( ! $( '#content_category' ) || ! $( '#content_category' ).val() ) return null;

				this.task = 'content_category';
				var uri = 'category_add=1&category_id=' + this.escape_id( $( '#content_category' ).val() );

				this.request( 'html', uri );
		}

		this.remove_category = function( category_id ) {
				this.task = 'content_category';
				var uri = 'category_remove=1&category_id=' + this.escape_id( category_id );

				this.request( 'html', uri );
		}

		this.add_meta = function() {
				if ( ! $( '#meta_name' ) || ! $( '#meta_name' ).val() ) return null;
				if ( ! $( '#meta_value' ) || ! $( '#meta_value' ).val() ) return null;

				this.task = 'content_meta';
				var uri = 'meta_add=1&meta_name=' + this.escape_uri( $( '#meta_name' ).val() ) + '&meta_value=' + this.escape_uri( $( '#meta_value' ).val() );

				this.request( 'html', uri );
		}

		this.remove_meta = function( meta_name ) {
				this.task = 'content_meta';
				var uri = 'meta_remove=1&meta_name=' + this.escape_uri( meta_name );

				this.request( 'html', uri );
		}

		this.default_media = function( media_id ) {
				this.task = 'content_media';
				var uri = 'media_default=1&media_id=' + this.escape_id( media_id );

				this.request( 'html', uri );
		}

		this.add_media = function( content_id ) {
				var action_uri = 'index.php?module=mcontent&task=content_media&object=' + this.escape_uri( content_id ) + '&media_add=1';
				action_uri += '&mapi_csrf=' + this.escape_uri( this.mapi_csrf() );

				$( '#dropzone-images' ).dropzone( { 
						url: action_uri,
						paramName: 'file',
						maxFilesize: 2,
						success: function(){ location.reload(); }
				} );
		}

		this.remove_media = function( media_id ) {
				this.task = 'content_media';
				var uri = 'media_remove=1&media_id=' + this.escape_id( media_id );

				this.request( 'html', uri );
		}

		this.setup_table = function( table ) {
				$( '#' + table ).dataTable( {
						'aaSorting': [[ 0, 'desc' ]]
				} );
		}

		this.nosort_column = function( table, column, firstsort ) {
				$( '#' + table ).dataTable( {
				    	'aaSorting': [[ firstsort, 'asc' ]],
				    	'aoColumnDefs': [
				               { "bSortable": false, "aTargets": [ column ] }
				        ]
				} );
		}

		this.setup_meta_table = function() {
				$( '#content_meta' ).dataTable( {
				    	'aaSorting': [[ 0, 'desc' ]],
				    	'aoColumnDefs': [
				               { "bVisible": false, "aTargets": [ 0 ] },
				               { "bSortable": false, "aTargets": [ 3 ] }
				        ]
				} );
		}

		this.type_select = function() {
        		var tab = '';
        		var c_type = '';

        		if ( $.cookie( 'last_tab' ) ) tab = $.cookie( 'last_tab' );
        		
        		if ( tab && $( 'a[href=' + tab + ']' ).length ) {
                		c_type = $( 'a[href=' + tab + ']' ).html();
        		} else {
                		c_type = $( 'a[data-toggle="tab"]:first' ).html();
        		}

        		if ( c_type.length > 0 ) c_type = this.escape_uri( c_type );
        		c_type = c_type.toLowerCase();

        		if ( $( '#content_type' ) ) $( '#content_type' ).val( c_type );
		}
		
}

function MModule() {

		this.module = 'mmodule';

		this.install = function( name ) {
				this.task = 'module_install';
				var uri = 'module_action=1&name=' + this.escape_uri( name );

				this.request( 'html', uri );
		}

		this.enable = function( module_id ) {
				this.obj = module_id;
				this.task = 'module_enable';
				var uri = '&module_action=1';

				this.request( 'html', uri );
		}

		this.disable = function( module_id ) {
				this.obj = module_id;
				this.task = 'module_disable';
				var uri = '&module_action=1';

				this.request( 'html', uri );
		}
}

function MTemplate() {

		this.module = 'mtemplate';

		this.install = function( name ) {
				this.task = 'template_install';
				var uri = 'template_action=1&name=' + this.escape_uri( name );

				this.request( 'html', uri );
		}

		this.enable = function( template_id ) {
				this.obj = template_id;
				this.task = 'template_enable';
				var uri = '&template_action=1';

				this.request( 'html', uri );
		}

		this.disable = function( template_id ) {
				this.obj = template_id;
				this.task = 'template_disable';
				var uri = '&template_action=1';

				this.request( 'html', uri );
		}
}

function MWidget() {

		this.module = 'mwidget';

		this.install = function( name ) {
				this.task = 'widget_install';
				var uri = 'widget_action=1&name=' + this.escape_uri( name );

				this.request( 'html', uri );
		}

		this.enable = function( widget_id ) {
				this.obj = widget_id;
				this.task = 'widget_enable';
				var uri = '&widget_action=1';

				this.request( 'html', uri );
		}

		this.disable = function( widget_id ) {
				this.obj = widget_id;
				this.task = 'widget_disable';
				var uri = '&widget_action=1';

				this.request( 'html', uri );
		}
}

function MPage() {

		this.module = 'mpage';
		this.base_url = '';

		if ( $( '#page_id' ) && $( '#page_id' ).val() ) {
				this.obj =  $( '#page_id' ).val();
		}

		this.add_content_url = function() {
				var content_id = "";
				
				var selected = $( "input[type='radio'][name='content_list']:checked" );
				if ( selected.length > 0 ) {
    					content_id = selected.val();
				}

				var url = this.base_url;
				if ( content_id ) url += 'index.php?module=content&object=' + content_id;

				$( '#page_url' ).val( url );
				$( '#page_type' ).val( 'content' );
		}

		this.add_category_url = function() {
				var category_id = "";
				
				var selected = $( "input[type='radio'][name='category_list']:checked" );
				if ( selected.length > 0 ) {
    					category_id = selected.val();
				}

				var url = this.base_url;
				if ( category_id ) url += 'index.php?module=category&object=' + category_id;

				$( '#page_url' ).val( url );
				$( '#page_type' ).val( 'category' );
		}

		this.add_module_url = function() {
				var module_name = $( "[name='module_name']" ).find( ':selected' ).val();
				var module_task = $( "[name='module_task']" ).val();

				var url = this.base_url;
				if ( module_name.length > 0 ) url += 'index.php?module=' + module_name;
				if ( module_task.length > 0 ) url += '&task=' + module_task;

				$( '#page_url' ).val( url );
				$( '#page_type' ).val( 'module' );
		}

		this.add_menu = function() {
				if ( ! $( '#page_menu' ) || ! $( '#page_menu' ).val() ) return null;

				this.task = 'page_menu';
				var uri = 'menu_add=1&menu_id=' + this.escape_id( $( '#page_menu' ).val() );

				this.request( 'html', uri );
		}

		this.remove_menu = function( menu_id ) {
				this.task = 'page_menu';
				var uri = 'menu_remove=1&menu_id=' + this.escape_id( menu_id );

				this.request( 'html', uri );
		}
}

MContent.prototype = new MFrm();
MModule.prototype = new MFrm();
MTemplate.prototype = new MFrm();
MWidget.prototype = new MFrm();
MPage.prototype = new MFrm();

$( document ).ready( function() {
		$( '#meta_name' ).keypress( function( e ) { 
				if ( 13 == e.keyCode ) { 
						$( '#meta_add' ).click();
						return false;
				}
		} );
		$( '#meta_value' ).keypress( function( e ) { 
				if ( 13 == e.keyCode ) { 
						$( '#meta_add' ).click();
						return false;
				}
		} );
} );