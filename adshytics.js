class Adshytics {
	constructor() {
		this.user = false;
		this.version = '0.1.2'
		this.origin = window.location.origin;
		this.ipath = '/children-crossdomain.php?origin=';
		this.iframeid = false;
		this.iframeparent = false;
		this.multishrink = {};
		/**
		 * multi
		 */
		this.redorigin = 'https://adshnk.com';

		let elem = document.getElementById('adshytics');

		this.selem = elem;
		this.user = elem.getAttribute('user');

		this.owner_origin = elem.getAttribute('origin') || false;
	}
	get eorigin() { return window.btoa(this.origin) } 
	get iframe_url() { return this.get_property_domain() + this.ipath + this.eorigin }
	get supportdata() { return {storage: JSON.stringify(window.localStorage)} }
	get_property_domain = () => {
		/**
		 * iframe h2h
		 */
		return 'https://adshrink.it';
	}
	iframe_onload = async (e) => {
		//console.log(e);
		await this.get_owner_iframe();
		this.send_msg_2owner();
	}
	set_iframe = () => {
		if ( this.user === 'owner' ) {
			this.if_owner();
			return false;
		}
		let randomid = (Math.random() * 999999);
		this.iframeid = randomid;
		var ifrm = document.createElement("iframe");
		ifrm.setAttribute("src", this.iframe_url);
		ifrm.id = randomid;
		ifrm.frameBorder = 'none';
        ifrm.style.width = (this.user === 'test' ? "100%" : "1px");
		ifrm.style.height = (this.user === 'test' ? "100%" : "1px");
		ifrm.onload = this.iframe_onload;
		document.body.appendChild(ifrm);
		this.if_client();
	}
	get_owner_iframe = async () => {
		this.iframeparent = document.getElementById(this.iframeid).contentWindow;
	}
	send_msg_2owner = (data) => {
		data = {...data, ...this.supportdata}
		this.iframeparent.postMessage((data ? data : {'pong': Math.random(), ...this.supportdata}), this.get_property_domain());
	}
	set_handler_client = (event) => {
		//console.log("Received a message from " + event.origin + ".");
		// If the window that sent this message is not https://crosscommiframe.app, then
		// that message needs to be thrown out.
		if (event.origin != this.get_property_domain()) {
			console.log("The message came from some site we don't know. We're not processing it.");
			return;
		}
		// When one window sends a message, or data, to another window via
		// `parent.postMessage()`, the message (the first argument) in the
		// `parent.postMessage()` call is accessible via `event.data` here.
		let dataFromChildIframe = event.data;
		if ( this.getNestedObj(() => dataFromChildIframe.mass_settings ) ) {
			//this.set_what_object( this.getNestedObj(() => dataFromChildIframe.mass_settings ) );
		}
		// Log the data to the console.
		//console.log(dataFromChildIframe);
		// Show that the data was received.
		$(".status-message").text("Data received! This status message will reset in 5 seconds.");
		if (dataFromChildIframe.user_age == 1) {
			$(".user-data .user-age").html("The user is <strong>" + dataFromChildIframe.user_age + "</strong> year old.");
		} else {
			$(".user-data .user-age").html("The user is <strong>" + dataFromChildIframe.user_age + "</strong> years old.");
		}
		$(".user-data .user-height").html("The user is <strong>" + dataFromChildIframe.user_height + "</strong> inches tall.");
		$(".user-data").slideDown(200, function() {
			setTimeout(function() {
				$(".user-data").slideUp(200);
				$(".status-message").html("Waiting for data from <code>https://crosscommiframe.app</code>...");
			}, 5000);
		});
	}
	set_listing_from_owner = () => {
		// Determine how the browser should listen for messages from other
		// windows. If `addEventListener` exists, then use that. Otherwise, use
		// `attachEvent` because an older browser is probably being used. Also,
		// use a callback to handle messages so that both methods of "message
		// listening" can be routed to the same function. The callback in this
		// example is `handleMessage` and it will take one argument (the
		// `MessageEvent` object).
		
		if (window.addEventListener) {
			window.addEventListener("message", this.set_handler_client);
		} else {
			window.attachEvent("onmessage", this.set_handler_client);
		}
		
		
	}
	set_iframe_params = () => {
		/**
		 * Handle a message that was sent from some window.
		 *
		 * @param {MessageEvent} event The MessageEvent object holding the message/data.
		 */
		$('#origin').text(window.location.origin);
		$('#'+this.iframeid).attr({src:this.iframe_url});
		console.log('adsh-js initiated');
		
		
	}

	/**
	 * change referrer location
	 * @returns 
	 */
	option_red = () => {
		if ( this.selem.getAttribute('red') == 'B' ) { 
			this.redorigin = 'https://www.shrink-service.it/u';
			return true;
		} else if ( this.selem.getAttribute('red') == 'C' ) { 
			this.redorigin = 'https://ashnk.com';
			return true;
		} return false;
		
	}

	multishrink_onclick = (e) => {
		e.preventDefault();
		let dataset = JSON.stringify(e.target.dataset);
		this.send_msg_2owner({action: 'adshurlclick', data: dataset});
		return false;
		
	}

	multishrink_onconvert = (settings, except, include) => {
		let { type } = this.getNestedObj(() => window.adshobject.options, []) || [];
		let { origin } = this.getNestedObj(() => settings, []) || false;
		console.log('adsh::mass');
		let option_b = this.option_red();
		
		if ( !origin || option_b ) { 
			origin = this.redorigin; //origin = 'https://adshrink.it'  | redorigin otherhost
		} 

		let a = document.getElementsByTagName('a');
		for (var x = 0; x < a.length; x++) {
			
			var protocol = false, host = false, pathname = false;
			try {
				_url = new URL(a[x].href) || false;
				protocol = _url.protocol;
				host = _url.host;
				pathname = _url.pathname;
				console.log(_url);
			} catch(error) {
				console.error('wrong-url')
				continue;
			}
			
			//let {protocol, host, pathname} = new URL(a[x].href) || false;

			/**
			 * [array].indexOf(element) >= 0, is present in array
			 */
			if (['adshrink.it', 'www.shrink-service.it'].indexOf(a[x].hostname) >= 0) {
				if ( ! type ) { 
					//a[x].href = origin + pathname; 
					//a[x].setAttribute('target', '_blank');
					console.log('in', a[x]);
				}
				else if ( type === 'sameuser' ) {
					a[x].href = '';
					a[x].setAttribute('data-sameuser-url', origin + pathname);
					a[x].setAttribute('data-sameuser-path', pathname);
					a[x].onclick = this.multishrink_onclick;
				}

			}
		}
		for (var x = 0; x < a.length; x++) {
			if (Array.isArray(except) && except.indexOf(a[x].hostname) === -1) {
				if ( ! type ) { 
					a[x].href = origin + '/' + this.user + '/' + window.btoa(a[x].href); 
					a[x].setAttribute('target', '_blank');
				}
				else if ( type === 'sameuser' ) {
					a[x].href = '';
					a[x].setAttribute('sameuser-url', origin + '/' + this.user + '/' + window.btoa(a[x].href));
					a[x].setAttribute('sameuser-path', '/' + this.user + '/' + window.btoa(a[x].href));
					a[x].onclick = this.multishrink_onclick;
				}

			}
			if (Array.isArray(include) && include.indexOf(a[x].hostname) >= 0) {
				a[x].href = origin + '/' + this.user + '/' + window.btoa(a[x].href); 
				a[x].setAttribute('target', '_blank');
			}
		}
	}

	/**
	 * 
	 * params:except, include
	 * 
	 * @returns convert
	 */
	multishrink_onconvert_normal = () => {
		let { mass, except, include, regpath } = this.getNestedObj(() => window.adshobject) || false;
		console.log('adsh::mass_n');
		if ( !mass )
			return false;

		this.option_red();

		let origin = this.redorigin; //'https://adshrink.it';
		let _reg = regpath ? new RegExp(regpath,'') : false;

		let a = document.getElementsByTagName('a');
		for (var x = 0; x < a.length; x++) {
			if (Array.isArray(except) && except.indexOf(a[x].hostname) === -1) {
				console.log(this.redorigin, this, origin, a[x].href, except, include, window.btoa(a[x].href));
				a[x].href = origin + '/' + this.user + '/' + window.btoa(a[x].href); 
				a[x].setAttribute('target', '_blank');
				a[x].setAttribute('status', 'prod');
			}
			if (Array.isArray(include) && include.indexOf(a[x].hostname) >= 0) {
				
				if(_reg)
				{
					let _mathces = (a[x].pathname).toString().match(_reg) ?? [];
					if(_mathces.length >= 2) {
						console.log(this.redorigin, this, origin, a[x].href);
						a[x].href = origin + '/' + this.user + '/' + window.btoa(a[x].href); 
						a[x].setAttribute('target', '_blank');
						a[x].setAttribute('status', 'prod');
						a[x].setAttribute('regex', '1');
					}
				} else {
					//for (var x = 0; x < a.length; x++) { console.log(a[x].hostname, (a[x].pathname).toString().match(/\/download\//) ) }
					console.log(this.redorigin, this, origin, a[x].href);
					a[x].href = origin + '/' + this.user + '/' + window.btoa(a[x].href); 
					a[x].setAttribute('target', '_blank');
					a[x].setAttribute('status', 'prod');
				}
			}
		}
	}
	getNestedObj = (fn, defaultVal = false) => {
		try {
			return fn();
		} catch (e) {
			return defaultVal;
		}
	}
	set_what_object = (data) => {
		if ( !window.hasOwnProperty('adshobject') )
			return false;
		let mass = this.getNestedObj(() => window.adshobject.mass);
		if ( mass ) {
			this.multishrink_onconvert(data, this.getNestedObj(() => window.adshobject.except), this.getNestedObj(() => window.adshobject.include) );
		}
	}
	send_msg_2client = () => {

	}
	set_listing_from_client = (e) => {
		if (e.origin != this.owner_origin)
			return;

		$('#pong').text(JSON.stringify(e.data));
		
		parent.postMessage({adshrink_pong: Math.random(), data: e.data}, this.owner_origin)

		let action = this.getNestedObj(() => e.data.action);
		if ( action ) {
			let data_parsed_object = JSON.parse(this.getNestedObj(() => e.data.data)) || [];
			switch(action) {
				case 'adshurlclick':
					let { sameuserPath, sameuserUrl } = data_parsed_object;
					try {
					window.localStorage.setItem('last_clicked_url', sameuserPath);
					$('#storage').text(JSON.stringify(window.localStorage));
					} catch(error) {
						$('#storage').text(error);
					}
					
					break;
			}
		}
	}
	if_owner = () => {

		$('#pong').text(this.owner_origin)

		if ( this.user !== 'owner' ) 
			return false;
		if ( !this.owner_origin )
			return false;
		
		window.onmessage = this.set_listing_from_client;
		parent.postMessage({adshrink_ping: Math.random(), mass_settings:{origin:'https://adshrink.it'}},this.owner_origin);

		parent.postMessage(
		{
			user_age:    1,
			user_height: 2,
		},
		this.owner_origin);

		const that = this;

		$("form[name='user_data']").submit(function(e) {
			e.preventDefault();
			e.stopPropagation();

			//console.log("Sending data to " + this.owner_origin);
			parent.postMessage(
			{
				user_age:    $("input[name='user_age']").val(),
				user_height: $("input[name='user_height']").val(),
			},
			that.owner_origin);
		});
	}
	if_client = () => {
		this.set_iframe_params();
		this.set_listing_from_owner();
		//this.set_what_object();
	}
	if_noiframe = () => {
		this.multishrink_onconvert_normal();
	}
}

let scriptjsload = document.createElement("script");
	scriptjsload.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/script.js/2.0.2/script.min.js");
	scriptjsload.setAttribute("integrity", "sha512-UWtTDM6wtl/qutDD6i1JOGZGiEd92dveVzuLl8sMBkMHlOHcbZdexM7ZrKkeaugW7vhqDnWc2pPD/ohEV+BBbg==");
	scriptjsload.setAttribute("crossorigin", "anonymous");
	scriptjsload.onload = async () => {
		$script(['https://code.jquery.com/jquery-3.3.1.min.js'], 'bundle');
		$script.ready('bundle', function() {
			window.adshytics = new Adshytics();
			window.adshytics.if_noiframe();
			window.adshytics.set_iframe();
		});
	}
	document.head.appendChild(scriptjsload);

	/*
	<!--CLIENT-->
	<script type="text/javascript">
	    window.adshobject = {mass: true, except:["shrink-service.it", "adshrink.it", "yourwebsite.com", "link2esclude.com", "example.com"], options:{}};
	    (function(i,s,o,g,r,a,m){i['AdshrinkAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;a.setAttribute('user','MQ==');a.id=r;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://adshrink.it/adshytics.js?c=' + (Math.random() * 9999),'adshytics');
	</script>
	  
	<!--OWNER-->
	<script type="text/javascript">
	    (function(i,s,o,g,r,a,m){i['AdshrinkAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;a.setAttribute('user','owner');a.setAttribute('origin','<?php echo base64_decode($_GET['origin']); ?>');a.id=r;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://adshrink.it/adshytics.js?c=' + (Math.random() * 9999),'adshytics');
	</script>
	*/
